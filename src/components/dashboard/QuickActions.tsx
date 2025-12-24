import { Plus, Barcode, ClipboardList, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "Nouvelle vente",
    icon: ClipboardList,
    variant: "gold" as const,
  },
  {
    label: "Scanner produit",
    icon: Barcode,
    variant: "outline" as const,
  },
  {
    label: "Ajouter produit",
    icon: Plus,
    variant: "outline" as const,
  },
  {
    label: "Nouveau client",
    icon: UserPlus,
    variant: "outline" as const,
  },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <Button
          key={action.label}
          variant={action.variant}
          size="lg"
          className="gap-2 opacity-0 animate-scale-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <action.icon className="h-5 w-5" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
