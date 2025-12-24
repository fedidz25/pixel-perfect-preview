import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Package, Barcode, DollarSign } from "lucide-react";
import { useProducts, ProductInput } from "@/hooks/useProducts";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { useToast } from "@/hooks/use-toast";

export function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { createProduct } = useProducts();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    barcode: "",
    purchase_price: 0,
    selling_price: 0,
    stock_quantity: 0,
    stock_alert_threshold: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erreur",
        description: "Le nom du produit est requis",
        variant: "destructive",
      });
      return;
    }

    await createProduct.mutateAsync(formData);
    setOpen(false);
    setFormData({
      name: "",
      barcode: "",
      purchase_price: 0,
      selling_price: 0,
      stock_quantity: 0,
      stock_alert_threshold: 10,
    });
  };

  const handleBarcodeScanned = (barcode: string) => {
    setFormData(prev => ({ ...prev, barcode }));
    toast({
      title: "Code-barres scanné",
      description: barcode,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gold" className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Nouveau produit
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit *</Label>
            <Input
              id="name"
              placeholder="Ex: Coca-Cola 1L"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barcode">Code-barres</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="barcode"
                  placeholder="Ex: 5449000000439"
                  value={formData.barcode || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                  className="pl-10"
                />
              </div>
              <BarcodeScanner onScan={handleBarcodeScanned} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchase_price">Prix d'achat (DA)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="purchase_price"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.purchase_price || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, purchase_price: Number(e.target.value) }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="selling_price">Prix de vente (DA) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="selling_price"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.selling_price || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, selling_price: Number(e.target.value) }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock initial</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={formData.stock_quantity || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert_threshold">Seuil d'alerte</Label>
              <Input
                id="alert_threshold"
                type="number"
                min="0"
                placeholder="10"
                value={formData.stock_alert_threshold || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, stock_alert_threshold: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry_date">Date d'expiration</Label>
            <Input
              id="expiry_date"
              type="date"
              value={formData.expiry_date || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="gold" disabled={createProduct.isPending}>
              {createProduct.isPending ? "Création..." : "Créer le produit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
