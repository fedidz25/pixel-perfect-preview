-- Create trigger for stock alerts
CREATE OR REPLACE FUNCTION public.check_stock_and_generate_alert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.stock_quantity <= NEW.stock_alert_threshold AND 
     (OLD.stock_quantity IS NULL OR OLD.stock_quantity > OLD.stock_alert_threshold) THEN
    INSERT INTO public.alerts (user_id, type, title, message, severity, product_id)
    VALUES (
      NEW.user_id,
      'low_stock',
      'Stock bas: ' || NEW.name,
      'Le produit "' || NEW.name || '" a atteint ' || NEW.stock_quantity || ' unités (seuil: ' || NEW.stock_alert_threshold || ')',
      CASE WHEN NEW.stock_quantity = 0 THEN 'critical' ELSE 'warning' END,
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$function$;

-- Create trigger for expiry alerts
CREATE OR REPLACE FUNCTION public.check_expiry_and_generate_alert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  days_until_expiry INTEGER;
BEGIN
  IF NEW.expiry_date IS NOT NULL THEN
    days_until_expiry := NEW.expiry_date - CURRENT_DATE;
    
    IF days_until_expiry <= 30 THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.alerts 
        WHERE product_id = NEW.id 
        AND type = 'expiry_warning' 
        AND DATE(created_at) = CURRENT_DATE
      ) THEN
        INSERT INTO public.alerts (user_id, type, title, message, severity, product_id)
        VALUES (
          NEW.user_id,
          'expiry_warning',
          CASE 
            WHEN days_until_expiry < 0 THEN 'Produit expiré: ' || NEW.name
            WHEN days_until_expiry = 0 THEN 'Expire aujourd''hui: ' || NEW.name
            WHEN days_until_expiry <= 7 THEN 'Expire bientôt: ' || NEW.name
            ELSE 'Péremption proche: ' || NEW.name
          END,
          CASE 
            WHEN days_until_expiry < 0 THEN 'Le produit "' || NEW.name || '" a expiré il y a ' || ABS(days_until_expiry) || ' jours'
            WHEN days_until_expiry = 0 THEN 'Le produit "' || NEW.name || '" expire aujourd''hui'
            ELSE 'Le produit "' || NEW.name || '" expire dans ' || days_until_expiry || ' jours'
          END,
          CASE 
            WHEN days_until_expiry < 0 THEN 'critical'
            WHEN days_until_expiry <= 7 THEN 'critical'
            ELSE 'warning'
          END,
          NEW.id
        );
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;

-- Create triggers on products table
DROP TRIGGER IF EXISTS trigger_check_stock_alert ON public.products;
CREATE TRIGGER trigger_check_stock_alert
  AFTER UPDATE OF stock_quantity ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.check_stock_and_generate_alert();

DROP TRIGGER IF EXISTS trigger_check_expiry_alert ON public.products;
CREATE TRIGGER trigger_check_expiry_alert
  AFTER INSERT OR UPDATE OF expiry_date ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.check_expiry_and_generate_alert();