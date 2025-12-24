import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SaleItemDetail {
  id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export function useSaleItems(saleId: string | null) {
  return useQuery({
    queryKey: ["sale-items", saleId],
    queryFn: async (): Promise<SaleItemDetail[]> => {
      if (!saleId) return [];

      const { data, error } = await supabase
        .from("sale_items")
        .select("*")
        .eq("sale_id", saleId);

      if (error) throw error;
      return data.map(item => ({
        ...item,
        unit_price: Number(item.unit_price),
        subtotal: Number(item.subtotal),
      }));
    },
    enabled: !!saleId,
  });
}
