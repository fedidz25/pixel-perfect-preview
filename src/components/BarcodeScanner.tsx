import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, Loader2 } from "lucide-react";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";
import { cn } from "@/lib/utils";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  trigger?: React.ReactNode;
}

export function BarcodeScanner({ onScan, trigger }: BarcodeScannerProps) {
  const [open, setOpen] = useState(false);
  const { isScanning, barcode, error, startScanning, stopScanning, videoRef } = useBarcodeScanner();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTimeout(startScanning, 100);
    } else {
      stopScanning();
    }
  };

  const handleBarcodeDetected = () => {
    if (barcode) {
      onScan(barcode);
      setOpen(false);
    }
  };

  // Auto-callback when barcode is detected
  if (barcode && open) {
    handleBarcodeDetected();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            Scanner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Scanner un code-barres
          </DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
              <div className="p-4 rounded-full bg-destructive/10">
                <X className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-destructive font-medium">{error}</p>
              <Button variant="outline" onClick={startScanning}>
                Réessayer
              </Button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className={cn(
                  "w-full h-full object-cover",
                  !isScanning && "opacity-0"
                )}
                autoPlay
                playsInline
                muted
              />
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {isScanning && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Scanning overlay */}
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-primary animate-pulse" />
                  <div className="absolute inset-8 border-2 border-primary/50 rounded-lg" />
                </div>
              )}
            </>
          )}
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Placez le code-barres dans le cadre pour le scanner
        </p>
      </DialogContent>
    </Dialog>
  );
}
