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
import { Plus, User, Phone, MapPin } from "lucide-react";
import { useCustomers, CustomerInput } from "@/hooks/useCustomers";
import { useToast } from "@/hooks/use-toast";

export function AddCustomerDialog() {
  const [open, setOpen] = useState(false);
  const { createCustomer } = useCustomers();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CustomerInput>({
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast({
        title: "Erreur",
        description: "Le nom du client est requis",
        variant: "destructive",
      });
      return;
    }

    await createCustomer.mutateAsync(formData);
    setOpen(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gold" className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Nouveau client
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-name">Nom du client *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-name"
                placeholder="Ex: Mohamed Benali"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-phone">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-phone"
                placeholder="+213 555 123 456"
                value={formData.phone || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer-address">Adresse</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-address"
                placeholder="Adresse du client"
                value={formData.address || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="gold" disabled={createCustomer.isPending}>
              {createCustomer.isPending ? "Création..." : "Créer le client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
