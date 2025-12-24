import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useCredits } from "@/hooks/useCredits";
import { CreditCard, Wallet, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CustomerCreditsDialogProps {
  customerId: string;
  customerName: string;
  totalDebt: number;
  trigger?: React.ReactNode;
}

export function CustomerCreditsDialog({ 
  customerId, 
  customerName, 
  totalDebt,
  trigger 
}: CustomerCreditsDialogProps) {
  const [open, setOpen] = useState(false);
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, string>>({});
  const { credits, isLoading, makePayment } = useCredits(customerId);

  const handlePayment = async (creditId: string, maxAmount: number) => {
    const amountStr = paymentAmounts[creditId];
    const amount = parseFloat(amountStr);
    
    if (!amount || amount <= 0 || amount > maxAmount) {
      return;
    }

    await makePayment.mutateAsync({ credit_id: creditId, amount });
    setPaymentAmounts(prev => ({ ...prev, [creditId]: "" }));
  };

  const pendingCredits = credits.filter(c => c.status !== "paid");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Gérer créances
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Créances de {customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-warning/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-warning">Total des créances</p>
          <p className="text-2xl font-bold text-warning">{totalDebt.toLocaleString()} DA</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : pendingCredits.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune créance en cours
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-3">
              {pendingCredits.map((credit) => (
                <div 
                  key={credit.id} 
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(credit.created_at), "dd/MM/yyyy", { locale: fr })}
                      </p>
                      <p className="font-semibold">
                        {credit.remaining_amount.toLocaleString()} DA restants
                      </p>
                      <p className="text-xs text-muted-foreground">
                        sur {credit.amount.toLocaleString()} DA
                      </p>
                    </div>
                    <Badge 
                      className={
                        credit.status === "paid" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }
                    >
                      {credit.status === "paid" ? "Payé" : "En attente"}
                    </Badge>
                  </div>

                  {credit.paid_amount > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Déjà payé: {credit.paid_amount.toLocaleString()} DA
                    </div>
                  )}

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Montant"
                        value={paymentAmounts[credit.id] || ""}
                        onChange={(e) => setPaymentAmounts(prev => ({
                          ...prev,
                          [credit.id]: e.target.value
                        }))}
                        max={credit.remaining_amount}
                      />
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1"
                      onClick={() => handlePayment(credit.id, credit.remaining_amount)}
                      disabled={
                        makePayment.isPending || 
                        !paymentAmounts[credit.id] ||
                        parseFloat(paymentAmounts[credit.id]) <= 0
                      }
                    >
                      <Wallet className="h-4 w-4" />
                      Payer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPaymentAmounts(prev => ({
                          ...prev,
                          [credit.id]: credit.remaining_amount.toString()
                        }));
                      }}
                    >
                      Tout
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
