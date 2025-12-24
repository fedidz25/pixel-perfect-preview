import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Package,
  Calendar,
  Users,
  CheckCircle,
  Bell,
  BellOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    type: "stock",
    severity: "critical",
    title: "Rupture de stock",
    message: "Coca-Cola 1L - 0 unités restantes",
    icon: Package,
    time: "Il y a 2h",
    read: false,
  },
  {
    id: 2,
    type: "expiry",
    severity: "critical",
    title: "Péremption imminente",
    message: "Pain de mie - Expire demain",
    icon: Calendar,
    time: "Il y a 3h",
    read: false,
  },
  {
    id: 3,
    type: "credit",
    severity: "critical",
    title: "Créance en retard",
    message: "Fatima Z. - 15,000 DA (35 jours)",
    icon: Users,
    time: "Il y a 5h",
    read: false,
  },
  {
    id: 4,
    type: "stock",
    severity: "warning",
    title: "Stock faible",
    message: "Lait Candia 1L - 5 unités restantes",
    icon: Package,
    time: "Il y a 6h",
    read: false,
  },
  {
    id: 5,
    type: "expiry",
    severity: "warning",
    title: "Péremption proche",
    message: "Yaourt Danone x4 - Expire dans 5 jours",
    icon: Calendar,
    time: "Il y a 8h",
    read: true,
  },
  {
    id: 6,
    type: "stock",
    severity: "critical",
    title: "Rupture de stock",
    message: "Chips Lay's 100g - 0 unités restantes",
    icon: Package,
    time: "Hier",
    read: true,
  },
  {
    id: 7,
    type: "credit",
    severity: "warning",
    title: "Créance à surveiller",
    message: "Karim M. - 8,500 DA (25 jours)",
    icon: Users,
    time: "Hier",
    read: true,
  },
  {
    id: 8,
    type: "stock",
    severity: "warning",
    title: "Stock faible",
    message: "Riz 1kg - 8 unités restantes",
    icon: Package,
    time: "Hier",
    read: true,
  },
];

function AlertCard({
  alert,
  index,
}: {
  alert: (typeof alerts)[0];
  index: number;
}) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl border p-4 hover:shadow-soft transition-all duration-200 opacity-0 animate-slide-in",
        alert.severity === "critical"
          ? "border-l-4 border-l-destructive border-t-border border-r-border border-b-border"
          : "border-l-4 border-l-warning border-t-border border-r-border border-b-border",
        !alert.read && "bg-secondary/30"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-2.5 rounded-lg shrink-0",
              alert.severity === "critical"
                ? "bg-destructive/10 text-destructive"
                : "bg-warning/10 text-warning"
            )}
          >
            <alert.icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className={cn(
                  "font-semibold",
                  alert.severity === "critical"
                    ? "text-destructive"
                    : "text-warning"
                )}
              >
                {alert.title}
              </p>
              {!alert.read && (
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <p className="text-foreground">{alert.message}</p>
            <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Résoudre
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BellOff className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  const criticalAlerts = alerts.filter((a) => a.severity === "critical");
  const warningAlerts = alerts.filter((a) => a.severity === "warning");
  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Alertes</h1>
            <p className="text-muted-foreground">
              {unreadCount} alertes non lues • {criticalAlerts.length} urgentes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-destructive/10 rounded-xl border border-destructive/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-destructive/80">Alertes urgentes</p>
                <p className="text-2xl font-bold text-destructive">
                  {criticalAlerts.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-warning/10 rounded-xl border border-warning/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Bell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-warning/80">Alertes importantes</p>
                <p className="text-2xl font-bold text-warning">
                  {warningAlerts.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-success/10 rounded-xl border border-success/20 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-success/80">Résolues cette semaine</p>
                <p className="text-2xl font-bold text-success">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="all" className="gap-2">
              Toutes
              <span className="bg-muted px-1.5 py-0.5 rounded text-xs">
                {alerts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="critical" className="gap-2">
              Urgentes
              <span className="bg-destructive/10 text-destructive px-1.5 py-0.5 rounded text-xs">
                {criticalAlerts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="warning" className="gap-2">
              Importantes
              <span className="bg-warning/10 text-warning px-1.5 py-0.5 rounded text-xs">
                {warningAlerts.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {alerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="critical" className="space-y-3">
            {criticalAlerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="warning" className="space-y-3">
            {warningAlerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
