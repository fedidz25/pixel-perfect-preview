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

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour, Ahmed 👋
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
            value="52,400 DA"
            change="+15.2% vs hier"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-success/10 text-success"
            delay={0}
          />
          <StatsCard
            title="Ventes aujourd'hui"
            value="47"
            change="+8 ventes vs hier"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-primary/10 text-primary"
            delay={100}
          />
          <StatsCard
            title="Produits en stock"
            value="1,248"
            change="12 en rupture"
            changeType="negative"
            icon={Package}
            iconColor="bg-info/10 text-info"
            delay={200}
          />
          <StatsCard
            title="Alertes actives"
            value="8"
            change="4 urgentes"
            changeType="negative"
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
