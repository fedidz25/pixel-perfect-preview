import { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCustomers } from "@/hooks/useCustomers";
import { useSales, SaleItem } from "@/hooks/useSales";
import { Plus, Minus, Trash2, Search, ShoppingCart, Wallet, CreditCard, X, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SaleReceiptDialog } from "./SaleReceiptDialog";
import { BarcodeScanner } from "@/components/BarcodeScanner";

interface CartItem {
  product: Product;
  quantity: number;
}

interface ReceiptData {
  id: string;
  created_at: string;
  customer_name?: string | null;
  payment_method: string;
  total_amount: number;
  items: {
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
}

export function NewSaleDialog() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit">("cash");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const { toast } = useToast();

  const { products, getProductByBarcode } = useProducts();
  const { customers } = useCustomers();
  const { createSale } = useSales();

  const handleBarcodeScan = useCallback(async (barcode: string) => {
    try {
      const product = await getProductByBarcode(barcode);
      if (product) {
        addToCart(product);
        toast({
          title: "Produit ajouté",
          description: `${product.name} ajouté au panier`,
        });
      } else {
        toast({
          title: "Produit non trouvé",
          description: `Aucun produit avec le code-barres ${barcode}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rechercher le produit",
        variant: "destructive",
      });
    }
  }, [getProductByBarcode, toast]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock_quantity) {
        toast({
          title: "Stock insuffisant",
          description: `Stock disponible: ${product.stock_quantity}`,
          variant: "destructive",
        });
        return;
      }
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      if (product.stock_quantity < 1) {
        toast({
          title: "Produit en rupture",
          description: "Ce produit n'est pas disponible en stock",
          variant: "destructive",
        });
        return;
      }
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id !== productId) return item;
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) return item;
      if (newQuantity > item.product.stock_quantity) {
        toast({
          title: "Stock insuffisant",
          description: `Stock disponible: ${item.product.stock_quantity}`,
          variant: "destructive",
        });
        return item;
      }
      return { ...item, quantity: newQuantity };
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const handleSubmit = async () => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des produits au panier",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "credit" && !selectedCustomer) {
      toast({
        title: "Client requis",
        description: "Sélectionnez un client pour le paiement à crédit",
        variant: "destructive",
      });
      return;
    }

    const items: SaleItem[] = cart.map(item => ({
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.selling_price,
      subtotal: item.product.selling_price * item.quantity,
    }));

    const customerName = selectedCustomer 
      ? customers.find(c => c.id === selectedCustomer)?.name 
      : null;

    try {
      const sale = await createSale.mutateAsync({
        customer_id: selectedCustomer || undefined,
        payment_method: paymentMethod,
        items,
      });

      // Prepare receipt data
      setReceiptData({
        id: sale.id,
        created_at: sale.created_at,
        customer_name: customerName,
        payment_method: paymentMethod,
        total_amount: cartTotal,
        items: items.map(item => ({
          product_name: item.product_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
        })),
      });

      setCart([]);
      setSelectedCustomer("");
      setPaymentMethod("cash");
      setOpen(false);
      setReceiptOpen(true);
    } catch (error) {
      // Error handled by useSales hook
    }
  };

  const resetDialog = () => {
    setCart([]);
    setSearchTerm("");
    setSelectedCustomer("");
    setPaymentMethod("cash");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetDialog();
      }}>
        <DialogTrigger asChild>
          <Button variant="gold" className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle vente
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Nouvelle vente
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            {/* Left side - Product selection */}
            <div className="flex flex-col min-h-0">
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <BarcodeScanner 
                  onScan={handleBarcodeScan}
                  trigger={
                    <Button variant="outline" size="icon" title="Scanner code-barres">
                      <Camera className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
              <ScrollArea className="flex-1 border rounded-lg">
                <div className="p-2 space-y-1">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{product.selling_price.toLocaleString()} DA</span>
                          <span>•</span>
                          <span className={product.stock_quantity <= product.stock_alert_threshold ? "text-destructive" : ""}>
                            Stock: {product.stock_quantity}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun produit trouvé
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Right side - Cart */}
            <div className="flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Panier ({cart.length})</h4>
                {cart.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setCart([])}>
                    <X className="h-4 w-4 mr-1" />
                    Vider
                  </Button>
                )}
              </div>
              
              <ScrollArea className="flex-1 border rounded-lg mb-3">
                <div className="p-2 space-y-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.selling_price.toLocaleString()} DA × {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-semibold w-20 text-right">
                        {(item.product.selling_price * item.quantity).toLocaleString()} DA
                      </p>
                    </div>
                  ))}
                  {cart.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Panier vide
                    </p>
                  )}
                </div>
              </ScrollArea>

              {/* Customer & Payment */}
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Client (optionnel)</Label>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                          {customer.total_debt > 0 && (
                            <span className="text-warning ml-2">
                              ({customer.total_debt.toLocaleString()} DA)
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Mode de paiement</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Button
                      type="button"
                      variant={paymentMethod === "cash" ? "default" : "outline"}
                      className="gap-2"
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <Wallet className="h-4 w-4" />
                      Espèces
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "credit" ? "default" : "outline"}
                      className="gap-2"
                      onClick={() => setPaymentMethod("credit")}
                    >
                      <CreditCard className="h-4 w-4" />
                      Crédit
                    </Button>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{cartTotal.toLocaleString()} DA</p>
                  </div>
                  <Button 
                    variant="gold" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={cart.length === 0 || createSale.isPending}
                  >
                    {createSale.isPending ? "Enregistrement..." : "Valider la vente"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SaleReceiptDialog 
        open={receiptOpen} 
        onOpenChange={setReceiptOpen} 
        sale={receiptData} 
      />
    </>
  );
}
