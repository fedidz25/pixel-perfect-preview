import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface Alert {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  severity: string;
  is_read: boolean;
  created_at: string;
}

export function useRealtimeAlerts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const showNotification = useCallback((alert: Alert) => {
    const variant = alert.severity === "critical" ? "destructive" : "default";
    
    toast({
      title: alert.title,
      description: alert.message || undefined,
      variant,
    });

    // Play notification sound for critical alerts
    if (alert.severity === "critical") {
      try {
        const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVVnzezJsGhCSIO6");
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch (e) {
        // Ignore audio errors
      }
    }

    // Invalidate alerts query to refresh the list
    queryClient.invalidateQueries({ queryKey: ["alerts"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
  }, [toast, queryClient]);

  useEffect(() => {
    if (!user) return;

    // Subscribe to realtime alerts
    const channel = supabase
      .channel('alerts-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('New alert received:', payload);
          const newAlert = payload.new as Alert;
          showNotification(newAlert);
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [user, showNotification]);

  return null;
}
