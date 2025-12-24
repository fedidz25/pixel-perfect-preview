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
  RefreshCw,
  Loader2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlerts, Alert } from "@/hooks/useAlerts";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const getAlertIcon = (type: string) => {
  switch (type) {
    case "stock":
      return Package;
    case "expiry":
      return Calendar;
    case "credit":
      return Users;
    default:
      return AlertTriangle;
  }
};

function AlertCard({
  alert,
  index,
  onMarkAsRead,
  onDelete,
}: {
  alert: Alert;
  index: number;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const Icon = getAlertIcon(alert.type);

  return (
    <div
      className={cn(
        "bg-card rounded-xl border p-4 hover:shadow-soft transition-all duration-200 opacity-0 animate-slide-in",
        alert.severity === "critical"
          ? "border-l-4 border-l-destructive border-t-border border-r-border border-b-border"
          : "border-l-4 border-l-warning border-t-border border-r-border border-b-border",
        !alert.is_read && "bg-secondary/30"
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
            <Icon className="h-5 w-5" />
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
              {!alert.is_read && (
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
            <p className="text-foreground">{alert.message}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(alert.created_at), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!alert.is_read && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onMarkAsRead(alert.id)}
            >
              Marquer lu
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive"
            onClick={() => onDelete(alert.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Alerts() {
  const { 
    alerts, 
    isLoading, 
    markAsRead, 
    markAllAsRead, 
    deleteAlert,
    generateAlerts 
  } = useAlerts();

  const criticalAlerts = alerts.filter((a) => a.severity === "critical");
  const warningAlerts = alerts.filter((a) => a.severity === "warning");
  const unreadCount = alerts.filter((a) => !a.is_read).length;

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
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => generateAlerts.mutate()}
              disabled={generateAlerts.isPending}
            >
              {generateAlerts.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Actualiser
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => markAllAsRead.mutate()}
              disabled={markAllAsRead.isPending || unreadCount === 0}
            >
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
                <p className="text-sm text-success/80">Total alertes</p>
                <p className="text-2xl font-bold text-success">{alerts.length}</p>
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

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <TabsContent value="all" className="space-y-3">
                {alerts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucune alerte. Cliquez sur "Actualiser" pour vérifier.
                  </div>
                ) : (
                  alerts.map((alert, index) => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      index={index}
                      onMarkAsRead={(id) => markAsRead.mutate(id)}
                      onDelete={(id) => deleteAlert.mutate(id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="critical" className="space-y-3">
                {criticalAlerts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucune alerte urgente
                  </div>
                ) : (
                  criticalAlerts.map((alert, index) => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      index={index}
                      onMarkAsRead={(id) => markAsRead.mutate(id)}
                      onDelete={(id) => deleteAlert.mutate(id)}
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="warning" className="space-y-3">
                {warningAlerts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucune alerte importante
                  </div>
                ) : (
                  warningAlerts.map((alert, index) => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      index={index}
                      onMarkAsRead={(id) => markAsRead.mutate(id)}
                      onDelete={(id) => deleteAlert.mutate(id)}
                    />
                  ))
                )}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
