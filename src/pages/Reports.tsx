import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Download,
  TrendingUp,
  ShoppingCart,
  Package,
  BarChart3,
  Loader2,
} from "lucide-react";
import { useReports, Period } from "@/hooks/useReports";

export default function Reports() {
  const [period, setPeriod] = useState<Period>("week");
  const { stats, dailyData, topProducts, isLoading } = useReports(period);

  const periodLabels: Record<Period, string> = {
    today: "Aujourd'hui",
    week: "Cette semaine",
    month: "Ce mois",
    year: "Cette année",
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Rapports</h1>
            <p className="text-muted-foreground">
              Analysez les performances de votre commerce
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-success/10">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalRevenue.toLocaleString()} DA
                </p>
                <p className="text-sm text-muted-foreground">
                  Chiffre d'affaires {periodLabels[period].toLowerCase()}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalSales}</p>
                <p className="text-sm text-muted-foreground">
                  Ventes {periodLabels[period].toLowerCase()}
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Package className="h-5 w-5 text-info" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.averageBasket.toLocaleString()} DA
                </p>
                <p className="text-sm text-muted-foreground">Panier moyen</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <BarChart3 className="h-5 w-5 text-warning" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.averageMargin.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">Marge moyenne</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    Évolution du chiffre d'affaires
                  </h3>
                  <p className="text-sm text-muted-foreground">{periodLabels[period]}</p>
                </div>
                <div className="p-6">
                  {dailyData.length === 0 ? (
                    <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                      Aucune donnée pour cette période
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${value.toLocaleString()} DA`, "CA"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-foreground">Top 5 produits</h3>
                  <p className="text-sm text-muted-foreground">
                    Les plus vendus {periodLabels[period].toLowerCase()}
                  </p>
                </div>
                <div className="p-6">
                  {topProducts.length === 0 ? (
                    <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                      Aucune donnée pour cette période
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={topProducts} layout="vertical">
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          width={100}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`${value} unités`, "Ventes"]}
                        />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
