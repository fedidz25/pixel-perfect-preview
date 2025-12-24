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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProducts } from "@/hooks/useProducts";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { ImportExcelDialog } from "@/components/products/ImportExcelDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { products, isLoading, deleteProduct } = useProducts();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchQuery));
    return matchesSearch;
  });

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
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Importer
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="gold" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter produit
            </Button>
          </div>
        </div>

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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold">Produit</TableHead>
                <TableHead className="font-semibold">Code-barres</TableHead>
                <TableHead className="font-semibold">Catégorie</TableHead>
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
                    <code className="text-xs bg-secondary px-2 py-1 rounded">
                      {product.barcode}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.purchasePrice} DA
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.sellingPrice} DA
                  </TableCell>
                  <TableCell>{getStockBadge(product.status, product.stock)}</TableCell>
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
                        <DropdownMenuItem className="gap-2 text-destructive">
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
        </div>
      </div>
    </DashboardLayout>
  );
}
