import { ShoppingCart, Clock, CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const recentSales = [
  {
    id: 1,
    customer: "Mohamed B.",
    amount: "2,500 DA",
    items: 5,
    time: "Il y a 5 min",
    paymentMethod: "cash",
  },
  {
    id: 2,
    customer: "Fatima Z.",
    amount: "1,200 DA",
    items: 3,
    time: "Il y a 12 min",
    paymentMethod: "credit",
  },
  {
    id: 3,
    customer: "Ahmed K.",
    amount: "4,800 DA",
    items: 8,
    time: "Il y a 25 min",
    paymentMethod: "cash",
  },
  {
    id: 4,
    customer: "Yasmina H.",
    amount: "650 DA",
    items: 2,
    time: "Il y a 45 min",
    paymentMethod: "cash",
  },
  {
    id: 5,
    customer: "Karim M.",
    amount: "3,100 DA",
    items: 6,
    time: "Il y a 1h",
    paymentMethod: "credit",
  },
];

export function RecentSales() {
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
        {recentSales.map((sale, index) => (
          <div
            key={sale.id}
            className="px-6 py-4 hover:bg-secondary/50 transition-colors duration-200 opacity-0 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-primary-foreground font-semibold">
                  {sale.customer.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{sale.customer}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{sale.items} articles</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{sale.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{sale.amount}</p>
                <div className="flex items-center gap-1 justify-end">
                  {sale.paymentMethod === "cash" ? (
                    <Wallet className="h-3 w-3 text-success" />
                  ) : (
                    <CreditCard className="h-3 w-3 text-warning" />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      sale.paymentMethod === "cash" ? "text-success" : "text-warning"
                    )}
                  >
                    {sale.paymentMethod === "cash" ? "Espèces" : "Crédit"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
