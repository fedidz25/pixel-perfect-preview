import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, Download, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ReceiptItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface ReceiptData {
  id: string;
  created_at: string;
  customer_name?: string | null;
  payment_method: string;
  total_amount: number;
  items: ReceiptItem[];
}

interface SaleReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sale: ReceiptData | null;
}

export function SaleReceiptDialog({ open, onOpenChange, sale }: SaleReceiptDialogProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!sale) return null;

  const handlePrint = () => {
    const printContent = receiptRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reçu - ${sale.id.slice(0, 8)}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              max-width: 300px;
              margin: 0 auto;
            }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { font-size: 18px; margin: 0; }
            .header p { font-size: 12px; color: #666; margin: 5px 0; }
            .divider { border-top: 1px dashed #ccc; margin: 10px 0; }
            .info { font-size: 12px; margin: 5px 0; }
            .items { margin: 15px 0; }
            .item { display: flex; justify-content: space-between; font-size: 12px; margin: 5px 0; }
            .item-name { flex: 1; }
            .item-qty { width: 30px; text-align: center; }
            .item-price { width: 80px; text-align: right; }
            .total { font-size: 16px; font-weight: bold; display: flex; justify-content: space-between; margin-top: 15px; }
            .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #666; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Reçu de vente</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Imprimer
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div 
          ref={receiptRef}
          className="bg-background p-6 rounded-lg border font-mono text-sm"
        >
          {/* Header */}
          <div className="header text-center mb-4">
            <h1 className="text-lg font-bold">Mon Commerce</h1>
            <p className="text-xs text-muted-foreground">Reçu de vente</p>
          </div>

          <div className="divider border-t border-dashed border-muted-foreground/30 my-3" />

          {/* Info */}
          <div className="info space-y-1 text-xs">
            <div className="flex justify-between">
              <span>N° Reçu:</span>
              <span className="font-medium">{sale.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{format(new Date(sale.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}</span>
            </div>
            {sale.customer_name && (
              <div className="flex justify-between">
                <span>Client:</span>
                <span>{sale.customer_name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Paiement:</span>
              <span>{sale.payment_method === "cash" ? "Espèces" : "Crédit"}</span>
            </div>
          </div>

          <div className="divider border-t border-dashed border-muted-foreground/30 my-3" />

          {/* Items */}
          <div className="items space-y-2">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span className="flex-1">Article</span>
              <span className="w-8 text-center">Qté</span>
              <span className="w-20 text-right">Prix</span>
            </div>
            {sale.items.map((item, index) => (
              <div key={index} className="item flex justify-between text-xs">
                <span className="item-name flex-1 truncate pr-2">{item.product_name}</span>
                <span className="item-qty w-8 text-center">{item.quantity}</span>
                <span className="item-price w-20 text-right">{item.subtotal.toLocaleString()} DA</span>
              </div>
            ))}
          </div>

          <div className="divider border-t border-dashed border-muted-foreground/30 my-3" />

          {/* Total */}
          <div className="total flex justify-between text-base font-bold">
            <span>TOTAL</span>
            <span>{sale.total_amount.toLocaleString()} DA</span>
          </div>

          <div className="divider border-t border-dashed border-muted-foreground/30 my-3" />

          {/* Footer */}
          <div className="footer text-center text-xs text-muted-foreground">
            <p>Merci pour votre achat!</p>
            <p className="mt-1">À bientôt</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
