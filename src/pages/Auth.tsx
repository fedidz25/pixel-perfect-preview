import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Package, Mail, Lock, User, Store, Phone, MapPin, ArrowRight } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  commerceName: z.string().min(2, "Le nom du commerce est requis"),
  ownerName: z.string().min(2, "Votre nom est requis"),
  phone: z.string().optional(),
  wilaya: z.string().optional(),
});

export default function Auth() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [commerceName, setCommerceName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      loginSchema.parse({ email: loginEmail, password: loginPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);

    if (error) {
      let message = "Erreur de connexion";
      if (error.message.includes("Invalid login credentials")) {
        message = "Email ou mot de passe incorrect";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Veuillez confirmer votre email";
      }
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Bienvenue !",
        description: "Connexion réussie",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      signupSchema.parse({ 
        email: signupEmail, 
        password: signupPassword,
        commerceName,
        ownerName,
        phone,
        wilaya
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, {
      commerce_name: commerceName,
      owner_name: ownerName,
      phone: phone || undefined,
    });
    setLoading(false);

    if (error) {
      let message = "Erreur lors de l'inscription";
      if (error.message.includes("already registered")) {
        message = "Cet email est déjà utilisé";
      }
      toast({
        title: "Erreur",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Compte créé !",
        description: "Bienvenue sur Stock DZ",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl gradient-gold flex items-center justify-center shadow-glow">
              <Package className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-card">Stock DZ</h1>
              <p className="text-card/70">Gestion de stock simplifiée</p>
            </div>
          </div>
          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl font-bold text-card leading-tight">
              Gérez votre commerce en toute simplicité
            </h2>
            <p className="text-lg text-card/80">
              Stock DZ vous aide à gérer vos produits, ventes et créances clients. 
              Conçu spécialement pour les commerçants algériens.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-card/90">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <span>Suivi de stock en temps réel</span>
              </div>
              <div className="flex items-center gap-3 text-card/90">
                <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Store className="h-4 w-4 text-success" />
                </div>
                <span>Scanner de codes-barres intégré</span>
              </div>
              <div className="flex items-center gap-3 text-card/90">
                <div className="h-8 w-8 rounded-lg bg-warning/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-warning" />
                </div>
                <span>Gestion des créances clients (Dfater)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-8">
            <div className="h-12 w-12 rounded-xl gradient-gold flex items-center justify-center shadow-md">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Stock DZ</h1>
              <p className="text-sm text-muted-foreground">Gestion de stock</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="login" className="text-base">Connexion</TabsTrigger>
              <TabsTrigger value="signup" className="text-base">Inscription</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-foreground">Bon retour !</h2>
                <p className="text-muted-foreground">
                  Connectez-vous à votre compte
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full gap-2"
                  disabled={loading}
                >
                  {loading ? "Connexion..." : "Se connecter"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-foreground">Créer un compte</h2>
                <p className="text-muted-foreground">
                  Inscrivez votre commerce gratuitement
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commerce-name">Nom du commerce *</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="commerce-name"
                        placeholder="Épicerie Ahmed"
                        value={commerceName}
                        onChange={(e) => setCommerceName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Votre nom *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="owner-name"
                        placeholder="Ahmed Benali"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+213 555 123 456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wilaya">Wilaya</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="wilaya"
                        placeholder="Alger"
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full gap-2"
                  disabled={loading}
                >
                  {loading ? "Création..." : "Créer mon compte"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  En créant un compte, vous acceptez nos conditions d'utilisation
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
