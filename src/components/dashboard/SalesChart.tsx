import { BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Lun", sales: 45000, target: 50000 },
  { day: "Mar", sales: 52000, target: 50000 },
  { day: "Mer", sales: 38000, target: 50000 },
  { day: "Jeu", sales: 65000, target: 50000 },
  { day: "Ven", sales: 72000, target: 50000 },
  { day: "Sam", sales: 85000, target: 50000 },
  { day: "Dim", sales: 48000, target: 50000 },
];

export function SalesChart() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <BarChart3 className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Chiffre d'affaires</h3>
              <p className="text-sm text-muted-foreground">Cette semaine</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">405,000 DA</p>
            <p className="text-sm text-success">+12.5% vs semaine dernière</p>
          </div>
        </div>
      </div>
      <div className="p-6 pt-2">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} DA`, "Ventes"]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(38, 92%, 50%)"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
