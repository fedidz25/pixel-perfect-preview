import { useState, useMemo } from "react";
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
  Search,
  Calendar,
  Download,
  Eye,
  CreditCard,
  Wallet,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { useSales } from "@/hooks/useSales";
import { NewSaleDialog } from "@/components/sales/NewSaleDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as XLSX from "xlsx";

export default function Sales() {
  const { sales, isLoading } = useSales();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSales = useMemo(() => {
    return sales.filter((sale) =>
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customers?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sales, searchTerm]);

  const todaySales = useMemo(() => {
    const today = new Date().toDateString();
    return sales.filter(
      (sale) => new Date(sale.created_at).toDateString() === today
    );
  }, [sales]);

  const todayTotal = useMemo(() => {
    return todaySales.reduce((sum, sale) => sum + Number(sale.total_amount), 0);
  }, [todaySales]);

  const todayCash = useMemo(() => {
    return todaySales
      .filter((sale) => sale.payment_method === "cash")
      .reduce((sum, sale) => sum + Number(sale.total_amount), 0);
  }, [todaySales]);

  const todayCredit = useMemo(() => {
    return todaySales
      .filter((sale) => sale.payment_method === "credit")
      .reduce((sum, sale) => sum + Number(sale.total_amount), 0);
  }, [todaySales]);

  const handleExport = () => {
    const exportData = filteredSales.map((sale) => ({
      ID: sale.id.slice(0, 8),
      "Date & Heure": format(new Date(sale.created_at), "dd/MM/yyyy HH:mm", { locale: fr }),
      Client: sale.customers?.name || "Client anonyme",
      Total: sale.total_amount,
      Paiement: sale.payment_method === "cash" ? "Espèces" : "Crédit",
      Statut: sale.status === "completed" ? "Complétée" : "En attente",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventes");
    XLSX.writeFile(workbook, `ventes_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Ventes</h1>
            <p className="text-muted-foreground">
              Historique des transactions • Aujourd'hui: {todaySales.length} ventes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <NewSaleDialog />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total du jour</p>
                <p className="text-2xl font-bold text-foreground">
                  {todayTotal.toLocaleString()} DA
                </p>
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
                <p className="text-2xl font-bold text-foreground">
                  {todayCash.toLocaleString()} DA
                </p>
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
                <p className="text-2xl font-bold text-foreground">
                  {todayCredit.toLocaleString()} DA
                </p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="font-semibold">ID</TableHead>
                  <TableHead className="font-semibold">Date & Heure</TableHead>
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold text-right">Total</TableHead>
                  <TableHead className="font-semibold">Paiement</TableHead>
                  <TableHead className="font-semibold">Statut</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      Aucune vente trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale, index) => (
                    <TableRow
                      key={sale.id}
                      className="opacity-0 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell>
                        <code className="text-xs bg-secondary px-2 py-1 rounded font-medium">
                          {sale.id.slice(0, 8)}
                        </code>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(sale.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-primary-foreground text-xs font-semibold">
                            {(sale.customers?.name || "A").charAt(0)}
                          </div>
                          <span className="font-medium">
                            {sale.customers?.name || "Client anonyme"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {Number(sale.total_amount).toLocaleString()} DA
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {sale.payment_method === "cash" ? (
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
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
