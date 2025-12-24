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
  Calendar,
  Download,
  Eye,
  CreditCard,
  Wallet,
  ShoppingCart,
} from "lucide-react";

const sales = [
  {
    id: "VNT-001245",
    date: "24/12/2024 14:32",
    customer: "Mohamed B.",
    items: 5,
    total: 2500,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "VNT-001244",
    date: "24/12/2024 14:15",
    customer: "Fatima Z.",
    items: 3,
    total: 1200,
    paymentMethod: "credit",
    status: "pending",
  },
  {
    id: "VNT-001243",
    date: "24/12/2024 13:48",
    customer: "Ahmed K.",
    items: 8,
    total: 4800,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "VNT-001242",
    date: "24/12/2024 12:22",
    customer: "Yasmina H.",
    items: 2,
    total: 650,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "VNT-001241",
    date: "24/12/2024 11:55",
    customer: "Karim M.",
    items: 6,
    total: 3100,
    paymentMethod: "credit",
    status: "pending",
  },
  {
    id: "VNT-001240",
    date: "24/12/2024 10:30",
    customer: "Sara L.",
    items: 4,
    total: 1850,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "VNT-001239",
    date: "24/12/2024 09:15",
    customer: "Amine R.",
    items: 7,
    total: 5200,
    paymentMethod: "cash",
    status: "completed",
  },
  {
    id: "VNT-001238",
    date: "23/12/2024 18:45",
    customer: "Leila D.",
    items: 3,
    total: 980,
    paymentMethod: "credit",
    status: "completed",
  },
];

export default function Sales() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Ventes</h1>
            <p className="text-muted-foreground">
              Historique des transactions • Aujourd'hui: 47 ventes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="gold" className="gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle vente
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total du jour</p>
                <p className="text-2xl font-bold text-foreground">52,400 DA</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <ShoppingCart className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paiements espèces</p>
                <p className="text-2xl font-bold text-foreground">38,200 DA</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Créances du jour</p>
                <p className="text-2xl font-bold text-foreground">14,200 DA</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10">
                <CreditCard className="h-6 w-6 text-warning" />
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
                placeholder="Rechercher par ID ou client..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Aujourd'hui
            </Button>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Date & Heure</TableHead>
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold text-center">Articles</TableHead>
                <TableHead className="font-semibold text-right">Total</TableHead>
                <TableHead className="font-semibold">Paiement</TableHead>
                <TableHead className="font-semibold">Statut</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale, index) => (
                <TableRow
                  key={sale.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <code className="text-xs bg-secondary px-2 py-1 rounded font-medium">
                      {sale.id}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {sale.customer.charAt(0)}
                      </div>
                      <span className="font-medium">{sale.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{sale.items}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {sale.total.toLocaleString()} DA
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {sale.paymentMethod === "cash" ? (
                        <>
                          <Wallet className="h-4 w-4 text-success" />
                          <span className="text-success text-sm">Espèces</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 text-warning" />
                          <span className="text-warning text-sm">Crédit</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {sale.status === "completed" ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        Complétée
                      </Badge>
                    ) : (
                      <Badge className="bg-warning/10 text-warning border-warning/20">
                        En attente
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
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
