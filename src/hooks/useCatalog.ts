import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CatalogCategory {
  id: string;
  name: string;
  name_ar: string | null;
  icon: string | null;
  color: string | null;
}

export interface CatalogProduct {
  id: string;
  category_id: string | null;
  name: string;
  name_ar: string | null;
  barcode: string | null;
  avg_purchase_price: number;
  avg_selling_price: number;
  image_url: string | null;
  unit: string | null;
}

export function useCatalog() {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["catalog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as CatalogCategory[];
    },
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["catalog-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_products")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as CatalogProduct[];
    },
  });

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId);
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.barcode?.includes(query) ||
      p.name_ar?.includes(query)
    );
  };

  return {
    categories,
    products,
    isLoading: categoriesLoading || productsLoading,
    getProductsByCategory,
    searchProducts,
  };
}
