import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Customer {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  address: string | null;
  total_debt: number;
  created_at: string;
  updated_at: string;
}

export interface CustomerInput {
  name: string;
  phone?: string;
  address?: string;
}

export function useCustomers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ["customers", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });
      
      if (error) throw error;
      return data as Customer[];
    },
    enabled: !!user,
  });

  const createCustomer = useMutation({
    mutationFn: async (input: CustomerInput) => {
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("customers")
        .insert({
          ...input,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Client ajouté",
        description: "Le client a été créé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le client",
        variant: "destructive",
      });
    },
  });

  const updateCustomer = useMutation({
    mutationFn: async ({ id, ...input }: Partial<CustomerInput> & { id: string }) => {
      const { data, error } = await supabase
        .from("customers")
        .update(input)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Client modifié",
        description: "Les modifications ont été enregistrées",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le client",
        variant: "destructive",
      });
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le client",
        variant: "destructive",
      });
    },
  });

  return {
    customers,
    isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
