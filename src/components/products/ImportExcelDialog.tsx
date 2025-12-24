import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useProducts, ProductInput } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface ExcelRow {
  name?: string;
  nom?: string;
  barcode?: string;
  "code-barres"?: string;
  "code_barres"?: string;
  purchase_price?: number;
  "prix_achat"?: number;
  "prix d'achat"?: number;
  selling_price?: number;
  "prix_vente"?: number;
  "prix de vente"?: number;
  stock?: number;
  stock_quantity?: number;
  quantité?: number;
}

export function ImportExcelDialog() {
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<ProductInput[]>([]);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createProduct } = useProducts();
  const { toast } = useToast();

  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

        const products: ProductInput[] = jsonData.map((row) => ({
          name: row.name || row.nom || "",
          barcode: row.barcode || row["code-barres"] || row["code_barres"] || "",
          purchase_price: row.purchase_price || row["prix_achat"] || row["prix d'achat"] || 0,
          selling_price: row.selling_price || row["prix_vente"] || row["prix de vente"] || 0,
          stock_quantity: row.stock || row.stock_quantity || row.quantité || 0,
          stock_alert_threshold: 10,
        })).filter(p => p.name);

        setPreview(products);
        setFileName(file.name);
      } catch (err) {
        toast({
          title: "Erreur",
          description: "Impossible de lire le fichier Excel",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parseExcelFile(file);
    }
  };

  const handleImport = async () => {
    if (preview.length === 0) return;

    setImporting(true);
    let successCount = 0;
    let errorCount = 0;

    for (const product of preview) {
      try {
        await createProduct.mutateAsync(product);
        successCount++;
      } catch {
        errorCount++;
      }
    }

    setImporting(false);
    
    toast({
      title: "Import terminé",
      description: `${successCount} produits importés${errorCount > 0 ? `, ${errorCount} erreurs` : ""}`,
    });

    if (successCount > 0) {
      setOpen(false);
      setPreview([]);
      setFileName("");
    }
  };

  const handleReset = () => {
    setPreview([]);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) handleReset();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-success" />
            Importer des produits
          </DialogTitle>
        </DialogHeader>

        {preview.length === 0 ? (
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium mb-1">
                Cliquez pour sélectionner un fichier
              </p>
              <p className="text-sm text-muted-foreground">
                Formats supportés : Excel (.xlsx, .xls) ou CSV
              </p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning" />
                Format du fichier
              </h4>
              <p className="text-sm text-muted-foreground">
                Colonnes attendues : <code className="bg-secondary px-1 rounded">nom</code>, <code className="bg-secondary px-1 rounded">code-barres</code>, <code className="bg-secondary px-1 rounded">prix_achat</code>, <code className="bg-secondary px-1 rounded">prix_vente</code>, <code className="bg-secondary px-1 rounded">stock</code>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-foreground">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {preview.length} produits détectés
                </p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto" onClick={handleReset}>
                Changer
              </Button>
            </div>

            <div className="max-h-64 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 sticky top-0">
                  <tr>
                    <th className="text-left p-2 font-medium">Nom</th>
                    <th className="text-left p-2 font-medium">Code-barres</th>
                    <th className="text-right p-2 font-medium">Prix</th>
                    <th className="text-right p-2 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 10).map((product, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2 text-muted-foreground">{product.barcode || "-"}</td>
                      <td className="p-2 text-right">{product.selling_price} DA</td>
                      <td className="p-2 text-right">{product.stock_quantity}</td>
                    </tr>
                  ))}
                  {preview.length > 10 && (
                    <tr className="border-t">
                      <td colSpan={4} className="p-2 text-center text-muted-foreground">
                        ... et {preview.length - 10} autres produits
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button 
            variant="gold" 
            onClick={handleImport}
            disabled={preview.length === 0 || importing}
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Import en cours...
              </>
            ) : (
              `Importer ${preview.length} produits`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
