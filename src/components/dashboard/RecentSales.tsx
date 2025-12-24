import { ShoppingCart, Clock, CreditCard, Wallet, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/hooks/useDashboard";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export function RecentSales() {
  const { recentSales, isLoading } = useDashboard();

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Ventes récentes</h3>
              <p className="text-sm text-muted-foreground">5 dernières transactions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : recentSales.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            Aucune vente récente
          </div>
        ) : (
          recentSales.map((sale, index) => (
            <div
              key={sale.id}
              className="px-6 py-4 hover:bg-secondary/50 transition-colors duration-200 opacity-0 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-semibold">
                    {(sale.customer_name || "A").charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {sale.customer_name || "Client anonyme"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{sale.items_count} articles</span>
                      <span>•</span>
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(sale.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {sale.total_amount.toLocaleString()} DA
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {sale.payment_method === "cash" ? (
                      <Wallet className="h-3 w-3 text-success" />
                    ) : (
                      <CreditCard className="h-3 w-3 text-warning" />
                    )}
                    <span
                      className={cn(
                        "text-xs",
                        sale.payment_method === "cash" ? "text-success" : "text-warning"
                      )}
                    >
                      {sale.payment_method === "cash" ? "Espèces" : "Crédit"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
