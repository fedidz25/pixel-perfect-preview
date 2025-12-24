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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Download,
  TrendingUp,
  ShoppingCart,
  Package,
  BarChart3,
} from "lucide-react";

const weeklyData = [
  { day: "Lun", ca: 45000, ventes: 38 },
  { day: "Mar", ca: 52000, ventes: 45 },
  { day: "Mer", ca: 38000, ventes: 32 },
  { day: "Jeu", ca: 65000, ventes: 52 },
  { day: "Ven", ca: 72000, ventes: 58 },
  { day: "Sam", ca: 85000, ventes: 68 },
  { day: "Dim", ca: 48000, ventes: 42 },
];

const topProducts = [
  { name: "Coca-Cola 1L", sales: 245 },
  { name: "Lait Candia", sales: 198 },
  { name: "Pain de mie", sales: 176 },
  { name: "Huile 1L", sales: 142 },
  { name: "Riz 1kg", sales: 128 },
];

const categoryData = [
  { name: "Boissons", value: 35, color: "hsl(38, 92%, 50%)" },
  { name: "Produits laitiers", value: 25, color: "hsl(160, 60%, 40%)" },
  { name: "Épicerie", value: 20, color: "hsl(210, 80%, 55%)" },
  { name: "Boulangerie", value: 12, color: "hsl(0, 72%, 51%)" },
  { name: "Snacks", value: 8, color: "hsl(270, 60%, 50%)" },
];

export default function Reports() {
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
            <Select defaultValue="week">
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
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-sm text-success font-medium">+12.5%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">405,000 DA</p>
            <p className="text-sm text-muted-foreground">
              Chiffre d'affaires semaine
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-success font-medium">+8.2%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">335</p>
            <p className="text-sm text-muted-foreground">Ventes cette semaine</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-info/10">
                <Package className="h-5 w-5 text-info" />
              </div>
              <span className="text-sm text-muted-foreground">stable</span>
            </div>
            <p className="text-2xl font-bold text-foreground">1,208 DA</p>
            <p className="text-sm text-muted-foreground">Panier moyen</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-warning/10">
                <BarChart3 className="h-5 w-5 text-warning" />
              </div>
              <span className="text-sm text-success font-medium">+5.3%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">18.5%</p>
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
              <p className="text-sm text-muted-foreground">Cette semaine</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 45%)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 45%)", fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(30, 15%, 88%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [
                      `${value.toLocaleString()} DA`,
                      "CA",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="ca"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(38, 92%, 50%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Top 5 produits</h3>
              <p className="text-sm text-muted-foreground">
                Les plus vendus cette semaine
              </p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(30, 15%, 88%)"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 45%)", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(30, 10%, 45%)", fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(30, 15%, 88%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} unités`, "Ventes"]}
                  />
                  <Bar
                    dataKey="sales"
                    fill="hsl(38, 92%, 50%)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">
              Répartition par catégorie
            </h3>
            <p className="text-sm text-muted-foreground">
              Distribution des ventes cette semaine
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-8">
              <div className="w-72 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(30, 15%, 88%)",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Part"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-4">
                {categoryData.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-foreground">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
