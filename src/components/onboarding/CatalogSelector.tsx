import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useCatalog, CatalogProduct, CatalogCategory } from "@/hooks/useCatalog";
import { useProducts } from "@/hooks/useProducts";
import { Search, Package, Loader2, Check, ShoppingBasket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CatalogSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function CatalogSelector({ open, onOpenChange, onComplete }: CatalogSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, { product: CatalogProduct; stock: number }>>(new Map());
  const [isImporting, setIsImporting] = useState(false);
  
  const { categories, products, isLoading } = useCatalog();
  const { createProduct } = useProducts();
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category_id === selectedCategory);
    }
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) ||
        p.barcode?.includes(searchTerm)
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const toggleProduct = (product: CatalogProduct) => {
    const newSelected = new Map(selectedProducts);
    if (newSelected.has(product.id)) {
      newSelected.delete(product.id);
    } else {
      newSelected.set(product.id, { product, stock: 10 });
    }
    setSelectedProducts(newSelected);
  };

  const updateStock = (productId: string, stock: number) => {
    const newSelected = new Map(selectedProducts);
    const item = newSelected.get(productId);
    if (item) {
      newSelected.set(productId, { ...item, stock: Math.max(0, stock) });
      setSelectedProducts(newSelected);
    }
  };

  const handleImport = async () => {
    if (selectedProducts.size === 0) {
      toast({
        title: "Aucun produit sélectionné",
        description: "Veuillez sélectionner au moins un produit",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    let successCount = 0;
    let errorCount = 0;

    for (const [, { product, stock }] of selectedProducts) {
      try {
        await createProduct.mutateAsync({
          name: product.name,
          barcode: product.barcode || undefined,
          purchase_price: product.avg_purchase_price,
          selling_price: product.avg_selling_price,
          stock_quantity: stock,
          stock_alert_threshold: Math.max(1, Math.floor(stock * 0.2)),
        });
        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    setIsImporting(false);

    toast({
      title: "Import terminé",
      description: `${successCount} produits importés${errorCount > 0 ? `, ${errorCount} erreurs` : ""}`,
    });

    if (successCount > 0) {
      setSelectedProducts(new Map());
      onComplete();
      onOpenChange(false);
    }
  };

  const getCategoryIcon = (category: CatalogCategory) => {
    return <Package className="h-4 w-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-primary" />
            Catalogue de produits algériens
            {selectedProducts.size > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedProducts.size} sélectionné(s)
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 flex-1 min-h-0">
          {/* Categories sidebar */}
          <div className="w-48 flex-shrink-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 pr-2">
                <Button
                  variant={selectedCategory === null ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Tous les produits
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm gap-2"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {getCategoryIcon(category)}
                    <span className="truncate">{category.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Products grid */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit ou code-barres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-2 gap-2 pr-4">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProducts.has(product.id);
                    const selectedItem = selectedProducts.get(product.id);
                    
                    return (
                      <div
                        key={product.id}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-all",
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() => toggleProduct(product)}
                      >
                        <div className="flex items-start gap-2">
                          <Checkbox 
                            checked={isSelected}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            {product.barcode && (
                              <p className="text-xs text-muted-foreground">{product.barcode}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                Achat: {product.avg_purchase_price} DA
                              </span>
                              <span className="text-xs font-medium text-primary">
                                Vente: {product.avg_selling_price} DA
                              </span>
                            </div>
                            {isSelected && selectedItem && (
                              <div className="mt-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <span className="text-xs text-muted-foreground">Stock:</span>
                                <Input
                                  type="number"
                                  value={selectedItem.stock}
                                  onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                                  className="h-7 w-20 text-xs"
                                  min={0}
                                />
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {filteredProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun produit trouvé
                  </p>
                )}
              </ScrollArea>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedProducts.size} produit(s) sélectionné(s)
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              variant="gold" 
              onClick={handleImport}
              disabled={selectedProducts.size === 0 || isImporting}
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Import en cours...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Importer {selectedProducts.size} produit(s)
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
