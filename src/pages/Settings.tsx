import { useState, useEffect } from "react";
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
  Bell,
  Shield,
  Globe,
  Save,
  Loader2,
  Printer,
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane"
];

export default function Settings() {
  const { profile, isLoading, updateProfile, updatePassword } = useProfile();
  const { toast } = useToast();
  
  // Form state
  const [commerceName, setCommerceName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [address, setAddress] = useState("");
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification settings (stored locally for now)
  const [stockAlerts, setStockAlerts] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [creditAlerts, setCreditAlerts] = useState(true);
  const [dailyReport, setDailyReport] = useState(false);
  
  // Receipt settings
  const [autoPrint, setAutoPrint] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  
  // Language/Region
  const [language, setLanguage] = useState("fr");
  const [currency, setCurrency] = useState("dzd");
  
  // Load profile data
  useEffect(() => {
    if (profile) {
      setCommerceName(profile.commerce_name || "");
      setOwnerName(profile.owner_name || "");
      setPhone(profile.phone || "");
      setWilaya(profile.wilaya || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync({
      commerce_name: commerceName,
      owner_name: ownerName,
      phone,
      wilaya,
      address,
    });
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }
    
    const success = await updatePassword(currentPassword, newPassword);
    if (success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

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
                <Input 
                  id="commerce-name" 
                  value={commerceName}
                  onChange={(e) => setCommerceName(e.target.value)}
                  placeholder="Ex: Épicerie Ahmed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-name">Nom du propriétaire</Label>
                <Input 
                  id="owner-name" 
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Ex: Ahmed Benali"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input 
                  id="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+213 555 123 456"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wilaya">Wilaya</Label>
                <Select value={wilaya} onValueChange={setWilaya}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    {WILAYAS.map((w, i) => (
                      <SelectItem key={w} value={w}>
                        {String(i + 1).padStart(2, '0')} - {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresse complète"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                variant="default" 
                onClick={handleSaveProfile}
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Enregistrer le profil
              </Button>
            </div>
          </div>
        </div>

        {/* Receipt Settings */}
        <div className="bg-card rounded-xl border border-border shadow-card mb-6 overflow-hidden">
          <div className="p-6 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Printer className="h-5 w-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Reçus & Impression</h3>
                <p className="text-sm text-muted-foreground">
                  Préférences d'impression des reçus
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Impression automatique</p>
                <p className="text-sm text-muted-foreground">
                  Imprimer automatiquement le reçu après chaque vente
                </p>
              </div>
              <Switch checked={autoPrint} onCheckedChange={setAutoPrint} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Afficher le logo</p>
                <p className="text-sm text-muted-foreground">
                  Inclure le nom du commerce sur les reçus
                </p>
              </div>
              <Switch checked={showLogo} onCheckedChange={setShowLogo} />
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
              <Switch checked={stockAlerts} onCheckedChange={setStockAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes péremption</p>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les produits qui expirent bientôt
                </p>
              </div>
              <Switch checked={expiryAlerts} onCheckedChange={setExpiryAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes créances</p>
                <p className="text-sm text-muted-foreground">
                  Notifications pour les créances en retard
                </p>
              </div>
              <Switch checked={creditAlerts} onCheckedChange={setCreditAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Rapport quotidien</p>
                <p className="text-sm text-muted-foreground">
                  Recevoir un résumé des ventes chaque soir
                </p>
              </div>
              <Switch checked={dailyReport} onCheckedChange={setDailyReport} />
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
                <Select value={language} onValueChange={setLanguage}>
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
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dzd">Dinar Algérien (DA)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dollar ($)</SelectItem>
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
              <Input 
                id="current-password" 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                variant="outline" 
                onClick={handleChangePassword}
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                <Shield className="h-4 w-4 mr-2" />
                Modifier le mot de passe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
