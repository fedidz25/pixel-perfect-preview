import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/hooks/useProfile";
import { useProducts } from "@/hooks/useProducts";
import { CatalogSelector } from "./CatalogSelector";
import { 
  BookOpen, 
  FileSpreadsheet, 
  Edit3, 
  CheckCircle2, 
  ArrowRight,
  Package,
  Sparkles,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingWizardProps {
  open: boolean;
  onComplete: () => void;
}

type Step = "welcome" | "method" | "products" | "complete";
type Method = "catalog" | "import" | "manual" | null;

export function OnboardingWizard({ open, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [method, setMethod] = useState<Method>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  
  const { profile, updateProfile } = useProfile();
  const { products } = useProducts();

  const progressValue = {
    welcome: 25,
    method: 50,
    products: 75,
    complete: 100,
  }[step];

  const handleMethodSelect = (selectedMethod: Method) => {
    setMethod(selectedMethod);
    
    if (selectedMethod === "catalog") {
      setCatalogOpen(true);
    } else {
      // For import and manual, redirect to products page
      setStep("complete");
    }
  };

  const handleProductsComplete = () => {
    setStep("complete");
  };

  const handleFinish = async () => {
    // Mark onboarding as completed
    try {
      await updateProfile.mutateAsync({
        commerce_name: profile?.commerce_name,
        owner_name: profile?.owner_name,
      });
    } catch (e) {
      // Continue even if update fails
    }
    onComplete();
  };

  const methods = [
    {
      id: "catalog" as Method,
      title: "Catalogue pré-rempli",
      description: "Sélectionnez parmi 100+ produits algériens courants avec codes-barres et prix moyens",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      time: "~5 min",
      recommended: true,
    },
    {
      id: "import" as Method,
      title: "Import Excel/CSV",
      description: "Importez votre liste depuis la page Produits (bouton Importer)",
      icon: FileSpreadsheet,
      color: "text-success",
      bgColor: "bg-success/10",
      time: "~2 min",
    },
    {
      id: "manual" as Method,
      title: "Saisie manuelle",
      description: "Ajoutez vos produits un par un depuis la page Produits",
      icon: Edit3,
      color: "text-info",
      bgColor: "bg-info/10",
      time: "Variable",
    },
  ];

  return (
    <>
      <Dialog open={open && !catalogOpen}>
        <DialogContent className="max-w-2xl [&>button]:hidden">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle>
                {step === "welcome" && "Bienvenue sur Stock DZ !"}
                {step === "method" && "Comment ajouter vos produits ?"}
                {step === "complete" && "Configuration terminée !"}
              </DialogTitle>
            </div>
            <Progress value={progressValue} className="h-2" />
          </DialogHeader>

          {step === "welcome" && (
            <div className="py-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary" />
                </div>
                <DialogDescription className="text-lg">
                  Configurons votre commerce en quelques étapes simples
                </DialogDescription>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">1</div>
                  <p className="text-sm text-muted-foreground">Choisir méthode</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <p className="text-sm text-muted-foreground">Ajouter produits</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <p className="text-sm text-muted-foreground">Commencer !</p>
                </div>
              </div>

              <Button 
                variant="gold" 
                size="lg" 
                className="w-full gap-2"
                onClick={() => setStep("method")}
              >
                Commencer la configuration
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "method" && (
            <div className="py-4">
              <DialogDescription className="mb-6">
                Choisissez la méthode qui vous convient le mieux pour ajouter vos produits
              </DialogDescription>

              <div className="space-y-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMethodSelect(m.id)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
                      "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                      m.recommended ? "border-primary/30 bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-lg", m.bgColor)}>
                        <m.icon className={cn("h-6 w-6", m.color)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{m.title}</h4>
                          {m.recommended && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                              Recommandé
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">⏱️ {m.time}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "complete" && (
            <div className="py-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {products.length > 0 ? "Félicitations !" : "Configuration terminée !"}
              </h3>
              <DialogDescription className="mb-6">
                {products.length > 0 
                  ? `Vous avez ajouté ${products.length} produit(s) à votre inventaire. Votre commerce est prêt à fonctionner !`
                  : method === "import" || method === "manual"
                    ? "Vous pouvez maintenant ajouter vos produits depuis la page Produits."
                    : "Votre commerce est prêt à fonctionner !"
                }
              </DialogDescription>

              <Button 
                variant="gold" 
                size="lg" 
                className="gap-2"
                onClick={handleFinish}
              >
                <Rocket className="h-4 w-4" />
                Accéder au tableau de bord
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Catalog selector */}
      <CatalogSelector
        open={catalogOpen}
        onOpenChange={(isOpen) => {
          setCatalogOpen(isOpen);
          if (!isOpen) {
            handleProductsComplete();
          }
        }}
        onComplete={handleProductsComplete}
      />
    </>
  );
}
