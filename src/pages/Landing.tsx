import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  QrCode, 
  BarChart3, 
  Smartphone,
  Bell,
  CreditCard,
  Wifi,
  Shield,
  Check,
  MessageCircle,
  Download,
  Package
} from 'lucide-react';
import logo from '@/assets/logo.png';

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90 backdrop-blur-md" />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 text-primary-foreground">
            <img src={logo} alt="Stock DZ" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold">Stock DZ</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium cursor-pointer">
              Fonctionnalités
            </a>
            <a href="#pricing" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium cursor-pointer">
              Tarifs
            </a>
            <a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium cursor-pointer">
              Contact
            </a>
            <Link to="/install" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm font-medium cursor-pointer flex items-center gap-1">
              <Download className="h-4 w-4" />
              Installer
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth" className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2 rounded-lg transition-colors">
              Connexion
            </Link>
            <Link to="/auth" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-6 py-2 rounded-lg font-semibold transition-colors">
              Commencer
            </Link>
          </div>

          <button 
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <a href="#features" className="block text-foreground/80 hover:text-foreground transition-colors py-2">
                Fonctionnalités
              </a>
              <a href="#pricing" className="block text-foreground/80 hover:text-foreground transition-colors py-2">
                Tarifs
              </a>
              <a href="#contact" className="block text-foreground/80 hover:text-foreground transition-colors py-2">
                Contact
              </a>
              <Link to="/install" className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors py-2">
                <Download className="h-4 w-4" />
                Installer l'app
              </Link>
              <div className="pt-4 space-y-3">
                <Link to="/auth" className="w-full block text-center border border-border text-foreground py-2 rounded-lg">
                  Connexion
                </Link>
                <Link to="/auth" className="w-full block text-center bg-primary text-primary-foreground py-2 rounded-lg font-semibold">
                  Commencer
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium">Nouveau: Mode hors-ligne intelligent</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gérez votre commerce
              <span className="block mt-2 text-accent">en toute simplicité</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl">
              Stock DZ aide les commerçants algériens à gérer leur stock, leurs ventes et leurs créances clients. 
              Simple, rapide et efficace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                Commencer gratuitement
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/install" className="w-full sm:w-auto border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Installer l'app
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold">2K+</div>
                <div className="text-sm text-primary-foreground/70">Produits catalogués</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-primary-foreground/70">Commerçants actifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99%</div>
                <div className="text-sm text-primary-foreground/70">Disponibilité</div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-12">
            <div className="grid grid-cols-2 gap-4">
              <FeatureCard 
                icon={<QrCode className="h-8 w-8" />}
                title="Scanner"
                description="Scan rapide des codes-barres"
              />
              <FeatureCard 
                icon={<Package className="h-8 w-8" />}
                title="Stock"
                description="Suivi en temps réel"
              />
              <FeatureCard 
                icon={<BarChart3 className="h-8 w-8" />}
                title="Rapports"
                description="Analyses détaillées"
              />
              <FeatureCard 
                icon={<Smartphone className="h-8 w-8" />}
                title="Mobile"
                description="Accès partout"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/15 transition-all duration-300 hover:-translate-y-1">
    <div className="text-accent mb-4">{icon}</div>
    <h3 className="text-primary-foreground font-semibold text-lg mb-1">{title}</h3>
    <p className="text-primary-foreground/70 text-sm">{description}</p>
  </div>
);

// Features Section
const Features = () => {
  const features = [
    {
      icon: QrCode,
      title: "Scanner intelligent",
      description: "Scannez les codes-barres EAN-13 instantanément. Mode rafale pour réceptions rapides."
    },
    {
      icon: Package,
      title: "Gestion de stock",
      description: "Suivez votre inventaire en temps réel avec alertes de rupture et péremption."
    },
    {
      icon: CreditCard,
      title: "Créances clients",
      description: "Gérez les crédits clients facilement. Relances WhatsApp automatiques."
    },
    {
      icon: BarChart3,
      title: "Rapports détaillés",
      description: "Analysez vos ventes avec graphiques CA, top produits et marges."
    },
    {
      icon: Wifi,
      title: "Mode hors-ligne",
      description: "Continuez à vendre sans internet. Synchronisation automatique."
    },
    {
      icon: Bell,
      title: "Alertes intelligentes",
      description: "Notifications push pour ruptures, péremptions et créances en retard."
    },
    {
      icon: Smartphone,
      title: "Mobile first",
      description: "Application mobile optimisée pour usage quotidien sur le terrain."
    },
    {
      icon: Shield,
      title: "Données sécurisées",
      description: "Vos données sont chiffrées et sauvegardées automatiquement."
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Fonctionnalités</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Tout ce dont vous avez besoin pour gérer votre commerce
          </h2>
          <p className="text-lg text-muted-foreground">
            Des outils puissants et simples conçus spécialement pour les commerçants algériens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Inscrivez-vous",
      description: "Créez votre compte en 2 minutes avec votre email.",
      items: ["Nom du commerce", "Numéro de téléphone", "Mot de passe"]
    },
    {
      number: "02",
      title: "Ajoutez vos produits",
      description: "Utilisez notre catalogue de 2000+ produits ou importez votre fichier Excel.",
      items: ["Catalogue pré-rempli", "Import Excel", "Saisie manuelle"]
    },
    {
      number: "03",
      title: "Commencez à vendre",
      description: "Téléchargez l'app mobile et commencez à enregistrer vos ventes.",
      items: ["Scanner rapide", "Ventes instantanées", "Suivi créances"]
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Comment ça marche</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Démarrez en 3 étapes simples
          </h2>
          <p className="text-lg text-muted-foreground">
            Configuration rapide pour être opérationnel en moins de 30 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full">
                  <div className="flex items-center">
                    <div className="h-0.5 flex-1 bg-border" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              )}

              <div className="bg-card rounded-2xl p-8 border border-border relative overflow-hidden group hover:border-primary transition-all duration-300 hover:shadow-xl">
                <div className="absolute -top-4 -right-4 text-8xl font-bold text-muted/20 group-hover:text-primary/10 transition-colors">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-lg">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>

                  <ul className="space-y-3">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const plans = [
    {
      name: "Gratuit",
      price: "0",
      description: "Parfait pour démarrer",
      features: [
        "Jusqu'à 100 produits",
        "Ventes illimitées",
        "1 utilisateur",
        "Support par email"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "2,000",
      description: "Pour les commerces en croissance",
      features: [
        "Produits illimités",
        "Ventes illimitées",
        "3 utilisateurs",
        "Support prioritaire",
        "Rapports avancés",
        "Mode hors-ligne"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "5,000",
      description: "Pour les multi-boutiques",
      features: [
        "Tout dans Pro",
        "Utilisateurs illimités",
        "Multi-boutiques",
        "API & intégrations",
        "Formation personnalisée",
        "Support WhatsApp dédié"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Tarifs</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-foreground">
            Des prix adaptés à votre commerce
          </h2>
          <p className="text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos besoins. Sans engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-card rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/10 scale-105' 
                  : 'border-border'
              } transition-all duration-300 hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">DA/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to="/auth"
                className={`w-full block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-2 border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {plan.name === "Business" ? "Nous contacter" : "Essayer gratuitement"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre commerce ?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Rejoignez des centaines de commerçants algériens qui gèrent leur stock intelligemment avec Stock DZ.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Créer mon compte gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/install" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Download className="h-5 w-5" />
              Installer l'app
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/60 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Gratuit pour démarrer
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Sans engagement
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Support en français et darija
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Stock DZ</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              La solution de gestion de stock conçue pour les commerçants algériens.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="#features" className="hover:text-background transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">Tarifs</a></li>
              <li><Link to="/install" className="hover:text-background transition-colors">Application mobile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="#" className="hover:text-background transition-colors">Guide de démarrage</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li><a href="#" className="hover:text-background transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-background transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-background transition-colors">contact@stockdz.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2024 Stock DZ. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-background transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page
export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
