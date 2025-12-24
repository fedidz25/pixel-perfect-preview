import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  user_id: string;
  name: string;
  barcode: string | null;
  category_id: string | null;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  stock_alert_threshold: number;
  expiry_date: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  barcode?: string;
  category_id?: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  stock_alert_threshold?: number;
  expiry_date?: string;
  image_url?: string;
}

export function useProducts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!user,
  });

  const createProduct = useMutation({
    mutationFn: async (input: ProductInput) => {
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("products")
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produit ajouté",
        description: "Le produit a été créé avec succès",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit",
        variant: "destructive",
      });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...input }: Partial<ProductInput> & { id: string }) => {
      const { data, error } = await supabase
        .from("products")
        .update(input)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produit modifié",
        description: "Les modifications ont été enregistrées",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le produit",
        variant: "destructive",
      });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
    },
  });

  const getProductByBarcode = async (barcode: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("barcode", barcode)
      .maybeSingle();
    
    if (error) throw error;
    return data as Product | null;
  };

  return {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByBarcode,
  };
}
