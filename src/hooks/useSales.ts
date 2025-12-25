import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Sale {
  id: string;
  user_id: string;
  customer_id: string | null;
  total_amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  customers?: {
    name: string;
  } | null;
}

export interface SaleItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface SaleInput {
  customer_id?: string;
  payment_method: "cash" | "credit";
  items: SaleItem[];
}

export function useSales() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: sales = [], isLoading, error } = useQuery({
    queryKey: ["sales", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          customers (name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Sale[];
    },
    enabled: !!user,
  });

  const createSale = useMutation({
    mutationFn: async (input: SaleInput) => {
      if (!user) throw new Error("Not authenticated");
      
      const totalAmount = input.items.reduce((sum, item) => sum + item.subtotal, 0);
      
      // Create the sale
      const { data: sale, error: saleError } = await supabase
        .from("sales")
        .insert({
          user_id: user.id,
          customer_id: input.customer_id || null,
          total_amount: totalAmount,
          payment_method: input.payment_method,
          status: input.payment_method === "credit" ? "pending" : "completed",
        })
        .select()
        .single();
      
      if (saleError) throw saleError;

      // Create sale items
      const saleItems = input.items.map(item => ({
        sale_id: sale.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal,
      }));

      const { error: itemsError } = await supabase
        .from("sale_items")
        .insert(saleItems);
      
      if (itemsError) throw itemsError;

      // If credit sale, create credit record and update customer debt
      if (input.payment_method === "credit" && input.customer_id) {
        const { error: creditError } = await supabase
          .from("credits")
          .insert({
            user_id: user.id,
            customer_id: input.customer_id,
            sale_id: sale.id,
            amount: totalAmount,
            remaining_amount: totalAmount,
          });
        
        if (creditError) throw creditError;

        // Update customer total debt manually
        const { data: customerData } = await supabase
          .from("customers")
          .select("total_debt")
          .eq("id", input.customer_id)
          .single();
        
        if (customerData) {
          await supabase
            .from("customers")
            .update({ total_debt: (customerData.total_debt || 0) + totalAmount })
            .eq("id", input.customer_id);
        }
      }
      
      return sale;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Vente enregistrée",
        description: "La vente a été créée avec succès",
      });
    },
    onError: (error) => {
      console.error("Sale error:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer la vente",
        variant: "destructive",
      });
    },
  });

  return {
    sales,
    isLoading,
    error,
    createSale,
  };
}
