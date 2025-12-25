-- Create catalog categories table
CREATE TABLE public.catalog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create catalog products table (pre-filled products)
CREATE TABLE public.catalog_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.catalog_categories(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  barcode TEXT,
  avg_purchase_price NUMERIC NOT NULL DEFAULT 0,
  avg_selling_price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT,
  unit TEXT DEFAULT 'unité',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for barcode lookup
CREATE INDEX idx_catalog_products_barcode ON public.catalog_products(barcode);
CREATE INDEX idx_catalog_products_name ON public.catalog_products(name);
CREATE INDEX idx_catalog_products_category ON public.catalog_products(category_id);

-- Add onboarding_completed field to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Enable RLS
ALTER TABLE public.catalog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (catalog is shared)
CREATE POLICY "Catalog categories are readable by everyone" 
ON public.catalog_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Catalog products are readable by everyone" 
ON public.catalog_products 
FOR SELECT 
USING (true);

-- Enable realtime for alerts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;

-- Insert catalog categories
INSERT INTO public.catalog_categories (name, name_ar, icon, color) VALUES
('Boissons', 'المشروبات', 'coffee', '#3B82F6'),
('Épicerie', 'البقالة', 'shopping-basket', '#10B981'),
('Produits laitiers', 'منتجات الألبان', 'milk', '#F59E0B'),
('Boulangerie', 'المخبوزات', 'croissant', '#8B5CF6'),
('Confiserie', 'الحلويات', 'candy', '#EC4899'),
('Conserves', 'المعلبات', 'package', '#EF4444'),
('Hygiène', 'النظافة', 'sparkles', '#06B6D4'),
('Entretien', 'التنظيف', 'spray-can', '#14B8A6'),
('Bébé', 'الأطفال', 'baby', '#F97316'),
('Surgelés', 'المجمدات', 'snowflake', '#6366F1'),
('Fruits & Légumes', 'الفواكه والخضر', 'apple', '#22C55E'),
('Viandes & Poissons', 'اللحوم والأسماك', 'beef', '#DC2626'),
('Céréales', 'الحبوب', 'wheat', '#CA8A04'),
('Huiles & Sauces', 'الزيوت والصلصات', 'droplet', '#F59E0B'),
('Snacks', 'المقرمشات', 'cookie', '#A855F7'),
('Tabac', 'التبغ', 'cigarette', '#64748B'),
('Papeterie', 'القرطاسية', 'pen', '#0EA5E9'),
('Électronique', 'الإلكترونيات', 'smartphone', '#1E40AF'),
('Cosmétiques', 'مستحضرات التجميل', 'sparkle', '#DB2777'),
('Divers', 'متفرقات', 'box', '#6B7280');