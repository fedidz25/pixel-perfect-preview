import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Alert {
  id: string;
  user_id: string;
  type: string;
  severity: string;
  title: string;
  message: string | null;
  is_read: boolean;
  product_id: string | null;
  customer_id: string | null;
  created_at: string;
}

export function useAlerts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading, error } = useQuery({
    queryKey: ["alerts", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Alert[];
    },
    enabled: !!user,
  });

  const markAsRead = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true })
        .eq("id", alertId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      if (!user) return;
      
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alertes marquées comme lues",
      });
    },
  });

  const deleteAlert = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("id", alertId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alerte supprimée",
      });
    },
  });

  const generateAlerts = useMutation({
    mutationFn: async () => {
      if (!user) return;

      // Get products with low stock
      const { data: lowStockProducts } = await supabase
        .from("products")
        .select("id, name, stock_quantity, stock_alert_threshold")
        .lte("stock_quantity", supabase.rpc ? 10 : 10);

      // Get products with low stock (manual filter)
      const { data: allProducts } = await supabase
        .from("products")
        .select("id, name, stock_quantity, stock_alert_threshold, expiry_date");

      if (!allProducts) return;

      const alertsToCreate: Omit<Alert, "id" | "created_at">[] = [];

      // Low stock alerts
      for (const product of allProducts) {
        if (product.stock_quantity <= product.stock_alert_threshold) {
          const severity = product.stock_quantity === 0 ? "critical" : "warning";
          const title = product.stock_quantity === 0 ? "Rupture de stock" : "Stock faible";
          
          alertsToCreate.push({
            user_id: user.id,
            type: "stock",
            severity,
            title,
            message: `${product.name} - ${product.stock_quantity} unités restantes`,
            is_read: false,
            product_id: product.id,
            customer_id: null,
          });
        }

        // Expiry alerts
        if (product.expiry_date) {
          const expiryDate = new Date(product.expiry_date);
          const today = new Date();
          const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
            alertsToCreate.push({
              user_id: user.id,
              type: "expiry",
              severity: daysUntilExpiry <= 2 ? "critical" : "warning",
              title: daysUntilExpiry <= 2 ? "Péremption imminente" : "Péremption proche",
              message: `${product.name} - Expire dans ${daysUntilExpiry} jour(s)`,
              is_read: false,
              product_id: product.id,
              customer_id: null,
            });
          } else if (daysUntilExpiry <= 0) {
            alertsToCreate.push({
              user_id: user.id,
              type: "expiry",
              severity: "critical",
              title: "Produit périmé",
              message: `${product.name} - Expiré depuis ${Math.abs(daysUntilExpiry)} jour(s)`,
              is_read: false,
              product_id: product.id,
              customer_id: null,
            });
          }
        }
      }

      // Get customers with high debt
      const { data: customers } = await supabase
        .from("customers")
        .select("id, name, total_debt");

      if (customers) {
        for (const customer of customers) {
          if (Number(customer.total_debt) > 10000) {
            alertsToCreate.push({
              user_id: user.id,
              type: "credit",
              severity: Number(customer.total_debt) > 20000 ? "critical" : "warning",
              title: "Créance élevée",
              message: `${customer.name} - ${Number(customer.total_debt).toLocaleString()} DA`,
              is_read: false,
              product_id: null,
              customer_id: customer.id,
            });
          }
        }
      }

      // Clear existing alerts and create new ones
      await supabase.from("alerts").delete().eq("user_id", user.id);

      if (alertsToCreate.length > 0) {
        const { error } = await supabase.from("alerts").insert(alertsToCreate);
        if (error) throw error;
      }

      return alertsToCreate.length;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Alertes actualisées",
        description: `${count || 0} alertes générées`,
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de générer les alertes",
        variant: "destructive",
      });
    },
  });

  return {
    alerts,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteAlert,
    generateAlerts,
  };
}
