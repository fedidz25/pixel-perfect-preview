import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  User,
  Bell,
  Shield,
  Globe,
  Save,
} from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Paramètres</h1>
          <p className="text-muted-foreground">
            Configurez votre application Stock DZ
          </p>
        </div>

        {/* Commerce Info */}
        <div className="bg-card rounded-xl border border-border shadow-card mb-6 overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Informations du commerce
                </h3>
                <p className="text-sm text-muted-foreground">
                  Détails de votre entreprise
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commerce-name">Nom du commerce</Label>
                <Input id="commerce-name" defaultValue="Épicerie Ahmed" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-name">Nom du propriétaire</Label>
                <Input id="owner-name" defaultValue="Ahmed Benali" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+213 555 123 456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wilaya">Wilaya</Label>
                <Select defaultValue="alger">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alger">Alger</SelectItem>
                    <SelectItem value="oran">Oran</SelectItem>
                    <SelectItem value="constantine">Constantine</SelectItem>
                    <SelectItem value="annaba">Annaba</SelectItem>
                    <SelectItem value="blida">Blida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                defaultValue="123 Rue Didouche Mourad, Alger Centre"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border shadow-card mb-6 overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Bell className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez vos préférences de notification
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes de stock</p>
                <p className="text-sm text-muted-foreground">
                  Notifications quand le stock est faible ou en rupture
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes péremption</p>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les produits qui expirent bientôt
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes créances</p>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les créances en retard
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Rapport quotidien</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir un résumé des ventes chaque soir
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-card rounded-xl border border-border shadow-card mb-6 overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-info/10">
                <Globe className="h-5 w-5 text-info" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Langue & Région</h3>
                <p className="text-sm text-muted-foreground">
                  Préférences régionales
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ar">العربية (Darija)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Devise</Label>
                <Select defaultValue="dzd">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dzd">Dinar Algérien (DA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-xl border border-border shadow-card mb-6 overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Shield className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Sécurité</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez votre mot de passe
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="gold" size="lg" className="gap-2">
            <Save className="h-5 w-5" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
