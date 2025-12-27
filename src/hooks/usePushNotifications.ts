import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PushNotificationState {
  isSupported: boolean;
  permission: NotificationPermission | 'unsupported';
  isSubscribed: boolean;
}

export function usePushNotifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    permission: 'unsupported',
    isSubscribed: false,
  });

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window) {
      setState(prev => ({
        ...prev,
        isSupported: true,
        permission: Notification.permission,
      }));
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!state.isSupported) {
      toast({
        title: "Non supporté",
        description: "Les notifications ne sont pas supportées sur ce navigateur",
        variant: "destructive",
      });
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setState(prev => ({ ...prev, permission }));

      if (permission === 'granted') {
        toast({
          title: "Notifications activées",
          description: "Vous recevrez des alertes pour les stocks faibles et produits qui expirent",
        });
        return true;
      } else if (permission === 'denied') {
        toast({
          title: "Notifications refusées",
          description: "Vous pouvez les activer dans les paramètres de votre navigateur",
          variant: "destructive",
        });
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [state.isSupported, toast]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (state.permission !== 'granted') {
      console.log('Notifications not permitted');
      return;
    }

    try {
      const notification = new Notification(title, {
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        ...options,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [state.permission]);

  const showLowStockAlert = useCallback((productName: string, currentStock: number) => {
    showNotification('⚠️ Stock faible', {
      body: `${productName} - Seulement ${currentStock} unités restantes`,
      tag: `low-stock-${productName}`,
      requireInteraction: true,
    });
  }, [showNotification]);

  const showExpiryAlert = useCallback((productName: string, daysUntilExpiry: number) => {
    const message = daysUntilExpiry <= 0 
      ? `${productName} a expiré!`
      : `${productName} expire dans ${daysUntilExpiry} jour${daysUntilExpiry > 1 ? 's' : ''}`;
    
    showNotification('📅 Alerte expiration', {
      body: message,
      tag: `expiry-${productName}`,
      requireInteraction: true,
    });
  }, [showNotification]);

  const showDebtAlert = useCallback((customerName: string, amount: number) => {
    showNotification('💰 Créance en attente', {
      body: `${customerName} doit ${amount.toLocaleString()} DA`,
      tag: `debt-${customerName}`,
    });
  }, [showNotification]);

  return {
    ...state,
    requestPermission,
    showNotification,
    showLowStockAlert,
    showExpiryAlert,
    showDebtAlert,
  };
}
