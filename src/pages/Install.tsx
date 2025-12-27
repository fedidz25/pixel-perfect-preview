import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle, Share, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
            <Smartphone className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Installer Stock DZ</CardTitle>
          <CardDescription className="text-muted-foreground">
            Installez l'application sur votre téléphone pour un accès rapide et une utilisation hors ligne
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isInstalled ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-foreground font-medium">Application déjà installée !</p>
              <Button 
                onClick={() => navigate('/')} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Ouvrir l'application
              </Button>
            </div>
          ) : isIOS ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Pour installer sur iPhone/iPad :
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">1</div>
                  <div className="flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    <span className="text-sm">Appuyez sur le bouton Partager</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">2</div>
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Sur l'écran d'accueil</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">3</div>
                  <span className="text-sm">Confirmez l'installation</span>
                </div>
              </div>
            </div>
          ) : deferredPrompt ? (
            <Button 
              onClick={handleInstall} 
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Installer l'application
            </Button>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Pour installer, utilisez le menu de votre navigateur et sélectionnez "Installer" ou "Ajouter à l'écran d'accueil"
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-border/50">
            <h4 className="font-medium mb-3 text-foreground">Avantages de l'installation :</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Accès rapide depuis l'écran d'accueil
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Fonctionne hors ligne
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Chargement plus rapide
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Expérience plein écran
              </li>
            </ul>
          </div>

          <Button 
            variant="outline" 
            onClick={() => navigate('/auth')} 
            className="w-full"
          >
            Continuer dans le navigateur
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Install;
