import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Phone,
  MessageCircle,
  Eye,
  Users,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
  {
    id: 1,
    name: "Mohamed B.",
    phone: "+213 555 123 456",
    totalDebt: 0,
    lastPurchase: "24/12/2024",
    totalPurchases: 45000,
    status: "clear",
  },
  {
    id: 2,
    name: "Fatima Z.",
    phone: "+213 666 234 567",
    totalDebt: 15000,
    lastPurchase: "24/12/2024",
    totalPurchases: 128000,
    status: "overdue",
    daysOverdue: 35,
  },
  {
    id: 3,
    name: "Ahmed K.",
    phone: "+213 777 345 678",
    totalDebt: 0,
    lastPurchase: "23/12/2024",
    totalPurchases: 67000,
    status: "clear",
  },
  {
    id: 4,
    name: "Yasmina H.",
    phone: "+213 555 456 789",
    totalDebt: 3500,
    lastPurchase: "22/12/2024",
    totalPurchases: 34000,
    status: "pending",
    daysOverdue: 12,
  },
  {
    id: 5,
    name: "Karim M.",
    phone: "+213 666 567 890",
    totalDebt: 8500,
    lastPurchase: "24/12/2024",
    totalPurchases: 89000,
    status: "pending",
    daysOverdue: 25,
  },
  {
    id: 6,
    name: "Sara L.",
    phone: "+213 777 678 901",
    totalDebt: 0,
    lastPurchase: "24/12/2024",
    totalPurchases: 52000,
    status: "clear",
  },
  {
    id: 7,
    name: "Amine R.",
    phone: "+213 555 789 012",
    totalDebt: 0,
    lastPurchase: "23/12/2024",
    totalPurchases: 41000,
    status: "clear",
  },
  {
    id: 8,
    name: "Leila D.",
    phone: "+213 666 890 123",
    totalDebt: 5200,
    lastPurchase: "22/12/2024",
    totalPurchases: 76000,
    status: "pending",
    daysOverdue: 8,
  },
];

function getDebtBadge(
  status: string,
  debt: number,
  daysOverdue?: number
) {
  if (status === "clear") {
    return (
      <Badge className="bg-success/10 text-success border-success/20">
        Aucune dette
      </Badge>
    );
  }
  if (status === "overdue") {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        {debt.toLocaleString()} DA ({daysOverdue}j)
      </Badge>
    );
  }
  return (
    <Badge className="bg-warning/10 text-warning border-warning/20">
      {debt.toLocaleString()} DA ({daysOverdue}j)
    </Badge>
  );
}

export default function Customers() {
  const totalDebt = customers.reduce((sum, c) => sum + c.totalDebt, 0);
  const customersWithDebt = customers.filter((c) => c.totalDebt > 0);
  const overdueCount = customers.filter((c) => c.status === "overdue").length;

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Clients</h1>
            <p className="text-muted-foreground">
              Gérez vos {customers.length} clients et leurs créances
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="gold" className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau client
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total clients</p>
                <p className="text-2xl font-bold text-foreground">
                  {customers.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total créances</p>
                <p className="text-2xl font-bold text-warning">
                  {totalDebt.toLocaleString()} DA
                </p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <CreditCard className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Créances en retard</p>
                <p className="text-2xl font-bold text-destructive">
                  {overdueCount}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou téléphone..."
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold">Téléphone</TableHead>
                <TableHead className="font-semibold">Créance</TableHead>
                <TableHead className="font-semibold text-right">
                  Total achats
                </TableHead>
                <TableHead className="font-semibold">Dernier achat</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow
                  key={customer.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold",
                          customer.status === "clear"
                            ? "bg-success/10 text-success"
                            : customer.status === "overdue"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning/10 text-warning"
                        )}
                      >
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getDebtBadge(
                      customer.status,
                      customer.totalDebt,
                      customer.daysOverdue
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {customer.totalPurchases.toLocaleString()} DA
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {customer.lastPurchase}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-success"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
