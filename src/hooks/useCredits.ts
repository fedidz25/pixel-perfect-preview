import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Credit {
  id: string;
  user_id: string;
  customer_id: string;
  sale_id: string | null;
  amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  customers?: {
    name: string;
  } | null;
}

export interface CreditPayment {
  credit_id: string;
  amount: number;
}

export function useCredits(customerId?: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: credits = [], isLoading, error } = useQuery({
    queryKey: ["credits", user?.id, customerId],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from("credits")
        .select(`
          *,
          customers (name)
        `)
        .order("created_at", { ascending: false });
      
      if (customerId) {
        query = query.eq("customer_id", customerId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data.map(c => ({
        ...c,
        amount: Number(c.amount),
        paid_amount: Number(c.paid_amount),
        remaining_amount: Number(c.remaining_amount),
      })) as Credit[];
    },
    enabled: !!user,
  });

  const makePayment = useMutation({
    mutationFn: async ({ credit_id, amount }: CreditPayment) => {
      // Get current credit
      const { data: credit, error: fetchError } = await supabase
        .from("credits")
        .select("*, customers(total_debt)")
        .eq("id", credit_id)
        .single();
      
      if (fetchError) throw fetchError;

      const newPaidAmount = Number(credit.paid_amount) + amount;
      const newRemainingAmount = Number(credit.amount) - newPaidAmount;
      const newStatus = newRemainingAmount <= 0 ? "paid" : "pending";

      // Update credit
      const { error: updateError } = await supabase
        .from("credits")
        .update({
          paid_amount: newPaidAmount,
          remaining_amount: Math.max(0, newRemainingAmount),
          status: newStatus,
        })
        .eq("id", credit_id);
      
      if (updateError) throw updateError;

      // Update customer total debt
      const currentDebt = Number(credit.customers?.total_debt || 0);
      const { error: customerError } = await supabase
        .from("customers")
        .update({ total_debt: Math.max(0, currentDebt - amount) })
        .eq("id", credit.customer_id);
      
      if (customerError) throw customerError;

      return { credit_id, amount };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Paiement enregistré",
        description: "Le paiement a été enregistré avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le paiement",
        variant: "destructive",
      });
    },
  });

  return {
    credits,
    isLoading,
    error,
    makePayment,
  };
}
