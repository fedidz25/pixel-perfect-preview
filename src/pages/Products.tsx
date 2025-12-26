import { useState } from "react";
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
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/hooks/useProducts";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { ImportExcelDialog } from "@/components/products/ImportExcelDialog";
import { CatalogSelector } from "@/components/onboarding/CatalogSelector";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { BookOpen } from "lucide-react";

function getStockBadge(stock: number, threshold: number = 10) {
  if (stock === 0) {
    return (
      <Badge variant="destructive" className="gap-1">
        <span className="h-2 w-2 rounded-full bg-current" />
        Rupture
      </Badge>
    );
  }
  if (stock <= threshold) {
    return (
      <Badge className="bg-warning text-warning-foreground gap-1">
        <span className="h-2 w-2 rounded-full bg-current" />
        {stock} unités
      </Badge>
    );
  }
  return (
    <Badge className="bg-success/10 text-success gap-1 border-success/20">
      {stock} unités
    </Badge>
  );
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const { products, isLoading, deleteProduct } = useProducts();
  const { toast } = useToast();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchQuery));
    return matchesSearch;
  });

  const handleExport = () => {
    const exportData = products.map(p => ({
      nom: p.name,
      "code-barres": p.barcode || "",
      prix_achat: p.purchase_price,
      prix_vente: p.selling_price,
      stock: p.stock_quantity,
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Produits");
    XLSX.writeFile(wb, "produits_stock_dz.xlsx");
    
    toast({
      title: "Export réussi",
      description: `${products.length} produits exportés`,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      await deleteProduct.mutateAsync(id);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Produits</h1>
            <p className="text-muted-foreground">
              Gérez votre catalogue de {products.length} produits
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setCatalogOpen(true)}>
              <BookOpen className="h-4 w-4" />
              Catalogue
            </Button>
            <ImportExcelDialog />
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <AddProductDialog />
          </div>
        </div>

        {/* Catalog Selector */}
        <CatalogSelector
          open={catalogOpen}
          onOpenChange={setCatalogOpen}
          onComplete={() => setCatalogOpen(false)}
        />

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou code-barres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun produit
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery
                  ? "Aucun produit ne correspond à votre recherche"
                  : "Commencez par ajouter vos premiers produits"}
              </p>
              {!searchQuery && <AddProductDialog />}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                  <TableHead className="font-semibold">Produit</TableHead>
                  <TableHead className="font-semibold">Code-barres</TableHead>
                  <TableHead className="font-semibold text-right">Prix achat</TableHead>
                  <TableHead className="font-semibold text-right">Prix vente</TableHead>
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={product.id}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.barcode ? (
                        <code className="text-xs bg-secondary px-2 py-1 rounded">
                          {product.barcode}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.purchase_price} DA
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {product.selling_price} DA
                    </TableCell>
                    <TableCell>
                      {getStockBadge(product.stock_quantity, product.stock_alert_threshold)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="gap-2 text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
