import { AlertTriangle, Package, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    type: "stock",
    severity: "critical",
    title: "Rupture de stock",
    message: "Coca-Cola 1L - 0 unités restantes",
    icon: Package,
  },
  {
    id: 2,
    type: "expiry",
    severity: "warning",
    title: "Péremption proche",
    message: "Pain de mie - Expire dans 2 jours",
    icon: Calendar,
  },
  {
    id: 3,
    type: "stock",
    severity: "warning",
    title: "Stock faible",
    message: "Lait Candia 1L - 5 unités restantes",
    icon: Package,
  },
  {
    id: 4,
    type: "credit",
    severity: "critical",
    title: "Créance en retard",
    message: "Fatima Z. - 15,000 DA (35 jours)",
    icon: Users,
  },
];

export function AlertsWidget() {
  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warningCount = alerts.filter((a) => a.severity === "warning").length;

  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Alertes</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-destructive font-medium">{criticalCount} urgentes</span>
                {" • "}
                <span className="text-warning font-medium">{warningCount} importantes</span>
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className={cn(
              "px-6 py-4 hover:bg-secondary/50 transition-colors duration-200 opacity-0 animate-slide-in",
              alert.severity === "critical" && "border-l-4 border-l-destructive",
              alert.severity === "warning" && "border-l-4 border-l-warning"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg shrink-0",
                  alert.severity === "critical"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-warning/10 text-warning"
                )}
              >
                <alert.icon className="h-4 w-4" />
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm",
                    alert.severity === "critical" ? "text-destructive" : "text-warning"
                  )}
                >
                  {alert.title}
                </p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
