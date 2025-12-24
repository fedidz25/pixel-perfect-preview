import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, format } from "date-fns";

export type Period = "today" | "week" | "month" | "year";

export interface ReportStats {
  totalRevenue: number;
  totalSales: number;
  averageBasket: number;
  averageMargin: number;
}

export interface DailyData {
  date: string;
  day: string;
  revenue: number;
  sales: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export function useReports(period: Period = "week") {
  const { user } = useAuth();

  const getDateRange = () => {
    const now = new Date();
    switch (period) {
      case "today":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return { start: today, end: now };
      case "week":
        return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
      case "month":
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case "year":
        return { start: startOfYear(now), end: endOfYear(now) };
    }
  };

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["report-stats", user?.id, period],
    queryFn: async (): Promise<ReportStats> => {
      if (!user) return { totalRevenue: 0, totalSales: 0, averageBasket: 0, averageMargin: 0 };

      const { start, end } = getDateRange();

      const { data: sales } = await supabase
        .from("sales")
        .select("id, total_amount")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (!sales || sales.length === 0) {
        return { totalRevenue: 0, totalSales: 0, averageBasket: 0, averageMargin: 0 };
      }

      const totalRevenue = sales.reduce((sum, s) => sum + Number(s.total_amount), 0);
      const totalSales = sales.length;
      const averageBasket = totalRevenue / totalSales;

      // Calculate margin (simplified - would need purchase_price from sale_items)
      const { data: saleItems } = await supabase
        .from("sale_items")
        .select(`
          subtotal,
          product_id,
          products (purchase_price)
        `)
        .in("sale_id", sales.map(s => s.id));

      let totalCost = 0;
      if (saleItems) {
        for (const item of saleItems) {
          const purchasePrice = (item.products as any)?.purchase_price || 0;
          totalCost += Number(purchasePrice) * (Number(item.subtotal) / Number(purchasePrice) || 1);
        }
      }

      const averageMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;

      return {
        totalRevenue,
        totalSales,
        averageBasket,
        averageMargin: Math.max(0, Math.min(100, averageMargin)),
      };
    },
    enabled: !!user,
  });

  const { data: dailyData = [], isLoading: dailyLoading } = useQuery({
    queryKey: ["report-daily", user?.id, period],
    queryFn: async (): Promise<DailyData[]> => {
      if (!user) return [];

      const { start, end } = getDateRange();

      const { data: sales } = await supabase
        .from("sales")
        .select("created_at, total_amount")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (!sales) return [];

      // Group by day
      const groupedData: Record<string, { revenue: number; sales: number }> = {};
      
      for (const sale of sales) {
        const date = format(new Date(sale.created_at), "yyyy-MM-dd");
        if (!groupedData[date]) {
          groupedData[date] = { revenue: 0, sales: 0 };
        }
        groupedData[date].revenue += Number(sale.total_amount);
        groupedData[date].sales += 1;
      }

      // Fill in missing days for the week
      const result: DailyData[] = [];
      const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
      
      if (period === "week") {
        for (let i = 0; i < 7; i++) {
          const date = new Date(start);
          date.setDate(date.getDate() + i);
          const dateStr = format(date, "yyyy-MM-dd");
          const dayName = days[date.getDay()];
          
          result.push({
            date: dateStr,
            day: dayName,
            revenue: groupedData[dateStr]?.revenue || 0,
            sales: groupedData[dateStr]?.sales || 0,
          });
        }
      } else {
        Object.entries(groupedData).forEach(([date, data]) => {
          result.push({
            date,
            day: format(new Date(date), "dd/MM"),
            ...data,
          });
        });
      }

      return result.sort((a, b) => a.date.localeCompare(b.date));
    },
    enabled: !!user,
  });

  const { data: topProducts = [], isLoading: topProductsLoading } = useQuery({
    queryKey: ["report-top-products", user?.id, period],
    queryFn: async (): Promise<TopProduct[]> => {
      if (!user) return [];

      const { start, end } = getDateRange();

      const { data: sales } = await supabase
        .from("sales")
        .select("id")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      if (!sales || sales.length === 0) return [];

      const { data: saleItems } = await supabase
        .from("sale_items")
        .select("product_name, quantity, subtotal")
        .in("sale_id", sales.map(s => s.id));

      if (!saleItems) return [];

      // Group by product
      const productData: Record<string, { sales: number; revenue: number }> = {};
      
      for (const item of saleItems) {
        if (!productData[item.product_name]) {
          productData[item.product_name] = { sales: 0, revenue: 0 };
        }
        productData[item.product_name].sales += item.quantity;
        productData[item.product_name].revenue += Number(item.subtotal);
      }

      return Object.entries(productData)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
    },
    enabled: !!user,
  });

  return {
    stats: stats || { totalRevenue: 0, totalSales: 0, averageBasket: 0, averageMargin: 0 },
    dailyData,
    topProducts,
    isLoading: statsLoading || dailyLoading || topProductsLoading,
  };
}
