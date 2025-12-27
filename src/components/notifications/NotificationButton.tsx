import { useState } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { cn } from '@/lib/utils';

export function NotificationButton() {
  const { isSupported, permission, requestPermission } = usePushNotifications();
  const [isOpen, setIsOpen] = useState(false);

  if (!isSupported) {
    return null;
  }

  const handleEnableNotifications = async () => {
    await requestPermission();
    setIsOpen(false);
  };

  const getIcon = () => {
    if (permission === 'granted') {
      return <BellRing className="h-5 w-5" />;
    }
    if (permission === 'denied') {
      return <BellOff className="h-5 w-5" />;
    }
    return <Bell className="h-5 w-5" />;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative",
            permission === 'granted' && "text-success",
            permission === 'denied' && "text-destructive"
          )}
        >
          {getIcon()}
          {permission === 'default' && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-warning rounded-full animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Notifications Push</h4>
            <p className="text-sm text-muted-foreground">
              Recevez des alertes instantanées pour :
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Produits en rupture de stock</li>
              <li>Produits qui expirent bientôt</li>
              <li>Créances clients en attente</li>
            </ul>
          </div>

          {permission === 'granted' ? (
            <div className="flex items-center gap-2 text-success">
              <BellRing className="h-4 w-4" />
              <span className="text-sm font-medium">Notifications activées</span>
            </div>
          ) : permission === 'denied' ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <BellOff className="h-4 w-4" />
                <span className="text-sm font-medium">Notifications bloquées</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Pour les activer, cliquez sur l'icône de cadenas dans la barre d'adresse et autorisez les notifications.
              </p>
            </div>
          ) : (
            <Button onClick={handleEnableNotifications} className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Activer les notifications
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
