import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { AlertsWidget } from "@/components/dashboard/AlertsWidget";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  AlertTriangle,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { stats, isLoading } = useDashboard();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour 👋
          </h1>
          <p className="text-muted-foreground">
            Voici un aperçu de votre commerce aujourd'hui
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Chiffre d'affaires du jour"
            value={`${stats.todayRevenue.toLocaleString()} DA`}
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-success/10 text-success"
            delay={0}
          />
          <StatsCard
            title="Ventes aujourd'hui"
            value={stats.todaySalesCount.toString()}
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-primary/10 text-primary"
            delay={100}
          />
          <StatsCard
            title="Produits en stock"
            value={stats.productsCount.toString()}
            change={stats.lowStockCount > 0 ? `${stats.lowStockCount} en rupture` : undefined}
            changeType={stats.lowStockCount > 0 ? "negative" : "neutral"}
            icon={Package}
            iconColor="bg-info/10 text-info"
            delay={200}
          />
          <StatsCard
            title="Alertes actives"
            value={stats.alertsCount.toString()}
            change={stats.criticalAlertsCount > 0 ? `${stats.criticalAlertsCount} urgentes` : undefined}
            changeType={stats.criticalAlertsCount > 0 ? "negative" : "neutral"}
            icon={AlertTriangle}
            iconColor="bg-destructive/10 text-destructive"
            delay={300}
          />
        </div>

        {/* Charts and Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SalesChart />
          </div>

          {/* Alerts Widget */}
          <div className="lg:col-span-1">
            <AlertsWidget />
          </div>

          {/* Recent Sales - Full width */}
          <div className="lg:col-span-3">
            <RecentSales />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
