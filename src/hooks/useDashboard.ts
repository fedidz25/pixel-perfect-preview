import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface DashboardStats {
  todayRevenue: number;
  todaySalesCount: number;
  productsCount: number;
  lowStockCount: number;
  alertsCount: number;
  criticalAlertsCount: number;
}

export interface RecentSale {
  id: string;
  customer_name: string | null;
  total_amount: number;
  payment_method: string;
  created_at: string;
  items_count: number;
}

export function useDashboard() {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async (): Promise<DashboardStats> => {
      if (!user) return {
        todayRevenue: 0,
        todaySalesCount: 0,
        productsCount: 0,
        lowStockCount: 0,
        alertsCount: 0,
        criticalAlertsCount: 0,
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get today's sales for current user
      const { data: todaySales } = await supabase
        .from("sales")
        .select("total_amount")
        .eq("user_id", user.id)
        .gte("created_at", today.toISOString());

      // Get products count and low stock for current user
      const { data: products } = await supabase
        .from("products")
        .select("stock_quantity, stock_alert_threshold")
        .eq("user_id", user.id);

      // Get unread alerts for current user
      const { data: alerts } = await supabase
        .from("alerts")
        .select("severity")
        .eq("user_id", user.id)
        .eq("is_read", false);

      const todayRevenue = todaySales?.reduce((sum, s) => sum + Number(s.total_amount), 0) || 0;
      const lowStockCount = products?.filter(p => p.stock_quantity <= p.stock_alert_threshold).length || 0;

      return {
        todayRevenue,
        todaySalesCount: todaySales?.length || 0,
        productsCount: products?.length || 0,
        lowStockCount,
        alertsCount: alerts?.length || 0,
        criticalAlertsCount: alerts?.filter(a => a.severity === "critical").length || 0,
      };
    },
    enabled: !!user,
  });

  const { data: recentSales = [], isLoading: recentSalesLoading } = useQuery({
    queryKey: ["recent-sales", user?.id],
    queryFn: async (): Promise<RecentSale[]> => {
      if (!user) return [];

      const { data: sales } = await supabase
        .from("sales")
        .select(`
          id,
          total_amount,
          payment_method,
          created_at,
          customers (name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (!sales) return [];

      // Get items count for each sale
      const salesWithItems = await Promise.all(
        sales.map(async (sale) => {
          const { count } = await supabase
            .from("sale_items")
            .select("*", { count: "exact", head: true })
            .eq("sale_id", sale.id);

          return {
            id: sale.id,
            customer_name: sale.customers?.name || null,
            total_amount: Number(sale.total_amount),
            payment_method: sale.payment_method,
            created_at: sale.created_at,
            items_count: count || 0,
          };
        })
      );

      return salesWithItems;
    },
    enabled: !!user,
  });

  return {
    stats: stats || {
      todayRevenue: 0,
      todaySalesCount: 0,
      productsCount: 0,
      lowStockCount: 0,
      alertsCount: 0,
      criticalAlertsCount: 0,
    },
    recentSales,
    isLoading: statsLoading || recentSalesLoading,
  };
}
