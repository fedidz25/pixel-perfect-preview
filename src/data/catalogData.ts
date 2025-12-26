// Extended catalog with ~2000 products for Algerian market

export interface CatalogCategoryData {
  name: string;
  name_ar: string;
  icon: string;
  color: string;
  products: CatalogProductData[];
}

export interface CatalogProductData {
  name: string;
  name_ar: string;
  barcode: string;
  avg_purchase_price: number;
  avg_selling_price: number;
  unit: string;
}

// Helper to generate barcodes
const generateBarcode = (prefix: string, index: number): string => {
  return `${prefix}${String(index).padStart(8, '0')}`;
};

// Helper to generate product variants
const generateVariants = (
  baseName: string,
  baseNameAr: string,
  variants: string[],
  barcodePrefix: string,
  basePrice: number,
  unit: string,
  startIndex: number
): CatalogProductData[] => {
  return variants.map((variant, i) => ({
    name: `${baseName} ${variant}`,
    name_ar: `${baseNameAr} ${variant}`,
    barcode: generateBarcode(barcodePrefix, startIndex + i),
    avg_purchase_price: Math.round(basePrice * (0.9 + Math.random() * 0.2)),
    avg_selling_price: Math.round(basePrice * (1.15 + Math.random() * 0.15)),
    unit,
  }));
};

// Brand names commonly found in Algeria
const brands = {
  dairy: ['Soummam', 'Danone', 'Hodna', 'Tifra', 'La Vache Qui Rit', 'Candia', 'Trèfle'],
  beverages: ['Hamoud Boualem', 'Ifri', 'Ngaous', 'Rouiba', 'Coca-Cola', 'Pepsi', 'Sprite', 'Fanta', 'Mirinda'],
  oils: ['Cevital', 'Afia', 'Safia', 'Elio', 'Fleurial', 'Lesieur'],
  pasta: ['Sim', 'La Pasta', 'Amor Benamor', 'El Milia', 'Warda'],
  flour: ['Sfiha', 'Safina', 'El Ghalia'],
  coffee: ['Café Essalem', 'Café Negro', 'Nescafé', 'Lavazza'],
  chocolate: ['La Cigogne', 'Hamza', 'Milka', 'Kinder', 'Ferrero'],
  biscuits: ['Bimo', 'LU', 'Delichoc', 'Biscuiterie Moderne'],
  cleaning: ['Isis', 'Henkel', 'Mr Propre', 'Javel Lacroix', 'OMO', 'Ariel', 'Persil', 'Tide'],
  personal: ['Palmolive', 'Dove', 'Nivea', 'L\'Oréal', 'Head & Shoulders', 'Sunsilk'],
};

const sizes = {
  small: ['100g', '125g', '150g', '200g', '250g'],
  medium: ['300g', '400g', '500g', '750g'],
  large: ['1kg', '1.5kg', '2kg', '5kg', '10kg', '25kg'],
  liquid: ['20cl', '25cl', '33cl', '50cl', '1L', '1.5L', '2L', '5L'],
  pack: ['Pack 6', 'Pack 12', 'Pack 24'],
};

export const catalogCategories: CatalogCategoryData[] = [
  // 1. PRODUITS LAITIERS (Dairy)
  {
    name: 'Produits Laitiers',
    name_ar: 'منتجات الألبان',
    icon: 'Milk',
    color: '#3B82F6',
    products: [
      // Lait (Milk) - ~50 products
      ...brands.dairy.flatMap((brand, bi) => 
        ['Entier', 'Demi-écrémé', 'Écrémé'].flatMap((type, ti) =>
          ['1L', '50cl', 'Pack 6x1L'].map((size, si) => ({
            name: `Lait ${brand} ${type} ${size}`,
            name_ar: `حليب ${brand} ${size}`,
            barcode: generateBarcode('621', bi * 100 + ti * 10 + si),
            avg_purchase_price: size.includes('Pack') ? 450 : size === '1L' ? 85 : 45,
            avg_selling_price: size.includes('Pack') ? 520 : size === '1L' ? 100 : 55,
            unit: 'unité',
          }))
        )
      ),
      // Yaourt (Yogurt) - ~60 products
      ...brands.dairy.flatMap((brand, bi) =>
        ['Nature', 'Fraise', 'Vanille', 'Pêche', 'Abricot', 'Fruits des bois', 'Céréales', 'Miel'].map((flavor, fi) => ({
          name: `Yaourt ${brand} ${flavor}`,
          name_ar: `ياغورت ${brand} ${flavor}`,
          barcode: generateBarcode('622', bi * 100 + fi),
          avg_purchase_price: 30 + Math.floor(Math.random() * 15),
          avg_selling_price: 45 + Math.floor(Math.random() * 15),
          unit: 'unité',
        }))
      ),
      // Fromage (Cheese) - ~40 products
      { name: 'Fromage La Vache Qui Rit 8 portions', name_ar: 'جبنة البقرة الضاحكة 8 قطع', barcode: '623000001', avg_purchase_price: 180, avg_selling_price: 220, unit: 'unité' },
      { name: 'Fromage La Vache Qui Rit 16 portions', name_ar: 'جبنة البقرة الضاحكة 16 قطع', barcode: '623000002', avg_purchase_price: 340, avg_selling_price: 400, unit: 'unité' },
      { name: 'Fromage La Vache Qui Rit 24 portions', name_ar: 'جبنة البقرة الضاحكة 24 قطع', barcode: '623000003', avg_purchase_price: 480, avg_selling_price: 550, unit: 'unité' },
      { name: 'Fromage Kiri 6 portions', name_ar: 'جبنة كيري 6 قطع', barcode: '623000004', avg_purchase_price: 220, avg_selling_price: 270, unit: 'unité' },
      { name: 'Fromage Kiri 12 portions', name_ar: 'جبنة كيري 12 قطع', barcode: '623000005', avg_purchase_price: 400, avg_selling_price: 480, unit: 'unité' },
      { name: 'Fromage fondu Soummam 8 portions', name_ar: 'جبنة مطبوخة سومام 8 قطع', barcode: '623000006', avg_purchase_price: 150, avg_selling_price: 190, unit: 'unité' },
      { name: 'Fromage Cheddar tranches 200g', name_ar: 'جبنة شيدر شرائح 200غ', barcode: '623000007', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Fromage Emmental râpé 200g', name_ar: 'جبنة إيمنتال مبشورة 200غ', barcode: '623000008', avg_purchase_price: 320, avg_selling_price: 400, unit: 'unité' },
      { name: 'Fromage Mozzarella 200g', name_ar: 'جبنة موزاريلا 200غ', barcode: '623000009', avg_purchase_price: 300, avg_selling_price: 380, unit: 'unité' },
      { name: 'Fromage Camembert 250g', name_ar: 'جبنة كممبير 250غ', barcode: '623000010', avg_purchase_price: 450, avg_selling_price: 550, unit: 'unité' },
      // Beurre (Butter)
      { name: 'Beurre Soummam 200g', name_ar: 'زبدة سومام 200غ', barcode: '624000001', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Beurre Soummam 500g', name_ar: 'زبدة سومام 500غ', barcode: '624000002', avg_purchase_price: 650, avg_selling_price: 780, unit: 'unité' },
      { name: 'Beurre Président 200g', name_ar: 'زبدة بريزيدون 200غ', barcode: '624000003', avg_purchase_price: 350, avg_selling_price: 420, unit: 'unité' },
      { name: 'Margarine Fleurial 500g', name_ar: 'مارغرين فلوريال 500غ', barcode: '624000004', avg_purchase_price: 180, avg_selling_price: 230, unit: 'unité' },
      { name: 'Margarine La Fermière 250g', name_ar: 'مارغرين لا فرميير 250غ', barcode: '624000005', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      // Crème fraîche
      { name: 'Crème fraîche Soummam 20cl', name_ar: 'كريمة طازجة سومام 20سل', barcode: '625000001', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Crème fraîche Candia 50cl', name_ar: 'كريمة طازجة كانديا 50سل', barcode: '625000002', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      // Lben
      { name: 'Lben Soummam 1L', name_ar: 'لبن سومام 1ل', barcode: '626000001', avg_purchase_price: 80, avg_selling_price: 100, unit: 'unité' },
      { name: 'Lben Hodna 1L', name_ar: 'لبن حضنة 1ل', barcode: '626000002', avg_purchase_price: 75, avg_selling_price: 95, unit: 'unité' },
      { name: 'Lben Danone 50cl', name_ar: 'لبن دانون 50سل', barcode: '626000003', avg_purchase_price: 45, avg_selling_price: 60, unit: 'unité' },
      // Raïb
      { name: 'Raïb Soummam 1L', name_ar: 'رايب سومام 1ل', barcode: '627000001', avg_purchase_price: 90, avg_selling_price: 110, unit: 'unité' },
      { name: 'Raïb Hodna 1L', name_ar: 'رايب حضنة 1ل', barcode: '627000002', avg_purchase_price: 85, avg_selling_price: 105, unit: 'unité' },
    ],
  },

  // 2. BOISSONS (Beverages)
  {
    name: 'Boissons',
    name_ar: 'المشروبات',
    icon: 'Wine',
    color: '#EF4444',
    products: [
      // Eau minérale (Mineral water) - ~30 products
      { name: 'Eau Ifri 0.5L', name_ar: 'ماء إفري 0.5ل', barcode: '631000001', avg_purchase_price: 25, avg_selling_price: 35, unit: 'unité' },
      { name: 'Eau Ifri 1.5L', name_ar: 'ماء إفري 1.5ل', barcode: '631000002', avg_purchase_price: 40, avg_selling_price: 55, unit: 'unité' },
      { name: 'Eau Ifri Pack 6x1.5L', name_ar: 'ماء إفري 6×1.5ل', barcode: '631000003', avg_purchase_price: 220, avg_selling_price: 280, unit: 'pack' },
      { name: 'Eau Saïda 0.5L', name_ar: 'ماء سعيدة 0.5ل', barcode: '631000004', avg_purchase_price: 22, avg_selling_price: 32, unit: 'unité' },
      { name: 'Eau Saïda 1.5L', name_ar: 'ماء سعيدة 1.5ل', barcode: '631000005', avg_purchase_price: 38, avg_selling_price: 52, unit: 'unité' },
      { name: 'Eau Guedila 0.5L', name_ar: 'ماء قديلة 0.5ل', barcode: '631000006', avg_purchase_price: 23, avg_selling_price: 33, unit: 'unité' },
      { name: 'Eau Guedila 1.5L', name_ar: 'ماء قديلة 1.5ل', barcode: '631000007', avg_purchase_price: 36, avg_selling_price: 50, unit: 'unité' },
      { name: 'Eau Lalla Khedidja 0.5L', name_ar: 'ماء لالة خديجة 0.5ل', barcode: '631000008', avg_purchase_price: 28, avg_selling_price: 40, unit: 'unité' },
      { name: 'Eau Lalla Khedidja 1.5L', name_ar: 'ماء لالة خديجة 1.5ل', barcode: '631000009', avg_purchase_price: 45, avg_selling_price: 60, unit: 'unité' },
      { name: 'Eau Toudja 5L', name_ar: 'ماء توجة 5ل', barcode: '631000010', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      // Sodas - ~60 products
      ...brands.beverages.flatMap((brand, bi) =>
        ['33cl', '50cl', '1L', '1.5L', '2L'].map((size, si) => ({
          name: `${brand} ${size}`,
          name_ar: `${brand} ${size}`,
          barcode: generateBarcode('632', bi * 10 + si),
          avg_purchase_price: size === '33cl' ? 35 : size === '50cl' ? 50 : size === '1L' ? 75 : size === '1.5L' ? 90 : 110,
          avg_selling_price: size === '33cl' ? 50 : size === '50cl' ? 70 : size === '1L' ? 100 : size === '1.5L' ? 120 : 150,
          unit: 'unité',
        }))
      ),
      // Jus de fruits (Fruit juices) - ~50 products
      ...['Orange', 'Pomme', 'Raisin', 'Mangue', 'Cocktail', 'Ananas', 'Pêche', 'Abricot'].flatMap((fruit, fi) =>
        ['Rouiba', 'Ngaous', 'Ifri'].flatMap((brand, bi) =>
          ['20cl', '1L'].map((size, si) => ({
            name: `Jus ${brand} ${fruit} ${size}`,
            name_ar: `عصير ${brand} ${fruit} ${size}`,
            barcode: generateBarcode('633', fi * 100 + bi * 10 + si),
            avg_purchase_price: size === '20cl' ? 40 : 120,
            avg_selling_price: size === '20cl' ? 55 : 160,
            unit: 'unité',
          }))
        )
      ),
      // Sirop (Syrup)
      { name: 'Sirop Hamoud Boualem Grenadine 1L', name_ar: 'شراب حمود بوعلام رمان 1ل', barcode: '634000001', avg_purchase_price: 180, avg_selling_price: 230, unit: 'unité' },
      { name: 'Sirop Hamoud Boualem Menthe 1L', name_ar: 'شراب حمود بوعلام نعناع 1ل', barcode: '634000002', avg_purchase_price: 180, avg_selling_price: 230, unit: 'unité' },
      { name: 'Sirop Hamoud Boualem Citron 1L', name_ar: 'شراب حمود بوعلام ليمون 1ل', barcode: '634000003', avg_purchase_price: 180, avg_selling_price: 230, unit: 'unité' },
      { name: 'Sirop Teisseire Grenadine 75cl', name_ar: 'شراب تيسير رمان 75سل', barcode: '634000004', avg_purchase_price: 350, avg_selling_price: 420, unit: 'unité' },
      // Energy drinks
      { name: 'Red Bull 25cl', name_ar: 'ريد بول 25سل', barcode: '635000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Monster Energy 50cl', name_ar: 'مونستر إنرجي 50سل', barcode: '635000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Power Horse 25cl', name_ar: 'باور هورس 25سل', barcode: '635000003', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
    ],
  },

  // 3. ÉPICERIE SALÉE (Grocery - Savory)
  {
    name: 'Épicerie Salée',
    name_ar: 'البقالة المالحة',
    icon: 'ShoppingBasket',
    color: '#F59E0B',
    products: [
      // Pâtes (Pasta) - ~60 products
      ...brands.pasta.flatMap((brand, bi) =>
        ['Spaghetti', 'Macaroni', 'Coquillettes', 'Penne', 'Farfalle', 'Lasagne', 'Cheveux d\'ange', 'Torsades'].flatMap((type, ti) =>
          ['500g', '1kg'].map((size, si) => ({
            name: `${type} ${brand} ${size}`,
            name_ar: `${type} ${brand} ${size}`,
            barcode: generateBarcode('641', bi * 100 + ti * 10 + si),
            avg_purchase_price: size === '500g' ? 65 : 120,
            avg_selling_price: size === '500g' ? 85 : 160,
            unit: 'unité',
          }))
        )
      ),
      // Couscous
      { name: 'Couscous Sim Fin 500g', name_ar: 'كسكس سيم ناعم 500غ', barcode: '642000001', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      { name: 'Couscous Sim Fin 1kg', name_ar: 'كسكس سيم ناعم 1كغ', barcode: '642000002', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Couscous Sim Moyen 500g', name_ar: 'كسكس سيم وسط 500غ', barcode: '642000003', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      { name: 'Couscous Sim Moyen 1kg', name_ar: 'كسكس سيم وسط 1كغ', barcode: '642000004', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Couscous Warda Fin 1kg', name_ar: 'كسكس وردة ناعم 1كغ', barcode: '642000005', avg_purchase_price: 160, avg_selling_price: 210, unit: 'unité' },
      // Riz (Rice)
      { name: 'Riz Basmati 1kg', name_ar: 'أرز بسمتي 1كغ', barcode: '643000001', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Riz Basmati 5kg', name_ar: 'أرز بسمتي 5كغ', barcode: '643000002', avg_purchase_price: 1300, avg_selling_price: 1600, unit: 'unité' },
      { name: 'Riz Long Grain 1kg', name_ar: 'أرز طويل الحبة 1كغ', barcode: '643000003', avg_purchase_price: 180, avg_selling_price: 240, unit: 'unité' },
      { name: 'Riz Long Grain 5kg', name_ar: 'أرز طويل الحبة 5كغ', barcode: '643000004', avg_purchase_price: 850, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Riz Rond 1kg', name_ar: 'أرز دائري 1كغ', barcode: '643000005', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Riz Rond 5kg', name_ar: 'أرز دائري 5كغ', barcode: '643000006', avg_purchase_price: 750, avg_selling_price: 1000, unit: 'unité' },
      // Farine (Flour)
      { name: 'Farine Sfiha 1kg', name_ar: 'فرينة صفيحة 1كغ', barcode: '644000001', avg_purchase_price: 60, avg_selling_price: 80, unit: 'unité' },
      { name: 'Farine Sfiha 5kg', name_ar: 'فرينة صفيحة 5كغ', barcode: '644000002', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Farine Safina 1kg', name_ar: 'فرينة سفينة 1كغ', barcode: '644000003', avg_purchase_price: 55, avg_selling_price: 75, unit: 'unité' },
      { name: 'Farine Safina 5kg', name_ar: 'فرينة سفينة 5كغ', barcode: '644000004', avg_purchase_price: 260, avg_selling_price: 330, unit: 'unité' },
      { name: 'Semoule Fine 1kg', name_ar: 'سميد ناعم 1كغ', barcode: '644000005', avg_purchase_price: 70, avg_selling_price: 95, unit: 'unité' },
      { name: 'Semoule Fine 5kg', name_ar: 'سميد ناعم 5كغ', barcode: '644000006', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Semoule Moyenne 1kg', name_ar: 'سميد وسط 1كغ', barcode: '644000007', avg_purchase_price: 70, avg_selling_price: 95, unit: 'unité' },
      { name: 'Semoule Grosse 1kg', name_ar: 'سميد كبير 1كغ', barcode: '644000008', avg_purchase_price: 75, avg_selling_price: 100, unit: 'unité' },
      // Huiles (Oils) - ~30 products
      ...brands.oils.flatMap((brand, bi) =>
        ['1L', '2L', '5L'].map((size, si) => ({
          name: `Huile de table ${brand} ${size}`,
          name_ar: `زيت مائدة ${brand} ${size}`,
          barcode: generateBarcode('645', bi * 10 + si),
          avg_purchase_price: size === '1L' ? 280 : size === '2L' ? 540 : 1300,
          avg_selling_price: size === '1L' ? 350 : size === '2L' ? 680 : 1650,
          unit: 'unité',
        }))
      ),
      { name: 'Huile d\'olive extra vierge 50cl', name_ar: 'زيت زيتون بكر ممتاز 50سل', barcode: '645100001', avg_purchase_price: 600, avg_selling_price: 800, unit: 'unité' },
      { name: 'Huile d\'olive extra vierge 1L', name_ar: 'زيت زيتون بكر ممتاز 1ل', barcode: '645100002', avg_purchase_price: 1100, avg_selling_price: 1400, unit: 'unité' },
      { name: 'Huile d\'olive vierge 5L', name_ar: 'زيت زيتون بكر 5ل', barcode: '645100003', avg_purchase_price: 5000, avg_selling_price: 6200, unit: 'unité' },
      // Sucre (Sugar)
      { name: 'Sucre blanc 1kg', name_ar: 'سكر أبيض 1كغ', barcode: '646000001', avg_purchase_price: 110, avg_selling_price: 140, unit: 'unité' },
      { name: 'Sucre blanc 5kg', name_ar: 'سكر أبيض 5كغ', barcode: '646000002', avg_purchase_price: 520, avg_selling_price: 650, unit: 'unité' },
      { name: 'Sucre morceaux 1kg', name_ar: 'سكر مكعبات 1كغ', barcode: '646000003', avg_purchase_price: 130, avg_selling_price: 170, unit: 'unité' },
      { name: 'Sucre glace 500g', name_ar: 'سكر بودرة 500غ', barcode: '646000004', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      // Sel (Salt)
      { name: 'Sel de table 1kg', name_ar: 'ملح طعام 1كغ', barcode: '647000001', avg_purchase_price: 20, avg_selling_price: 35, unit: 'unité' },
      { name: 'Sel fin iodé 500g', name_ar: 'ملح ناعم ميودي 500غ', barcode: '647000002', avg_purchase_price: 25, avg_selling_price: 40, unit: 'unité' },
      { name: 'Gros sel 1kg', name_ar: 'ملح خشن 1كغ', barcode: '647000003', avg_purchase_price: 18, avg_selling_price: 30, unit: 'unité' },
      // Conserves (Canned goods)
      { name: 'Concentré de tomate 200g', name_ar: 'معجون طماطم 200غ', barcode: '648000001', avg_purchase_price: 60, avg_selling_price: 85, unit: 'unité' },
      { name: 'Concentré de tomate 400g', name_ar: 'معجون طماطم 400غ', barcode: '648000002', avg_purchase_price: 110, avg_selling_price: 150, unit: 'unité' },
      { name: 'Concentré de tomate 800g', name_ar: 'معجون طماطم 800غ', barcode: '648000003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Double concentré de tomate 200g', name_ar: 'معجون طماطم مركز 200غ', barcode: '648000004', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      { name: 'Tomates pelées 400g', name_ar: 'طماطم مقشرة 400غ', barcode: '648000005', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Pois chiches 400g', name_ar: 'حمص 400غ', barcode: '648000006', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Haricots blancs 400g', name_ar: 'فاصوليا بيضاء 400غ', barcode: '648000007', avg_purchase_price: 80, avg_selling_price: 115, unit: 'unité' },
      { name: 'Lentilles 400g', name_ar: 'عدس 400غ', barcode: '648000008', avg_purchase_price: 75, avg_selling_price: 110, unit: 'unité' },
      { name: 'Maïs doux 340g', name_ar: 'ذرة حلوة 340غ', barcode: '648000009', avg_purchase_price: 100, avg_selling_price: 140, unit: 'unité' },
      { name: 'Petits pois 400g', name_ar: 'بازلاء 400غ', barcode: '648000010', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Olives vertes 400g', name_ar: 'زيتون أخضر 400غ', barcode: '648000011', avg_purchase_price: 180, avg_selling_price: 240, unit: 'unité' },
      { name: 'Olives noires 400g', name_ar: 'زيتون أسود 400غ', barcode: '648000012', avg_purchase_price: 200, avg_selling_price: 270, unit: 'unité' },
      { name: 'Sardines à l\'huile 125g', name_ar: 'سردين بالزيت 125غ', barcode: '648000013', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Thon à l\'huile 160g', name_ar: 'تونة بالزيت 160غ', barcode: '648000014', avg_purchase_price: 250, avg_selling_price: 320, unit: 'unité' },
      { name: 'Thon au naturel 160g', name_ar: 'تونة طبيعية 160غ', barcode: '648000015', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      // Épices (Spices)
      { name: 'Poivre noir moulu 50g', name_ar: 'فلفل أسود مطحون 50غ', barcode: '649000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Cumin moulu 50g', name_ar: 'كمون مطحون 50غ', barcode: '649000002', avg_purchase_price: 70, avg_selling_price: 100, unit: 'unité' },
      { name: 'Paprika doux 50g', name_ar: 'بابريكا حلوة 50غ', barcode: '649000003', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Piment rouge moulu 50g', name_ar: 'فلفل أحمر مطحون 50غ', barcode: '649000004', avg_purchase_price: 65, avg_selling_price: 95, unit: 'unité' },
      { name: 'Curcuma 50g', name_ar: 'كركم 50غ', barcode: '649000005', avg_purchase_price: 75, avg_selling_price: 110, unit: 'unité' },
      { name: 'Gingembre moulu 50g', name_ar: 'زنجبيل مطحون 50غ', barcode: '649000006', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Cannelle moulue 50g', name_ar: 'قرفة مطحونة 50غ', barcode: '649000007', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Ras el hanout 100g', name_ar: 'رأس الحانوت 100غ', barcode: '649000008', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Harissa 100g', name_ar: 'هريسة 100غ', barcode: '649000009', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Laurier feuilles 20g', name_ar: 'ورق الغار 20غ', barcode: '649000010', avg_purchase_price: 40, avg_selling_price: 60, unit: 'unité' },
    ],
  },

  // 4. ÉPICERIE SUCRÉE (Sweet Grocery)
  {
    name: 'Épicerie Sucrée',
    name_ar: 'البقالة الحلوة',
    icon: 'Candy',
    color: '#EC4899',
    products: [
      // Café (Coffee)
      ...brands.coffee.flatMap((brand, bi) =>
        ['200g', '250g', '500g'].map((size, si) => ({
          name: `Café ${brand} ${size}`,
          name_ar: `قهوة ${brand} ${size}`,
          barcode: generateBarcode('651', bi * 10 + si),
          avg_purchase_price: size === '200g' ? 350 : size === '250g' ? 420 : 800,
          avg_selling_price: size === '200g' ? 450 : size === '250g' ? 550 : 1000,
          unit: 'unité',
        }))
      ),
      { name: 'Nescafé Classic 100g', name_ar: 'نسكافيه كلاسيك 100غ', barcode: '651100001', avg_purchase_price: 480, avg_selling_price: 600, unit: 'unité' },
      { name: 'Nescafé Classic 200g', name_ar: 'نسكافيه كلاسيك 200غ', barcode: '651100002', avg_purchase_price: 900, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Nescafé Gold 100g', name_ar: 'نسكافيه غولد 100غ', barcode: '651100003', avg_purchase_price: 750, avg_selling_price: 950, unit: 'unité' },
      // Thé (Tea)
      { name: 'Thé vert El Mordjane 250g', name_ar: 'شاي أخضر المرجان 250غ', barcode: '652000001', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Thé vert El Mordjane 500g', name_ar: 'شاي أخضر المرجان 500غ', barcode: '652000002', avg_purchase_price: 520, avg_selling_price: 680, unit: 'unité' },
      { name: 'Thé Lipton Yellow Label 25 sachets', name_ar: 'شاي ليبتون 25 كيس', barcode: '652000003', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Thé Lipton Yellow Label 100 sachets', name_ar: 'شاي ليبتون 100 كيس', barcode: '652000004', avg_purchase_price: 650, avg_selling_price: 850, unit: 'unité' },
      { name: 'Thé noir Ceylon 250g', name_ar: 'شاي أسود سيلان 250غ', barcode: '652000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Chocolat
      ...brands.chocolate.flatMap((brand, bi) =>
        ['50g', '100g', '200g'].map((size, si) => ({
          name: `Chocolat ${brand} ${size}`,
          name_ar: `شوكولاطة ${brand} ${size}`,
          barcode: generateBarcode('653', bi * 10 + si),
          avg_purchase_price: size === '50g' ? 80 : size === '100g' ? 150 : 280,
          avg_selling_price: size === '50g' ? 110 : size === '100g' ? 200 : 380,
          unit: 'unité',
        }))
      ),
      { name: 'Nutella 350g', name_ar: 'نوتيلا 350غ', barcode: '653100001', avg_purchase_price: 550, avg_selling_price: 700, unit: 'unité' },
      { name: 'Nutella 750g', name_ar: 'نوتيلا 750غ', barcode: '653100002', avg_purchase_price: 1050, avg_selling_price: 1350, unit: 'unité' },
      { name: 'Kinder Bueno Pack 3', name_ar: 'كيندر بوينو 3 قطع', barcode: '653100003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Kinder Surprise', name_ar: 'كيندر سوربريز', barcode: '653100004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Ferrero Rocher 3 pièces', name_ar: 'فيريرو روشيه 3 قطع', barcode: '653100005', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ferrero Rocher 16 pièces', name_ar: 'فيريرو روشيه 16 قطع', barcode: '653100006', avg_purchase_price: 850, avg_selling_price: 1100, unit: 'unité' },
      // Biscuits
      ...brands.biscuits.flatMap((brand, bi) =>
        ['Nature', 'Chocolat', 'Vanille', 'Fraise'].map((flavor, fi) => ({
          name: `Biscuits ${brand} ${flavor}`,
          name_ar: `بسكويت ${brand} ${flavor}`,
          barcode: generateBarcode('654', bi * 10 + fi),
          avg_purchase_price: 65 + Math.floor(Math.random() * 30),
          avg_selling_price: 90 + Math.floor(Math.random() * 40),
          unit: 'unité',
        }))
      ),
      { name: 'Petit Beurre LU 200g', name_ar: 'بوتي بور لو 200غ', barcode: '654100001', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Oreo Original 154g', name_ar: 'أوريو أصلي 154غ', barcode: '654100002', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Oreo Double Crème 157g', name_ar: 'أوريو دابل كريم 157غ', barcode: '654100003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Prince Chocolat 300g', name_ar: 'برنس شوكولا 300غ', barcode: '654100004', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'BN Chocolat 295g', name_ar: 'بي إن شوكولا 295غ', barcode: '654100005', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      // Confiture (Jam)
      { name: 'Confiture Fraise 370g', name_ar: 'مربى فراولة 370غ', barcode: '655000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Confiture Abricot 370g', name_ar: 'مربى مشمش 370غ', barcode: '655000002', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Confiture Orange 370g', name_ar: 'مربى برتقال 370غ', barcode: '655000003', avg_purchase_price: 170, avg_selling_price: 240, unit: 'unité' },
      { name: 'Confiture Figue 370g', name_ar: 'مربى تين 370غ', barcode: '655000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Miel Naturel 500g', name_ar: 'عسل طبيعي 500غ', barcode: '655000005', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Miel Naturel 1kg', name_ar: 'عسل طبيعي 1كغ', barcode: '655000006', avg_purchase_price: 1500, avg_selling_price: 2000, unit: 'unité' },
      // Céréales
      { name: 'Corn Flakes Kellogg\'s 375g', name_ar: 'كورن فليكس كيلوغز 375غ', barcode: '656000001', avg_purchase_price: 350, avg_selling_price: 450, unit: 'unité' },
      { name: 'Coco Pops Kellogg\'s 375g', name_ar: 'كوكو بوبس كيلوغز 375غ', barcode: '656000002', avg_purchase_price: 380, avg_selling_price: 500, unit: 'unité' },
      { name: 'Chocapic Nestlé 375g', name_ar: 'شوكابيك نستله 375غ', barcode: '656000003', avg_purchase_price: 400, avg_selling_price: 520, unit: 'unité' },
      { name: 'Miel Pops Kellogg\'s 375g', name_ar: 'ميال بوبس كيلوغز 375غ', barcode: '656000004', avg_purchase_price: 370, avg_selling_price: 480, unit: 'unité' },
    ],
  },

  // 5. HYGIÈNE & BEAUTÉ (Hygiene & Beauty)
  {
    name: 'Hygiène & Beauté',
    name_ar: 'النظافة والجمال',
    icon: 'Sparkles',
    color: '#8B5CF6',
    products: [
      // Savons (Soaps)
      { name: 'Savon Dove Original 100g', name_ar: 'صابون دوف أصلي 100غ', barcode: '661000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Savon Palmolive Naturals 100g', name_ar: 'صابون بالموليف طبيعي 100غ', barcode: '661000002', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Savon Lux 100g', name_ar: 'صابون لوكس 100غ', barcode: '661000003', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Savon de Marseille 300g', name_ar: 'صابون مرسيليا 300غ', barcode: '661000004', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Savon liquide Dettol 250ml', name_ar: 'صابون سائل ديتول 250مل', barcode: '661000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Shampoings
      ...brands.personal.flatMap((brand, bi) =>
        ['Normal', 'Antipelliculaire', 'Cheveux gras', 'Cheveux secs'].map((type, ti) => ({
          name: `Shampoing ${brand} ${type} 400ml`,
          name_ar: `شامبو ${brand} ${type} 400مل`,
          barcode: generateBarcode('662', bi * 10 + ti),
          avg_purchase_price: 280 + Math.floor(Math.random() * 80),
          avg_selling_price: 380 + Math.floor(Math.random() * 100),
          unit: 'unité',
        }))
      ),
      // Gel douche
      { name: 'Gel douche Nivea 250ml', name_ar: 'جيل استحمام نيفيا 250مل', barcode: '663000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Gel douche Dove 250ml', name_ar: 'جيل استحمام دوف 250مل', barcode: '663000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Gel douche Palmolive 250ml', name_ar: 'جيل استحمام بالموليف 250مل', barcode: '663000003', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      // Déodorants
      { name: 'Déodorant Rexona Homme 150ml', name_ar: 'مزيل رائحة ريكسونا رجال 150مل', barcode: '664000001', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Déodorant Rexona Femme 150ml', name_ar: 'مزيل رائحة ريكسونا نساء 150مل', barcode: '664000002', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Déodorant Nivea Homme 150ml', name_ar: 'مزيل رائحة نيفيا رجال 150مل', barcode: '664000003', avg_purchase_price: 350, avg_selling_price: 460, unit: 'unité' },
      { name: 'Déodorant Dove Femme 150ml', name_ar: 'مزيل رائحة دوف نساء 150مل', barcode: '664000004', avg_purchase_price: 380, avg_selling_price: 500, unit: 'unité' },
      // Dentifrices
      { name: 'Dentifrice Colgate Total 100ml', name_ar: 'معجون أسنان كولجيت توتال 100مل', barcode: '665000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Dentifrice Signal 100ml', name_ar: 'معجون أسنان سيجنال 100مل', barcode: '665000002', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Dentifrice Sensodyne 75ml', name_ar: 'معجون أسنان سنسوداين 75مل', barcode: '665000003', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Dentifrice Paradontax 75ml', name_ar: 'معجون أسنان بارودونتاكس 75مل', barcode: '665000004', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Brosse à dents Colgate Medium', name_ar: 'فرشاة أسنان كولجيت متوسطة', barcode: '665000005', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Brosse à dents Signal Soft', name_ar: 'فرشاة أسنان سيجنال ناعمة', barcode: '665000006', avg_purchase_price: 70, avg_selling_price: 110, unit: 'unité' },
      // Rasage
      { name: 'Mousse à raser Gillette 250ml', name_ar: 'رغوة حلاقة جيليت 250مل', barcode: '666000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Rasoir Gillette Blue 3 (Pack 4)', name_ar: 'شفرة جيليت بلو 3 (4 قطع)', barcode: '666000002', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Rasoir Bic Sensitive (Pack 5)', name_ar: 'شفرة بيك سنسيتيف (5 قطع)', barcode: '666000003', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Après-rasage Nivea 100ml', name_ar: 'بعد الحلاقة نيفيا 100مل', barcode: '666000004', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      // Couches bébé
      { name: 'Couches Pampers Taille 1 (2-5kg) 48pcs', name_ar: 'حفاضات بامبرز مقاس 1 (2-5كغ) 48 قطعة', barcode: '667000001', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 2 (4-8kg) 40pcs', name_ar: 'حفاضات بامبرز مقاس 2 (4-8كغ) 40 قطعة', barcode: '667000002', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 3 (6-10kg) 36pcs', name_ar: 'حفاضات بامبرز مقاس 3 (6-10كغ) 36 قطعة', barcode: '667000003', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 4 (9-14kg) 32pcs', name_ar: 'حفاضات بامبرز مقاس 4 (9-14كغ) 32 قطعة', barcode: '667000004', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 5 (11-16kg) 28pcs', name_ar: 'حفاضات بامبرز مقاس 5 (11-16كغ) 28 قطعة', barcode: '667000005', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Lingettes bébé Pampers 72pcs', name_ar: 'مناديل أطفال بامبرز 72 قطعة', barcode: '667000006', avg_purchase_price: 300, avg_selling_price: 420, unit: 'pack' },
      // Hygiène féminine
      { name: 'Serviettes Always Ultra Normal 16pcs', name_ar: 'فوط أولويز ألترا عادية 16 قطعة', barcode: '668000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'pack' },
      { name: 'Serviettes Always Ultra Long 14pcs', name_ar: 'فوط أولويز ألترا طويلة 14 قطعة', barcode: '668000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      { name: 'Serviettes Always Maxi Night 10pcs', name_ar: 'فوط أولويز ماكسي ليلية 10 قطع', barcode: '668000003', avg_purchase_price: 300, avg_selling_price: 420, unit: 'pack' },
      // Mouchoirs et papier toilette
      { name: 'Papier toilette Lotus 4 rouleaux', name_ar: 'ورق تواليت لوتس 4 لفات', barcode: '669000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'pack' },
      { name: 'Papier toilette Lotus 8 rouleaux', name_ar: 'ورق تواليت لوتس 8 لفات', barcode: '669000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'pack' },
      { name: 'Mouchoirs Kleenex 100 feuilles', name_ar: 'مناديل كلينكس 100 ورقة', barcode: '669000003', avg_purchase_price: 120, avg_selling_price: 170, unit: 'boîte' },
      { name: 'Mouchoirs Kleenex pocket 10 paquets', name_ar: 'مناديل كلينكس جيب 10 علب', barcode: '669000004', avg_purchase_price: 150, avg_selling_price: 210, unit: 'pack' },
      { name: 'Coton-tige 200pcs', name_ar: 'أعواد قطنية 200 قطعة', barcode: '669000005', avg_purchase_price: 80, avg_selling_price: 120, unit: 'boîte' },
      { name: 'Coton disques 80pcs', name_ar: 'أقراص قطن 80 قطعة', barcode: '669000006', avg_purchase_price: 100, avg_selling_price: 150, unit: 'paquet' },
    ],
  },

  // 6. ENTRETIEN MÉNAGER (Household Cleaning)
  {
    name: 'Entretien Ménager',
    name_ar: 'التنظيف المنزلي',
    icon: 'Spray',
    color: '#10B981',
    products: [
      // Lessives
      ...brands.cleaning.filter(b => ['OMO', 'Ariel', 'Persil', 'Tide'].includes(b)).flatMap((brand, bi) =>
        ['2kg', '4kg', '6kg'].map((size, si) => ({
          name: `Lessive ${brand} ${size}`,
          name_ar: `مسحوق غسيل ${brand} ${size}`,
          barcode: generateBarcode('671', bi * 10 + si),
          avg_purchase_price: size === '2kg' ? 450 : size === '4kg' ? 850 : 1200,
          avg_selling_price: size === '2kg' ? 580 : size === '4kg' ? 1100 : 1550,
          unit: 'unité',
        }))
      ),
      { name: 'Lessive liquide OMO 2L', name_ar: 'مسحوق غسيل سائل أومو 2ل', barcode: '671100001', avg_purchase_price: 550, avg_selling_price: 720, unit: 'unité' },
      { name: 'Lessive liquide Ariel 2L', name_ar: 'مسحوق غسيل سائل أريال 2ل', barcode: '671100002', avg_purchase_price: 600, avg_selling_price: 780, unit: 'unité' },
      { name: 'Adoucissant Soupline 1L', name_ar: 'ملطف سوبلين 1ل', barcode: '671100003', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Adoucissant Lenor 1L', name_ar: 'ملطف لينور 1ل', barcode: '671100004', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      // Eau de Javel
      { name: 'Javel Lacroix 1L', name_ar: 'جافيل لاكروا 1ل', barcode: '672000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Javel Lacroix 2L', name_ar: 'جافيل لاكروا 2ل', barcode: '672000002', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Javel Isis 1L', name_ar: 'جافيل إيزيس 1ل', barcode: '672000003', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Javel Isis 5L', name_ar: 'جافيل إيزيس 5ل', barcode: '672000004', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      // Nettoyants multi-surfaces
      { name: 'Mr Propre Multi-Surfaces 1L', name_ar: 'مستر بروبر متعدد الأسطح 1ل', barcode: '673000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ajax Multi-Surfaces 1L', name_ar: 'أجاكس متعدد الأسطح 1ل', barcode: '673000002', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Cif Crème 500ml', name_ar: 'سيف كريم 500مل', barcode: '673000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Cif Spray Cuisine 500ml', name_ar: 'سيف سبراي مطبخ 500مل', barcode: '673000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Cif Spray Salle de bain 500ml', name_ar: 'سيف سبراي حمام 500مل', barcode: '673000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Liquide vaisselle
      { name: 'Fairy Citron 500ml', name_ar: 'فايري ليمون 500مل', barcode: '674000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Fairy Citron 1L', name_ar: 'فايري ليمون 1ل', barcode: '674000002', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Pril Citron 500ml', name_ar: 'بريل ليمون 500مل', barcode: '674000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Mir Vaisselle 500ml', name_ar: 'مير للأطباق 500مل', barcode: '674000004', avg_purchase_price: 140, avg_selling_price: 200, unit: 'unité' },
      // Désodorisants
      { name: 'Brise Spray Fresh 300ml', name_ar: 'بريز سبراي فريش 300مل', barcode: '675000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Air Wick Spray Lavande 250ml', name_ar: 'إير ويك سبراي لافندر 250مل', barcode: '675000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Febreze Spray 300ml', name_ar: 'فبريز سبراي 300مل', barcode: '675000003', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      // Insecticides
      { name: 'Raid Insecticide 400ml', name_ar: 'رايد مبيد حشرات 400مل', barcode: '676000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Baygon Insecticide 400ml', name_ar: 'بايجون مبيد حشرات 400مل', barcode: '676000002', avg_purchase_price: 320, avg_selling_price: 450, unit: 'unité' },
      { name: 'Spirales anti-moustiques 10pcs', name_ar: 'لفائف ضد البعوض 10 قطع', barcode: '676000003', avg_purchase_price: 80, avg_selling_price: 120, unit: 'paquet' },
      // Accessoires ménagers
      { name: 'Éponges Spontex Pack 3', name_ar: 'إسفنج سبونتكس 3 قطع', barcode: '677000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'pack' },
      { name: 'Éponges métalliques Pack 3', name_ar: 'إسفنج معدني 3 قطع', barcode: '677000002', avg_purchase_price: 50, avg_selling_price: 80, unit: 'pack' },
      { name: 'Gants ménagers Mapa M', name_ar: 'قفازات منزلية مابا وسط', barcode: '677000003', avg_purchase_price: 120, avg_selling_price: 170, unit: 'paire' },
      { name: 'Gants ménagers Mapa L', name_ar: 'قفازات منزلية مابا كبير', barcode: '677000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'paire' },
      { name: 'Serpillère', name_ar: 'ممسحة أرضية', barcode: '677000005', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Balai + Pelle', name_ar: 'مكنسة + مجرف', barcode: '677000006', avg_purchase_price: 250, avg_selling_price: 350, unit: 'set' },
      { name: 'Sacs poubelle 50L (10pcs)', name_ar: 'أكياس قمامة 50ل (10 قطع)', barcode: '677000007', avg_purchase_price: 100, avg_selling_price: 150, unit: 'paquet' },
      { name: 'Sacs poubelle 100L (10pcs)', name_ar: 'أكياس قمامة 100ل (10 قطع)', barcode: '677000008', avg_purchase_price: 150, avg_selling_price: 220, unit: 'paquet' },
      { name: 'Papier aluminium 30m', name_ar: 'ورق ألومنيوم 30م', barcode: '677000009', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Film alimentaire 50m', name_ar: 'غلاف غذائي 50م', barcode: '677000010', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Sachets congélation (Pack 50)', name_ar: 'أكياس تجميد (50 قطعة)', barcode: '677000011', avg_purchase_price: 120, avg_selling_price: 180, unit: 'paquet' },
    ],
  },

  // 7. FRUITS & LÉGUMES (Fruits & Vegetables)
  {
    name: 'Fruits & Légumes',
    name_ar: 'الفواكه والخضر',
    icon: 'Apple',
    color: '#22C55E',
    products: [
      // Légumes
      { name: 'Pommes de terre', name_ar: 'بطاطا', barcode: '681000001', avg_purchase_price: 60, avg_selling_price: 85, unit: 'kg' },
      { name: 'Oignons', name_ar: 'بصل', barcode: '681000002', avg_purchase_price: 50, avg_selling_price: 75, unit: 'kg' },
      { name: 'Tomates', name_ar: 'طماطم', barcode: '681000003', avg_purchase_price: 80, avg_selling_price: 120, unit: 'kg' },
      { name: 'Carottes', name_ar: 'جزر', barcode: '681000004', avg_purchase_price: 60, avg_selling_price: 90, unit: 'kg' },
      { name: 'Courgettes', name_ar: 'كوسة', barcode: '681000005', avg_purchase_price: 80, avg_selling_price: 120, unit: 'kg' },
      { name: 'Aubergines', name_ar: 'باذنجان', barcode: '681000006', avg_purchase_price: 70, avg_selling_price: 100, unit: 'kg' },
      { name: 'Poivrons verts', name_ar: 'فلفل أخضر', barcode: '681000007', avg_purchase_price: 120, avg_selling_price: 170, unit: 'kg' },
      { name: 'Poivrons rouges', name_ar: 'فلفل أحمر', barcode: '681000008', avg_purchase_price: 150, avg_selling_price: 210, unit: 'kg' },
      { name: 'Piments forts', name_ar: 'فلفل حار', barcode: '681000009', avg_purchase_price: 200, avg_selling_price: 280, unit: 'kg' },
      { name: 'Concombres', name_ar: 'خيار', barcode: '681000010', avg_purchase_price: 60, avg_selling_price: 90, unit: 'kg' },
      { name: 'Salade verte', name_ar: 'سلطة خضراء', barcode: '681000011', avg_purchase_price: 80, avg_selling_price: 120, unit: 'pièce' },
      { name: 'Chou blanc', name_ar: 'ملفوف أبيض', barcode: '681000012', avg_purchase_price: 50, avg_selling_price: 80, unit: 'kg' },
      { name: 'Chou-fleur', name_ar: 'قرنبيط', barcode: '681000013', avg_purchase_price: 100, avg_selling_price: 150, unit: 'kg' },
      { name: 'Haricots verts', name_ar: 'فاصوليا خضراء', barcode: '681000014', avg_purchase_price: 200, avg_selling_price: 280, unit: 'kg' },
      { name: 'Petits pois frais', name_ar: 'بازلاء طازجة', barcode: '681000015', avg_purchase_price: 180, avg_selling_price: 250, unit: 'kg' },
      { name: 'Fèves', name_ar: 'فول', barcode: '681000016', avg_purchase_price: 150, avg_selling_price: 220, unit: 'kg' },
      { name: 'Navets', name_ar: 'لفت', barcode: '681000017', avg_purchase_price: 60, avg_selling_price: 90, unit: 'kg' },
      { name: 'Betteraves', name_ar: 'شمندر', barcode: '681000018', avg_purchase_price: 80, avg_selling_price: 120, unit: 'kg' },
      { name: 'Artichauts', name_ar: 'خرشوف', barcode: '681000019', avg_purchase_price: 200, avg_selling_price: 300, unit: 'kg' },
      { name: 'Céleri', name_ar: 'كرفس', barcode: '681000020', avg_purchase_price: 100, avg_selling_price: 150, unit: 'botte' },
      { name: 'Persil', name_ar: 'معدنوس', barcode: '681000021', avg_purchase_price: 30, avg_selling_price: 50, unit: 'botte' },
      { name: 'Coriandre', name_ar: 'قزبر', barcode: '681000022', avg_purchase_price: 30, avg_selling_price: 50, unit: 'botte' },
      { name: 'Menthe', name_ar: 'نعناع', barcode: '681000023', avg_purchase_price: 30, avg_selling_price: 50, unit: 'botte' },
      { name: 'Ail', name_ar: 'ثوم', barcode: '681000024', avg_purchase_price: 400, avg_selling_price: 550, unit: 'kg' },
      { name: 'Gingembre frais', name_ar: 'زنجبيل طازج', barcode: '681000025', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'kg' },
      // Fruits
      { name: 'Oranges', name_ar: 'برتقال', barcode: '682000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'kg' },
      { name: 'Pommes', name_ar: 'تفاح', barcode: '682000002', avg_purchase_price: 150, avg_selling_price: 220, unit: 'kg' },
      { name: 'Bananes', name_ar: 'موز', barcode: '682000003', avg_purchase_price: 180, avg_selling_price: 250, unit: 'kg' },
      { name: 'Raisins', name_ar: 'عنب', barcode: '682000004', avg_purchase_price: 200, avg_selling_price: 300, unit: 'kg' },
      { name: 'Poires', name_ar: 'إجاص', barcode: '682000005', avg_purchase_price: 180, avg_selling_price: 260, unit: 'kg' },
      { name: 'Pêches', name_ar: 'خوخ', barcode: '682000006', avg_purchase_price: 200, avg_selling_price: 300, unit: 'kg' },
      { name: 'Abricots', name_ar: 'مشمش', barcode: '682000007', avg_purchase_price: 250, avg_selling_price: 350, unit: 'kg' },
      { name: 'Prunes', name_ar: 'برقوق', barcode: '682000008', avg_purchase_price: 180, avg_selling_price: 260, unit: 'kg' },
      { name: 'Cerises', name_ar: 'كرز', barcode: '682000009', avg_purchase_price: 500, avg_selling_price: 700, unit: 'kg' },
      { name: 'Fraises', name_ar: 'فراولة', barcode: '682000010', avg_purchase_price: 400, avg_selling_price: 600, unit: 'kg' },
      { name: 'Pastèque', name_ar: 'دلاع', barcode: '682000011', avg_purchase_price: 40, avg_selling_price: 60, unit: 'kg' },
      { name: 'Melon', name_ar: 'بطيخ', barcode: '682000012', avg_purchase_price: 60, avg_selling_price: 90, unit: 'kg' },
      { name: 'Dattes Deglet Nour', name_ar: 'تمر دقلة نور', barcode: '682000013', avg_purchase_price: 600, avg_selling_price: 850, unit: 'kg' },
      { name: 'Dattes Ghars', name_ar: 'تمر غرس', barcode: '682000014', avg_purchase_price: 400, avg_selling_price: 580, unit: 'kg' },
      { name: 'Figues fraîches', name_ar: 'تين طازج', barcode: '682000015', avg_purchase_price: 350, avg_selling_price: 500, unit: 'kg' },
      { name: 'Grenades', name_ar: 'رمان', barcode: '682000016', avg_purchase_price: 200, avg_selling_price: 300, unit: 'kg' },
      { name: 'Mandarines', name_ar: 'يوسفي', barcode: '682000017', avg_purchase_price: 120, avg_selling_price: 180, unit: 'kg' },
      { name: 'Citrons', name_ar: 'ليمون', barcode: '682000018', avg_purchase_price: 150, avg_selling_price: 220, unit: 'kg' },
      { name: 'Avocat', name_ar: 'أفوكادو', barcode: '682000019', avg_purchase_price: 400, avg_selling_price: 600, unit: 'kg' },
      { name: 'Kiwis', name_ar: 'كيوي', barcode: '682000020', avg_purchase_price: 500, avg_selling_price: 700, unit: 'kg' },
    ],
  },

  // 8. VIANDES & POISSONS (Meats & Fish)
  {
    name: 'Viandes & Poissons',
    name_ar: 'اللحوم والأسماك',
    icon: 'Beef',
    color: '#DC2626',
    products: [
      // Viandes rouges (Red meats)
      { name: 'Viande de bœuf (escalope)', name_ar: 'لحم بقر (اسكالوب)', barcode: '691000001', avg_purchase_price: 2000, avg_selling_price: 2500, unit: 'kg' },
      { name: 'Viande de bœuf (hachée)', name_ar: 'لحم بقر مفروم', barcode: '691000002', avg_purchase_price: 1800, avg_selling_price: 2200, unit: 'kg' },
      { name: 'Viande de bœuf (côtes)', name_ar: 'لحم بقر (أضلاع)', barcode: '691000003', avg_purchase_price: 1600, avg_selling_price: 2000, unit: 'kg' },
      { name: 'Viande de mouton (gigot)', name_ar: 'لحم غنم (فخذ)', barcode: '691000004', avg_purchase_price: 2200, avg_selling_price: 2800, unit: 'kg' },
      { name: 'Viande de mouton (épaule)', name_ar: 'لحم غنم (كتف)', barcode: '691000005', avg_purchase_price: 2000, avg_selling_price: 2500, unit: 'kg' },
      { name: 'Viande de mouton (côtelettes)', name_ar: 'لحم غنم (كوتليت)', barcode: '691000006', avg_purchase_price: 2400, avg_selling_price: 3000, unit: 'kg' },
      { name: 'Foie de bœuf', name_ar: 'كبد بقر', barcode: '691000007', avg_purchase_price: 1400, avg_selling_price: 1800, unit: 'kg' },
      { name: 'Foie de mouton', name_ar: 'كبد غنم', barcode: '691000008', avg_purchase_price: 1600, avg_selling_price: 2000, unit: 'kg' },
      // Volailles (Poultry)
      { name: 'Poulet entier', name_ar: 'دجاج كامل', barcode: '692000001', avg_purchase_price: 450, avg_selling_price: 580, unit: 'kg' },
      { name: 'Cuisses de poulet', name_ar: 'أفخاذ دجاج', barcode: '692000002', avg_purchase_price: 500, avg_selling_price: 650, unit: 'kg' },
      { name: 'Blancs de poulet', name_ar: 'صدر دجاج', barcode: '692000003', avg_purchase_price: 700, avg_selling_price: 900, unit: 'kg' },
      { name: 'Ailes de poulet', name_ar: 'أجنحة دجاج', barcode: '692000004', avg_purchase_price: 400, avg_selling_price: 520, unit: 'kg' },
      { name: 'Dinde entière', name_ar: 'ديك رومي كامل', barcode: '692000005', avg_purchase_price: 600, avg_selling_price: 780, unit: 'kg' },
      { name: 'Escalope de dinde', name_ar: 'اسكالوب ديك رومي', barcode: '692000006', avg_purchase_price: 850, avg_selling_price: 1100, unit: 'kg' },
      // Charcuterie
      { name: 'Cachir (mortadelle)', name_ar: 'كاشير', barcode: '693000001', avg_purchase_price: 800, avg_selling_price: 1050, unit: 'kg' },
      { name: 'Saucisses de bœuf', name_ar: 'سجق بقر', barcode: '693000002', avg_purchase_price: 900, avg_selling_price: 1200, unit: 'kg' },
      { name: 'Merguez', name_ar: 'مرڨاز', barcode: '693000003', avg_purchase_price: 1000, avg_selling_price: 1300, unit: 'kg' },
      { name: 'Viande séchée (Khlii)', name_ar: 'خليع', barcode: '693000004', avg_purchase_price: 3000, avg_selling_price: 3800, unit: 'kg' },
      // Poissons (Fish)
      { name: 'Sardines', name_ar: 'سردين', barcode: '694000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'kg' },
      { name: 'Crevettes', name_ar: 'جمبري', barcode: '694000002', avg_purchase_price: 2500, avg_selling_price: 3200, unit: 'kg' },
      { name: 'Merlan', name_ar: 'مرلان', barcode: '694000003', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'kg' },
      { name: 'Dorade', name_ar: 'دوراد', barcode: '694000004', avg_purchase_price: 1200, avg_selling_price: 1600, unit: 'kg' },
      { name: 'Loup de mer', name_ar: 'لوب', barcode: '694000005', avg_purchase_price: 1400, avg_selling_price: 1900, unit: 'kg' },
      { name: 'Calamars', name_ar: 'كالمار', barcode: '694000006', avg_purchase_price: 1800, avg_selling_price: 2400, unit: 'kg' },
      { name: 'Moules', name_ar: 'بوزروق', barcode: '694000007', avg_purchase_price: 600, avg_selling_price: 850, unit: 'kg' },
      { name: 'Thon frais', name_ar: 'تونة طازجة', barcode: '694000008', avg_purchase_price: 1500, avg_selling_price: 2000, unit: 'kg' },
      // Œufs
      { name: 'Œufs (plateau 30)', name_ar: 'بيض (صينية 30)', barcode: '695000001', avg_purchase_price: 450, avg_selling_price: 550, unit: 'plateau' },
      { name: 'Œufs (6 pièces)', name_ar: 'بيض (6 قطع)', barcode: '695000002', avg_purchase_price: 100, avg_selling_price: 130, unit: 'pack' },
      { name: 'Œufs fermiers (6 pièces)', name_ar: 'بيض بلدي (6 قطع)', barcode: '695000003', avg_purchase_price: 150, avg_selling_price: 200, unit: 'pack' },
    ],
  },

  // 9. BOULANGERIE & PÂTISSERIE
  {
    name: 'Boulangerie & Pâtisserie',
    name_ar: 'المخبوزات والحلويات',
    icon: 'Croissant',
    color: '#D97706',
    products: [
      // Pain (Bread)
      { name: 'Baguette tradition', name_ar: 'خبز فرنسي تقليدي', barcode: '701000001', avg_purchase_price: 15, avg_selling_price: 25, unit: 'unité' },
      { name: 'Pain de campagne', name_ar: 'خبز ريفي', barcode: '701000002', avg_purchase_price: 40, avg_selling_price: 60, unit: 'unité' },
      { name: 'Pain complet', name_ar: 'خبز كامل', barcode: '701000003', avg_purchase_price: 50, avg_selling_price: 75, unit: 'unité' },
      { name: 'Pain de mie (500g)', name_ar: 'خبز توست 500غ', barcode: '701000004', avg_purchase_price: 80, avg_selling_price: 120, unit: 'paquet' },
      { name: 'Pain hamburger (Pack 4)', name_ar: 'خبز همبرغر (4 قطع)', barcode: '701000005', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Kesra (galette)', name_ar: 'كسرة', barcode: '701000006', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Khobz eddar (pain maison)', name_ar: 'خبز الدار', barcode: '701000007', avg_purchase_price: 30, avg_selling_price: 50, unit: 'unité' },
      { name: 'Matlouâ', name_ar: 'مطلوع', barcode: '701000008', avg_purchase_price: 40, avg_selling_price: 65, unit: 'unité' },
      // Viennoiseries
      { name: 'Croissant au beurre', name_ar: 'كرواسون بالزبدة', barcode: '702000001', avg_purchase_price: 40, avg_selling_price: 60, unit: 'unité' },
      { name: 'Pain au chocolat', name_ar: 'بان أو شوكولا', barcode: '702000002', avg_purchase_price: 50, avg_selling_price: 75, unit: 'unité' },
      { name: 'Brioche nature', name_ar: 'بريوش طبيعي', barcode: '702000003', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Chausson aux pommes', name_ar: 'شوصون بالتفاح', barcode: '702000004', avg_purchase_price: 55, avg_selling_price: 80, unit: 'unité' },
      { name: 'Madeleine (Pack 6)', name_ar: 'مادلين (6 قطع)', barcode: '702000005', avg_purchase_price: 120, avg_selling_price: 180, unit: 'pack' },
      // Gâteaux traditionnels
      { name: 'Makroud (500g)', name_ar: 'مقروض 500غ', barcode: '703000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'pack' },
      { name: 'Baklawa (500g)', name_ar: 'بقلاوة 500غ', barcode: '703000002', avg_purchase_price: 600, avg_selling_price: 850, unit: 'pack' },
      { name: 'Griwech (500g)', name_ar: 'قريوش 500غ', barcode: '703000003', avg_purchase_price: 450, avg_selling_price: 650, unit: 'pack' },
      { name: 'Samsa (500g)', name_ar: 'صمصة 500غ', barcode: '703000004', avg_purchase_price: 500, avg_selling_price: 700, unit: 'pack' },
      { name: 'Tcharak (500g)', name_ar: 'تشاراك 500غ', barcode: '703000005', avg_purchase_price: 550, avg_selling_price: 750, unit: 'pack' },
      { name: 'Dziriyat (500g)', name_ar: 'جيريات 500غ', barcode: '703000006', avg_purchase_price: 650, avg_selling_price: 900, unit: 'pack' },
      { name: 'Kalb ellouz (500g)', name_ar: 'قلب اللوز 500غ', barcode: '703000007', avg_purchase_price: 700, avg_selling_price: 950, unit: 'pack' },
      { name: 'Mchewek (500g)', name_ar: 'مشوك 500غ', barcode: '703000008', avg_purchase_price: 600, avg_selling_price: 850, unit: 'pack' },
      // Ingrédients pâtisserie
      { name: 'Levure chimique 10g (Pack 10)', name_ar: 'خميرة كيميائية 10غ (10 أكياس)', barcode: '704000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Levure de boulanger fraîche 42g', name_ar: 'خميرة خبز طازجة 42غ', barcode: '704000002', avg_purchase_price: 25, avg_selling_price: 40, unit: 'unité' },
      { name: 'Levure sèche 7g (Pack 5)', name_ar: 'خميرة جافة 7غ (5 أكياس)', barcode: '704000003', avg_purchase_price: 80, avg_selling_price: 120, unit: 'pack' },
      { name: 'Vanille liquide 100ml', name_ar: 'فانيليا سائلة 100مل', barcode: '704000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Sucre vanillé (Pack 10)', name_ar: 'سكر فانيليا (10 أكياس)', barcode: '704000005', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Cacao en poudre 250g', name_ar: 'كاكاو بودرة 250غ', barcode: '704000006', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Pépites de chocolat 200g', name_ar: 'حبات شوكولاطة 200غ', barcode: '704000007', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Amandes entières 250g', name_ar: 'لوز كامل 250غ', barcode: '704000008', avg_purchase_price: 500, avg_selling_price: 680, unit: 'unité' },
      { name: 'Noix 250g', name_ar: 'جوز 250غ', barcode: '704000009', avg_purchase_price: 600, avg_selling_price: 800, unit: 'unité' },
      { name: 'Noisettes 250g', name_ar: 'بندق 250غ', barcode: '704000010', avg_purchase_price: 550, avg_selling_price: 750, unit: 'unité' },
      { name: 'Noix de coco râpée 200g', name_ar: 'جوز هند مبشور 200غ', barcode: '704000011', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Raisins secs 250g', name_ar: 'زبيب 250غ', barcode: '704000012', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Eau de fleur d\'oranger 250ml', name_ar: 'ماء زهر البرتقال 250مل', barcode: '704000013', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Eau de rose 250ml', name_ar: 'ماء الورد 250مل', barcode: '704000014', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
    ],
  },

  // 10. SURGELÉS (Frozen Foods)
  {
    name: 'Surgelés',
    name_ar: 'المجمدات',
    icon: 'Snowflake',
    color: '#06B6D4',
    products: [
      // Légumes surgelés
      { name: 'Petits pois surgelés 1kg', name_ar: 'بازلاء مجمدة 1كغ', barcode: '711000001', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Haricots verts surgelés 1kg', name_ar: 'فاصوليا خضراء مجمدة 1كغ', barcode: '711000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Épinards surgelés 500g', name_ar: 'سبانخ مجمدة 500غ', barcode: '711000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Macédoine de légumes 1kg', name_ar: 'مقدونية خضر مجمدة 1كغ', barcode: '711000004', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Brocoli surgelé 500g', name_ar: 'بروكلي مجمد 500غ', barcode: '711000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Champignons surgelés 500g', name_ar: 'فطر مجمد 500غ', barcode: '711000006', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      // Frites
      { name: 'Frites surgelées 1kg', name_ar: 'بطاطا مقلية مجمدة 1كغ', barcode: '712000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Frites surgelées 2.5kg', name_ar: 'بطاطا مقلية مجمدة 2.5كغ', barcode: '712000002', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Potatoes surgelées 1kg', name_ar: 'بوتاتوز مجمدة 1كغ', barcode: '712000003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Viandes surgelées
      { name: 'Nuggets de poulet 500g', name_ar: 'ناغيتس دجاج 500غ', barcode: '713000001', avg_purchase_price: 380, avg_selling_price: 500, unit: 'unité' },
      { name: 'Cordon bleu 500g', name_ar: 'كوردون بلو 500غ', barcode: '713000002', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      { name: 'Escalope panée 500g', name_ar: 'اسكالوب مخبز 500غ', barcode: '713000003', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Boulettes de viande 500g', name_ar: 'كرات لحم مجمدة 500غ', barcode: '713000004', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Steak haché surgelé (Pack 4)', name_ar: 'ستيك مفروم مجمد (4 قطع)', barcode: '713000005', avg_purchase_price: 400, avg_selling_price: 550, unit: 'pack' },
      // Poissons surgelés
      { name: 'Filets de poisson panés 400g', name_ar: 'فيليه سمك مخبز 400غ', barcode: '714000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Crevettes surgelées 500g', name_ar: 'جمبري مجمد 500غ', barcode: '714000002', avg_purchase_price: 800, avg_selling_price: 1050, unit: 'unité' },
      { name: 'Calamars surgelés 500g', name_ar: 'كالمار مجمد 500غ', barcode: '714000003', avg_purchase_price: 600, avg_selling_price: 800, unit: 'unité' },
      // Pizzas
      { name: 'Pizza Margherita surgelée', name_ar: 'بيتزا مارغريتا مجمدة', barcode: '715000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Pizza 4 fromages surgelée', name_ar: 'بيتزا 4 أجبان مجمدة', barcode: '715000002', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Pizza Royale surgelée', name_ar: 'بيتزا رويال مجمدة', barcode: '715000003', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      // Glaces
      { name: 'Glace vanille 1L', name_ar: 'آيس كريم فانيليا 1ل', barcode: '716000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Glace chocolat 1L', name_ar: 'آيس كريم شوكولا 1ل', barcode: '716000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Glace fraise 1L', name_ar: 'آيس كريم فراولة 1ل', barcode: '716000003', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Cornet Magnum Classic', name_ar: 'كورني ماغنوم كلاسيك', barcode: '716000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Bâtonnets glacés (Pack 6)', name_ar: 'أصابع آيس كريم (6 قطع)', barcode: '716000005', avg_purchase_price: 250, avg_selling_price: 350, unit: 'pack' },
    ],
  },

  // 11. SNACKS & CHIPS
  {
    name: 'Snacks & Chips',
    name_ar: 'السناكس والشيبس',
    icon: 'Cookie',
    color: '#F97316',
    products: [
      // Chips
      { name: 'Chips Lay\'s Nature 45g', name_ar: 'شيبس ليز طبيعي 45غ', barcode: '721000001', avg_purchase_price: 50, avg_selling_price: 75, unit: 'unité' },
      { name: 'Chips Lay\'s Nature 160g', name_ar: 'شيبس ليز طبيعي 160غ', barcode: '721000002', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Chips Lay\'s Paprika 45g', name_ar: 'شيبس ليز بابريكا 45غ', barcode: '721000003', avg_purchase_price: 50, avg_selling_price: 75, unit: 'unité' },
      { name: 'Chips Pringles Original 165g', name_ar: 'شيبس برينغلز أصلي 165غ', barcode: '721000004', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Chips Pringles Paprika 165g', name_ar: 'شيبس برينغلز بابريكا 165غ', barcode: '721000005', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Chips Doritos Nacho 150g', name_ar: 'دوريتوس ناتشوز 150غ', barcode: '721000006', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Chips Bingo Nature 100g', name_ar: 'شيبس بينغو طبيعي 100غ', barcode: '721000007', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Chips Bingo Barbecue 100g', name_ar: 'شيبس بينغو باربيكيو 100غ', barcode: '721000008', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      // Cacahuètes et fruits secs salés
      { name: 'Cacahuètes grillées salées 200g', name_ar: 'فول سوداني محمص مملح 200غ', barcode: '722000001', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Cacahuètes grillées salées 500g', name_ar: 'فول سوداني محمص مملح 500غ', barcode: '722000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Noix de cajou salées 200g', name_ar: 'كاجو مملح 200غ', barcode: '722000003', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      { name: 'Pistaches salées 200g', name_ar: 'فستق مملح 200غ', barcode: '722000004', avg_purchase_price: 500, avg_selling_price: 680, unit: 'unité' },
      { name: 'Mix apéritif 250g', name_ar: 'مكس مقبلات 250غ', barcode: '722000005', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      // Popcorn
      { name: 'Popcorn micro-ondes beurre (Pack 3)', name_ar: 'بوبكورن ميكرو بالزبدة (3 أكياس)', barcode: '723000001', avg_purchase_price: 180, avg_selling_price: 260, unit: 'pack' },
      { name: 'Popcorn sucré 100g', name_ar: 'بوبكورن حلو 100غ', barcode: '723000002', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Popcorn caramel 150g', name_ar: 'بوبكورن كراميل 150غ', barcode: '723000003', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      // Crackers
      { name: 'TUC Original 100g', name_ar: 'توك أصلي 100غ', barcode: '724000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Crackers Monaco 100g', name_ar: 'كراكرز موناكو 100غ', barcode: '724000002', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Bretzels 200g', name_ar: 'بريتزل 200غ', barcode: '724000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      // Barres de céréales
      { name: 'Barre céréales chocolat (Pack 6)', name_ar: 'قضبان حبوب شوكولا (6 قطع)', barcode: '725000001', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Barre céréales fruits (Pack 6)', name_ar: 'قضبان حبوب فواكه (6 قطع)', barcode: '725000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Barre Kinder Country', name_ar: 'كيندر كانتري', barcode: '725000003', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      // Bonbons
      { name: 'Bonbons Haribo 200g', name_ar: 'حلوى هاريبو 200غ', barcode: '726000001', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Chewing-gum Hollywood', name_ar: 'علكة هوليوود', barcode: '726000002', avg_purchase_price: 30, avg_selling_price: 50, unit: 'unité' },
      { name: 'Mentos Menthe', name_ar: 'منتوس نعناع', barcode: '726000003', avg_purchase_price: 40, avg_selling_price: 60, unit: 'unité' },
      { name: 'Tic Tac Menthe', name_ar: 'تيك تاك نعناع', barcode: '726000004', avg_purchase_price: 50, avg_selling_price: 75, unit: 'unité' },
      { name: 'M&M\'s Peanut 45g', name_ar: 'إم آند إمز فول سوداني 45غ', barcode: '726000005', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Snickers 50g', name_ar: 'سنيكرز 50غ', barcode: '726000006', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Mars 51g', name_ar: 'مارس 51غ', barcode: '726000007', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Twix 50g', name_ar: 'تويكس 50غ', barcode: '726000008', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Kit Kat 45g', name_ar: 'كيت كات 45غ', barcode: '726000009', avg_purchase_price: 70, avg_selling_price: 110, unit: 'unité' },
    ],
  },

  // 12. CONDIMENTS & SAUCES
  {
    name: 'Condiments & Sauces',
    name_ar: 'التوابل والصلصات',
    icon: 'Droplets',
    color: '#EAB308',
    products: [
      // Ketchup et mayonnaise
      { name: 'Ketchup Heinz 342g', name_ar: 'كاتشب هاينز 342غ', barcode: '731000001', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Ketchup Heinz 570g', name_ar: 'كاتشب هاينز 570غ', barcode: '731000002', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Mayonnaise Heinz 400g', name_ar: 'مايونيز هاينز 400غ', barcode: '731000003', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Mayonnaise Lesieur 235g', name_ar: 'مايونيز لوزيور 235غ', barcode: '731000004', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Moutarde Amora 265g', name_ar: 'خردل أمورا 265غ', barcode: '731000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Sauce Algérienne 350g', name_ar: 'صلصة جزائرية 350غ', barcode: '731000006', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Sauce Samouraï 350g', name_ar: 'صلصة ساموراي 350غ', barcode: '731000007', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Sauce Cocktail 350g', name_ar: 'صلصة كوكتيل 350غ', barcode: '731000008', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      // Vinaigrettes
      { name: 'Vinaigre de vin rouge 75cl', name_ar: 'خل نبيذ أحمر 75سل', barcode: '732000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Vinaigre de cidre 50cl', name_ar: 'خل تفاح 50سل', barcode: '732000002', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Vinaigre balsamique 25cl', name_ar: 'خل بلسمي 25سل', barcode: '732000003', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      // Sauce tomate et autres
      { name: 'Sauce tomate cuisinée 500g', name_ar: 'صلصة طماطم مطبوخة 500غ', barcode: '733000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Sauce bolognaise 420g', name_ar: 'صلصة بولونيز 420غ', barcode: '733000002', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Sauce pesto 190g', name_ar: 'صلصة بيستو 190غ', barcode: '733000003', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Sauce soja 150ml', name_ar: 'صويا صوص 150مل', barcode: '733000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Sauce Tabasco 60ml', name_ar: 'صلصة تاباسكو 60مل', barcode: '733000005', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Sauce barbecue 450g', name_ar: 'صلصة باربيكيو 450غ', barcode: '733000006', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Bouillons et aides culinaires
      { name: 'Cube Maggi Poulet (Pack 24)', name_ar: 'مكعبات ماجي دجاج (24 قطعة)', barcode: '734000001', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Cube Maggi Bœuf (Pack 24)', name_ar: 'مكعبات ماجي لحم (24 قطعة)', barcode: '734000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Cube Knorr Poulet (Pack 18)', name_ar: 'مكعبات كنور دجاج (18 قطعة)', barcode: '734000003', avg_purchase_price: 180, avg_selling_price: 250, unit: 'pack' },
      { name: 'Bouillon de légumes poudre 200g', name_ar: 'مرق خضر بودرة 200غ', barcode: '734000004', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Fond de volaille 500ml', name_ar: 'مرق دواجن 500مل', barcode: '734000005', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
    ],
  },

  // 13. LÉGUMINEUSES & CÉRÉALES SÈCHES
  {
    name: 'Légumineuses & Céréales',
    name_ar: 'البقوليات والحبوب',
    icon: 'Bean',
    color: '#84CC16',
    products: [
      // Légumineuses
      { name: 'Lentilles vertes 500g', name_ar: 'عدس أخضر 500غ', barcode: '741000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Lentilles vertes 1kg', name_ar: 'عدس أخضر 1كغ', barcode: '741000002', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Lentilles corail 500g', name_ar: 'عدس أحمر 500غ', barcode: '741000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Pois chiches 500g', name_ar: 'حمص 500غ', barcode: '741000004', avg_purchase_price: 130, avg_selling_price: 180, unit: 'unité' },
      { name: 'Pois chiches 1kg', name_ar: 'حمص 1كغ', barcode: '741000005', avg_purchase_price: 240, avg_selling_price: 330, unit: 'unité' },
      { name: 'Haricots blancs 500g', name_ar: 'فاصوليا بيضاء 500غ', barcode: '741000006', avg_purchase_price: 140, avg_selling_price: 200, unit: 'unité' },
      { name: 'Haricots rouges 500g', name_ar: 'فاصوليا حمراء 500غ', barcode: '741000007', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Fèves sèches 500g', name_ar: 'فول جاف 500غ', barcode: '741000008', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Pois cassés 500g', name_ar: 'بازلاء مجروشة 500غ', barcode: '741000009', avg_purchase_price: 110, avg_selling_price: 160, unit: 'unité' },
      // Céréales
      { name: 'Blé complet 1kg', name_ar: 'قمح كامل 1كغ', barcode: '742000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Orge perlé 500g', name_ar: 'شعير 500غ', barcode: '742000002', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Boulgour 500g', name_ar: 'برغل 500غ', barcode: '742000003', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Freekeh 500g', name_ar: 'فريكة 500غ', barcode: '742000004', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Quinoa 500g', name_ar: 'كينوا 500غ', barcode: '742000005', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      { name: 'Flocons d\'avoine 500g', name_ar: 'رقائق الشوفان 500غ', barcode: '742000006', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Son de blé 250g', name_ar: 'نخالة القمح 250غ', barcode: '742000007', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      // Graines
      { name: 'Graines de lin 200g', name_ar: 'بذور الكتان 200غ', barcode: '743000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Graines de chia 200g', name_ar: 'بذور الشيا 200غ', barcode: '743000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Graines de sésame 200g', name_ar: 'بذور السمسم 200غ', barcode: '743000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Graines de tournesol 200g', name_ar: 'بذور عباد الشمس 200غ', barcode: '743000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Graines de courge 200g', name_ar: 'بذور اليقطين 200غ', barcode: '743000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
    ],
  },

  // 14. PAPETERIE & FOURNITURES SCOLAIRES
  {
    name: 'Papeterie & Fournitures',
    name_ar: 'القرطاسية واللوازم المدرسية',
    icon: 'Pencil',
    color: '#6366F1',
    products: [
      // Cahiers
      { name: 'Cahier 96 pages grands carreaux', name_ar: 'دفتر 96 صفحة مربعات كبيرة', barcode: '751000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Cahier 96 pages petits carreaux', name_ar: 'دفتر 96 صفحة مربعات صغيرة', barcode: '751000002', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Cahier 192 pages grands carreaux', name_ar: 'دفتر 192 صفحة مربعات كبيرة', barcode: '751000003', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Cahier 288 pages grands carreaux', name_ar: 'دفتر 288 صفحة مربعات كبيرة', barcode: '751000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Cahier dessin 48 pages', name_ar: 'دفتر رسم 48 صفحة', barcode: '751000005', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Cahier travaux pratiques 96 pages', name_ar: 'دفتر أعمال تطبيقية 96 صفحة', barcode: '751000006', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      // Stylos et crayons
      { name: 'Stylo bille bleu BIC (Pack 4)', name_ar: 'قلم حبر أزرق بيك (4 أقلام)', barcode: '752000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Stylo bille noir BIC (Pack 4)', name_ar: 'قلم حبر أسود بيك (4 أقلام)', barcode: '752000002', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Stylo bille rouge BIC (Pack 4)', name_ar: 'قلم حبر أحمر بيك (4 أقلام)', barcode: '752000003', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Crayon à papier HB (Pack 12)', name_ar: 'قلم رصاص HB (12 قلم)', barcode: '752000004', avg_purchase_price: 80, avg_selling_price: 130, unit: 'pack' },
      { name: 'Crayons de couleur (Pack 12)', name_ar: 'أقلام تلوين (12 قلم)', barcode: '752000005', avg_purchase_price: 150, avg_selling_price: 220, unit: 'pack' },
      { name: 'Crayons de couleur (Pack 24)', name_ar: 'أقلام تلوين (24 قلم)', barcode: '752000006', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      { name: 'Feutres couleurs (Pack 12)', name_ar: 'أقلام فلوماستر (12 قلم)', barcode: '752000007', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Marqueur permanent noir', name_ar: 'ماركر دائم أسود', barcode: '752000008', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Surligneur jaune', name_ar: 'قلم فسفوري أصفر', barcode: '752000009', avg_purchase_price: 60, avg_selling_price: 100, unit: 'unité' },
      // Autres fournitures
      { name: 'Gomme blanche', name_ar: 'ممحاة بيضاء', barcode: '753000001', avg_purchase_price: 20, avg_selling_price: 40, unit: 'unité' },
      { name: 'Taille-crayon métal', name_ar: 'براية معدنية', barcode: '753000002', avg_purchase_price: 30, avg_selling_price: 50, unit: 'unité' },
      { name: 'Règle 30cm plastique', name_ar: 'مسطرة 30سم بلاستيك', barcode: '753000003', avg_purchase_price: 30, avg_selling_price: 50, unit: 'unité' },
      { name: 'Équerre 45°', name_ar: 'منقلة 45°', barcode: '753000004', avg_purchase_price: 40, avg_selling_price: 70, unit: 'unité' },
      { name: 'Compas scolaire', name_ar: 'فرجار مدرسي', barcode: '753000005', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      { name: 'Colle UHU stick 21g', name_ar: 'صمغ عصا يو هو 21غ', barcode: '753000006', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Colle liquide blanche 100ml', name_ar: 'صمغ سائل أبيض 100مل', barcode: '753000007', avg_purchase_price: 60, avg_selling_price: 100, unit: 'unité' },
      { name: 'Scotch transparent 19mm x 33m', name_ar: 'شريط لاصق شفاف 19مم×33م', barcode: '753000008', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Ciseaux scolaires', name_ar: 'مقص مدرسي', barcode: '753000009', avg_purchase_price: 60, avg_selling_price: 100, unit: 'unité' },
      { name: 'Agrafeuse de bureau', name_ar: 'دباسة مكتبية', barcode: '753000010', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Agrafes (Pack 1000)', name_ar: 'دبابيس (1000 قطعة)', barcode: '753000011', avg_purchase_price: 40, avg_selling_price: 70, unit: 'pack' },
      { name: 'Cartable scolaire', name_ar: 'محفظة مدرسية', barcode: '754000001', avg_purchase_price: 2000, avg_selling_price: 2800, unit: 'unité' },
      { name: 'Trousse scolaire', name_ar: 'مقلمة', barcode: '754000002', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Classeur A4', name_ar: 'ملف A4', barcode: '754000003', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Pochettes plastiques A4 (Pack 50)', name_ar: 'جيوب بلاستيكية A4 (50 قطعة)', barcode: '754000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'pack' },
      { name: 'Feuilles blanches A4 (Pack 500)', name_ar: 'أوراق بيضاء A4 (500 ورقة)', barcode: '754000005', avg_purchase_price: 500, avg_selling_price: 700, unit: 'pack' },
    ],
  },

  // 15. TÉLÉPHONIE & RECHARGES
  {
    name: 'Téléphonie & Recharges',
    name_ar: 'الهاتف والشحن',
    icon: 'Smartphone',
    color: '#0EA5E9',
    products: [
      // Recharges mobiles
      { name: 'Recharge Djezzy 100 DA', name_ar: 'شحن جيزي 100 دج', barcode: '761000001', avg_purchase_price: 95, avg_selling_price: 100, unit: 'unité' },
      { name: 'Recharge Djezzy 200 DA', name_ar: 'شحن جيزي 200 دج', barcode: '761000002', avg_purchase_price: 190, avg_selling_price: 200, unit: 'unité' },
      { name: 'Recharge Djezzy 500 DA', name_ar: 'شحن جيزي 500 دج', barcode: '761000003', avg_purchase_price: 475, avg_selling_price: 500, unit: 'unité' },
      { name: 'Recharge Djezzy 1000 DA', name_ar: 'شحن جيزي 1000 دج', barcode: '761000004', avg_purchase_price: 950, avg_selling_price: 1000, unit: 'unité' },
      { name: 'Recharge Mobilis 100 DA', name_ar: 'شحن موبيليس 100 دج', barcode: '762000001', avg_purchase_price: 95, avg_selling_price: 100, unit: 'unité' },
      { name: 'Recharge Mobilis 200 DA', name_ar: 'شحن موبيليس 200 دج', barcode: '762000002', avg_purchase_price: 190, avg_selling_price: 200, unit: 'unité' },
      { name: 'Recharge Mobilis 500 DA', name_ar: 'شحن موبيليس 500 دج', barcode: '762000003', avg_purchase_price: 475, avg_selling_price: 500, unit: 'unité' },
      { name: 'Recharge Mobilis 1000 DA', name_ar: 'شحن موبيليس 1000 دج', barcode: '762000004', avg_purchase_price: 950, avg_selling_price: 1000, unit: 'unité' },
      { name: 'Recharge Ooredoo 100 DA', name_ar: 'شحن أوريدو 100 دج', barcode: '763000001', avg_purchase_price: 95, avg_selling_price: 100, unit: 'unité' },
      { name: 'Recharge Ooredoo 200 DA', name_ar: 'شحن أوريدو 200 دج', barcode: '763000002', avg_purchase_price: 190, avg_selling_price: 200, unit: 'unité' },
      { name: 'Recharge Ooredoo 500 DA', name_ar: 'شحن أوريدو 500 دج', barcode: '763000003', avg_purchase_price: 475, avg_selling_price: 500, unit: 'unité' },
      { name: 'Recharge Ooredoo 1000 DA', name_ar: 'شحن أوريدو 1000 دج', barcode: '763000004', avg_purchase_price: 950, avg_selling_price: 1000, unit: 'unité' },
      // Accessoires téléphone
      { name: 'Câble USB-C 1m', name_ar: 'كابل USB-C 1م', barcode: '764000001', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Câble Lightning 1m', name_ar: 'كابل لايتننغ 1م', barcode: '764000002', avg_purchase_price: 250, avg_selling_price: 380, unit: 'unité' },
      { name: 'Câble Micro USB 1m', name_ar: 'كابل ميكرو USB 1م', barcode: '764000003', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Chargeur mural USB 10W', name_ar: 'شاحن حائط USB 10W', barcode: '764000004', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Chargeur rapide 20W', name_ar: 'شاحن سريع 20W', barcode: '764000005', avg_purchase_price: 500, avg_selling_price: 750, unit: 'unité' },
      { name: 'Écouteurs filaires universels', name_ar: 'سماعات سلكية عالمية', barcode: '764000006', avg_purchase_price: 200, avg_selling_price: 350, unit: 'unité' },
      { name: 'Support téléphone voiture', name_ar: 'حامل هاتف للسيارة', barcode: '764000007', avg_purchase_price: 300, avg_selling_price: 480, unit: 'unité' },
      { name: 'Coque silicone universelle', name_ar: 'غطاء سيليكون عالمي', barcode: '764000008', avg_purchase_price: 150, avg_selling_price: 280, unit: 'unité' },
      { name: 'Protection écran verre trempé', name_ar: 'حماية شاشة زجاج صلب', barcode: '764000009', avg_purchase_price: 100, avg_selling_price: 200, unit: 'unité' },
      { name: 'Power Bank 10000mAh', name_ar: 'باور بانك 10000 مللي أمبير', barcode: '764000010', avg_purchase_price: 1500, avg_selling_price: 2200, unit: 'unité' },
      { name: 'Power Bank 20000mAh', name_ar: 'باور بانك 20000 مللي أمبير', barcode: '764000011', avg_purchase_price: 2500, avg_selling_price: 3500, unit: 'unité' },
      // Piles
      { name: 'Piles AA Duracell (Pack 4)', name_ar: 'بطاريات AA دوراسيل (4 قطع)', barcode: '765000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'pack' },
      { name: 'Piles AAA Duracell (Pack 4)', name_ar: 'بطاريات AAA دوراسيل (4 قطع)', barcode: '765000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'pack' },
      { name: 'Piles AA Energizer (Pack 4)', name_ar: 'بطاريات AA إنرجايزر (4 قطع)', barcode: '765000003', avg_purchase_price: 380, avg_selling_price: 520, unit: 'pack' },
      { name: 'Pile 9V', name_ar: 'بطارية 9 فولت', barcode: '765000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Piles bouton CR2032 (Pack 5)', name_ar: 'بطاريات زر CR2032 (5 قطع)', barcode: '765000005', avg_purchase_price: 200, avg_selling_price: 300, unit: 'pack' },
    ],
  },

  // 16. TABAC & ACCESSOIRES
  {
    name: 'Tabac & Accessoires',
    name_ar: 'التبغ وملحقاته',
    icon: 'Cigarette',
    color: '#78716C',
    products: [
      // Cigarettes
      { name: 'Marlboro Rouge', name_ar: 'مارلبورو أحمر', barcode: '771000001', avg_purchase_price: 250, avg_selling_price: 300, unit: 'paquet' },
      { name: 'Marlboro Gold', name_ar: 'مارلبورو ذهبي', barcode: '771000002', avg_purchase_price: 250, avg_selling_price: 300, unit: 'paquet' },
      { name: 'Camel Bleu', name_ar: 'كامل أزرق', barcode: '771000003', avg_purchase_price: 220, avg_selling_price: 270, unit: 'paquet' },
      { name: 'Winston Blue', name_ar: 'وينستون أزرق', barcode: '771000004', avg_purchase_price: 200, avg_selling_price: 250, unit: 'paquet' },
      { name: 'L&M Rouge', name_ar: 'إل آند إم أحمر', barcode: '771000005', avg_purchase_price: 180, avg_selling_price: 220, unit: 'paquet' },
      { name: 'Rym', name_ar: 'ريم', barcode: '771000006', avg_purchase_price: 120, avg_selling_price: 150, unit: 'paquet' },
      { name: 'Nassim', name_ar: 'نسيم', barcode: '771000007', avg_purchase_price: 100, avg_selling_price: 130, unit: 'paquet' },
      // Accessoires
      { name: 'Briquet BIC classique', name_ar: 'ولاعة بيك كلاسيك', barcode: '772000001', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Briquet rechargeable', name_ar: 'ولاعة قابلة للشحن', barcode: '772000002', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Allumettes (Pack 10)', name_ar: 'عود ثقاب (10 علب)', barcode: '772000003', avg_purchase_price: 50, avg_selling_price: 80, unit: 'pack' },
      { name: 'Papier à rouler', name_ar: 'ورق لف', barcode: '772000004', avg_purchase_price: 30, avg_selling_price: 50, unit: 'unité' },
    ],
  },

  // 17. PRODUITS POUR ANIMAUX
  {
    name: 'Produits Animaux',
    name_ar: 'منتجات الحيوانات',
    icon: 'PawPrint',
    color: '#A855F7',
    products: [
      // Alimentation chats
      { name: 'Croquettes chat adulte 1kg', name_ar: 'طعام قطط جاف بالغ 1كغ', barcode: '781000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Croquettes chat adulte 4kg', name_ar: 'طعام قطط جاف بالغ 4كغ', barcode: '781000002', avg_purchase_price: 1400, avg_selling_price: 1850, unit: 'unité' },
      { name: 'Pâtée chat 400g', name_ar: 'طعام قطط معلب 400غ', barcode: '781000003', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Croquettes chaton 1kg', name_ar: 'طعام قطط صغيرة جاف 1كغ', barcode: '781000004', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      // Alimentation chiens
      { name: 'Croquettes chien adulte 2kg', name_ar: 'طعام كلاب جاف بالغ 2كغ', barcode: '782000001', avg_purchase_price: 600, avg_selling_price: 800, unit: 'unité' },
      { name: 'Croquettes chien adulte 10kg', name_ar: 'طعام كلاب جاف بالغ 10كغ', barcode: '782000002', avg_purchase_price: 2500, avg_selling_price: 3200, unit: 'unité' },
      { name: 'Pâtée chien 400g', name_ar: 'طعام كلاب معلب 400غ', barcode: '782000003', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      // Alimentation oiseaux
      { name: 'Graines canari 500g', name_ar: 'حبوب كناري 500غ', barcode: '783000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Graines perruche 1kg', name_ar: 'حبوب ببغاء 1كغ', barcode: '783000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Millet en grappe', name_ar: 'دخن في عناقيد', barcode: '783000003', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      // Alimentation poissons
      { name: 'Flocons poissons rouges 100g', name_ar: 'رقائق أسماك ذهبية 100غ', barcode: '784000001', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Granulés poissons tropicaux 100g', name_ar: 'حبيبات أسماك استوائية 100غ', barcode: '784000002', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      // Accessoires
      { name: 'Litière chat 5L', name_ar: 'رمل قطط 5ل', barcode: '785000001', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Litière chat agglomérante 10L', name_ar: 'رمل قطط متكتل 10ل', barcode: '785000002', avg_purchase_price: 550, avg_selling_price: 750, unit: 'unité' },
      { name: 'Gamelle inox animal', name_ar: 'وعاء ستانلس للحيوانات', barcode: '785000003', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Laisse chien standard', name_ar: 'مقود كلب قياسي', barcode: '785000004', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Collier chat réglable', name_ar: 'طوق قطط قابل للتعديل', barcode: '785000005', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
    ],
  },

  // 18. AUTOMOBILE
  {
    name: 'Automobile',
    name_ar: 'السيارات',
    icon: 'Car',
    color: '#3B82F6',
    products: [
      // Huiles moteur
      { name: 'Huile moteur 15W40 4L', name_ar: 'زيت محرك 15W40 4ل', barcode: '791000001', avg_purchase_price: 2000, avg_selling_price: 2600, unit: 'unité' },
      { name: 'Huile moteur 10W40 4L', name_ar: 'زيت محرك 10W40 4ل', barcode: '791000002', avg_purchase_price: 2200, avg_selling_price: 2850, unit: 'unité' },
      { name: 'Huile moteur 5W40 4L', name_ar: 'زيت محرك 5W40 4ل', barcode: '791000003', avg_purchase_price: 2800, avg_selling_price: 3600, unit: 'unité' },
      { name: 'Huile moteur diesel 5L', name_ar: 'زيت محرك ديزل 5ل', barcode: '791000004', avg_purchase_price: 2500, avg_selling_price: 3200, unit: 'unité' },
      // Liquides
      { name: 'Liquide de refroidissement 5L', name_ar: 'سائل تبريد 5ل', barcode: '792000001', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Liquide lave-glace 5L', name_ar: 'سائل غسيل زجاج 5ل', barcode: '792000002', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Liquide de frein 500ml', name_ar: 'سائل فرامل 500مل', barcode: '792000003', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Eau distillée 5L', name_ar: 'ماء مقطر 5ل', barcode: '792000004', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      // Entretien
      { name: 'Shampooing auto 1L', name_ar: 'شامبو سيارات 1ل', barcode: '793000001', avg_purchase_price: 250, avg_selling_price: 380, unit: 'unité' },
      { name: 'Polish carrosserie 500ml', name_ar: 'ملمع هيكل 500مل', barcode: '793000002', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Nettoyant tableaux de bord 400ml', name_ar: 'منظف لوحة القيادة 400مل', barcode: '793000003', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Désodorisant voiture', name_ar: 'معطر سيارة', barcode: '793000004', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Éponge lavage auto', name_ar: 'إسفنج غسيل سيارات', barcode: '793000005', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Peau de chamois', name_ar: 'جلد شمواه', barcode: '793000006', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      // Accessoires
      { name: 'Câbles de démarrage', name_ar: 'كوابل بطارية', barcode: '794000001', avg_purchase_price: 600, avg_selling_price: 900, unit: 'unité' },
      { name: 'Compresseur à air portable', name_ar: 'ضاغط هواء متنقل', barcode: '794000002', avg_purchase_price: 1500, avg_selling_price: 2200, unit: 'unité' },
      { name: 'Triangle de signalisation', name_ar: 'مثلث تحذير', barcode: '794000003', avg_purchase_price: 300, avg_selling_price: 480, unit: 'unité' },
      { name: 'Gilet réfléchissant', name_ar: 'صدرية عاكسة', barcode: '794000004', avg_purchase_price: 200, avg_selling_price: 320, unit: 'unité' },
      { name: 'Ampoule H7 12V', name_ar: 'مصباح H7 12V', barcode: '794000005', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Fusibles auto assortis', name_ar: 'فيوزات سيارة متنوعة', barcode: '794000006', avg_purchase_price: 80, avg_selling_price: 150, unit: 'pack' },
    ],
  },

  // 19. QUINCAILLERIE & BRICOLAGE
  {
    name: 'Quincaillerie & Bricolage',
    name_ar: 'الحدادة والأدوات',
    icon: 'Wrench',
    color: '#64748B',
    products: [
      // Outils à main
      { name: 'Marteau 300g', name_ar: 'مطرقة 300غ', barcode: '801000001', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Tournevis plat', name_ar: 'مفك مسطح', barcode: '801000002', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Tournevis cruciforme', name_ar: 'مفك صليبي', barcode: '801000003', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Jeu de tournevis (6 pcs)', name_ar: 'طقم مفكات (6 قطع)', barcode: '801000004', avg_purchase_price: 400, avg_selling_price: 600, unit: 'set' },
      { name: 'Pince universelle', name_ar: 'كماشة عالمية', barcode: '801000005', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Pince coupante', name_ar: 'كماشة قاطعة', barcode: '801000006', avg_purchase_price: 280, avg_selling_price: 420, unit: 'unité' },
      { name: 'Clé à molette 250mm', name_ar: 'مفتاح إنجليزي 250مم', barcode: '801000007', avg_purchase_price: 400, avg_selling_price: 600, unit: 'unité' },
      { name: 'Jeu de clés Allen', name_ar: 'طقم مفاتيح ألن', barcode: '801000008', avg_purchase_price: 250, avg_selling_price: 380, unit: 'set' },
      { name: 'Mètre ruban 5m', name_ar: 'متر شريطي 5م', barcode: '801000009', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Niveau à bulle 40cm', name_ar: 'ميزان ماء 40سم', barcode: '801000010', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Cutter professionnel', name_ar: 'قاطع احترافي', barcode: '801000011', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Lames cutter (Pack 10)', name_ar: 'شفرات قاطع (10 قطع)', barcode: '801000012', avg_purchase_price: 80, avg_selling_price: 130, unit: 'pack' },
      // Visserie
      { name: 'Vis à bois assortiment', name_ar: 'براغي خشب متنوعة', barcode: '802000001', avg_purchase_price: 150, avg_selling_price: 250, unit: 'boîte' },
      { name: 'Chevilles plastiques 8mm (Pack 50)', name_ar: 'أوتاد بلاستيك 8مم (50 قطعة)', barcode: '802000002', avg_purchase_price: 100, avg_selling_price: 170, unit: 'pack' },
      { name: 'Clous assortis 500g', name_ar: 'مسامير متنوعة 500غ', barcode: '802000003', avg_purchase_price: 150, avg_selling_price: 250, unit: 'pack' },
      { name: 'Boulons M8 (Pack 20)', name_ar: 'براغي M8 (20 قطعة)', barcode: '802000004', avg_purchase_price: 200, avg_selling_price: 300, unit: 'pack' },
      // Électricité
      { name: 'Ampoule LED E27 9W', name_ar: 'مصباح LED E27 9W', barcode: '803000001', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ampoule LED E27 12W', name_ar: 'مصباح LED E27 12W', barcode: '803000002', avg_purchase_price: 180, avg_selling_price: 280, unit: 'unité' },
      { name: 'Ampoule LED E14 5W', name_ar: 'مصباح LED E14 5W', barcode: '803000003', avg_purchase_price: 120, avg_selling_price: 200, unit: 'unité' },
      { name: 'Multiprise 4 prises', name_ar: 'قابس متعدد 4 مخارج', barcode: '803000004', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Multiprise 6 prises avec interrupteur', name_ar: 'قابس متعدد 6 مخارج مع مفتاح', barcode: '803000005', avg_purchase_price: 500, avg_selling_price: 720, unit: 'unité' },
      { name: 'Rallonge électrique 5m', name_ar: 'تمديد كهربائي 5م', barcode: '803000006', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Interrupteur simple', name_ar: 'مفتاح بسيط', barcode: '803000007', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Prise électrique', name_ar: 'قابس كهربائي', barcode: '803000008', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Ruban isolant électrique', name_ar: 'شريط عازل كهربائي', barcode: '803000009', avg_purchase_price: 50, avg_selling_price: 90, unit: 'unité' },
      // Plomberie
      { name: 'Ruban téflon', name_ar: 'شريط تفلون', barcode: '804000001', avg_purchase_price: 30, avg_selling_price: 60, unit: 'unité' },
      { name: 'Joint caoutchouc assortis', name_ar: 'حشوات مطاط متنوعة', barcode: '804000002', avg_purchase_price: 80, avg_selling_price: 150, unit: 'pack' },
      { name: 'Déboucheur liquide 1L', name_ar: 'مذيب انسداد 1ل', barcode: '804000003', avg_purchase_price: 200, avg_selling_price: 320, unit: 'unité' },
      { name: 'Colle PVC 125ml', name_ar: 'لاصق PVC 125مل', barcode: '804000004', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      // Peinture
      { name: 'Peinture murale blanche 1L', name_ar: 'دهان حائط أبيض 1ل', barcode: '805000001', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Peinture murale blanche 4L', name_ar: 'دهان حائط أبيض 4ل', barcode: '805000002', avg_purchase_price: 1400, avg_selling_price: 1900, unit: 'unité' },
      { name: 'Rouleau peinture 18cm', name_ar: 'رولو دهان 18سم', barcode: '805000003', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Pinceau plat 5cm', name_ar: 'فرشاة دهان 5سم', barcode: '805000004', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Bac à peinture', name_ar: 'صينية دهان', barcode: '805000005', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Bâche de protection 4x5m', name_ar: 'غطاء حماية 4×5م', barcode: '805000006', avg_purchase_price: 200, avg_selling_price: 320, unit: 'unité' },
    ],
  },

  // 20. JARDINAGE
  {
    name: 'Jardinage',
    name_ar: 'البستنة',
    icon: 'Flower',
    color: '#16A34A',
    products: [
      // Semences
      { name: 'Graines tomates', name_ar: 'بذور طماطم', barcode: '811000001', avg_purchase_price: 80, avg_selling_price: 130, unit: 'sachet' },
      { name: 'Graines poivrons', name_ar: 'بذور فلفل', barcode: '811000002', avg_purchase_price: 80, avg_selling_price: 130, unit: 'sachet' },
      { name: 'Graines courgettes', name_ar: 'بذور كوسة', barcode: '811000003', avg_purchase_price: 70, avg_selling_price: 120, unit: 'sachet' },
      { name: 'Graines haricots', name_ar: 'بذور فاصوليا', barcode: '811000004', avg_purchase_price: 60, avg_selling_price: 100, unit: 'sachet' },
      { name: 'Graines persil', name_ar: 'بذور معدنوس', barcode: '811000005', avg_purchase_price: 50, avg_selling_price: 90, unit: 'sachet' },
      { name: 'Graines coriandre', name_ar: 'بذور قزبر', barcode: '811000006', avg_purchase_price: 50, avg_selling_price: 90, unit: 'sachet' },
      { name: 'Graines menthe', name_ar: 'بذور نعناع', barcode: '811000007', avg_purchase_price: 60, avg_selling_price: 100, unit: 'sachet' },
      { name: 'Gazon universel 1kg', name_ar: 'بذور عشب 1كغ', barcode: '811000008', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'kg' },
      // Terreau et engrais
      { name: 'Terreau universel 20L', name_ar: 'تربة زراعية 20ل', barcode: '812000001', avg_purchase_price: 350, avg_selling_price: 500, unit: 'sac' },
      { name: 'Terreau universel 50L', name_ar: 'تربة زراعية 50ل', barcode: '812000002', avg_purchase_price: 700, avg_selling_price: 950, unit: 'sac' },
      { name: 'Engrais universel 1kg', name_ar: 'سماد عالمي 1كغ', barcode: '812000003', avg_purchase_price: 250, avg_selling_price: 380, unit: 'unité' },
      { name: 'Engrais tomates 1kg', name_ar: 'سماد طماطم 1كغ', barcode: '812000004', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Engrais agrumes 1kg', name_ar: 'سماد حمضيات 1كغ', barcode: '812000005', avg_purchase_price: 320, avg_selling_price: 480, unit: 'unité' },
      // Outils jardinage
      { name: 'Sécateur', name_ar: 'مقص تقليم', barcode: '813000001', avg_purchase_price: 400, avg_selling_price: 600, unit: 'unité' },
      { name: 'Bêche', name_ar: 'مسحاة', barcode: '813000002', avg_purchase_price: 600, avg_selling_price: 850, unit: 'unité' },
      { name: 'Râteau', name_ar: 'مشط زراعي', barcode: '813000003', avg_purchase_price: 350, avg_selling_price: 520, unit: 'unité' },
      { name: 'Arrosoir 10L', name_ar: 'إبريق سقي 10ل', barcode: '813000004', avg_purchase_price: 400, avg_selling_price: 600, unit: 'unité' },
      { name: 'Tuyau arrosage 15m', name_ar: 'خرطوم سقي 15م', barcode: '813000005', avg_purchase_price: 1200, avg_selling_price: 1700, unit: 'unité' },
      { name: 'Pistolet arrosage', name_ar: 'مسدس سقي', barcode: '813000006', avg_purchase_price: 250, avg_selling_price: 400, unit: 'unité' },
      { name: 'Gants jardinage', name_ar: 'قفازات بستنة', barcode: '813000007', avg_purchase_price: 150, avg_selling_price: 250, unit: 'paire' },
      // Pots
      { name: 'Pot plastique rond 20cm', name_ar: 'وعاء بلاستيك دائري 20سم', barcode: '814000001', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Pot plastique rond 30cm', name_ar: 'وعاء بلاستيك دائري 30سم', barcode: '814000002', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Jardinière balcon 50cm', name_ar: 'حوض شرفة 50سم', barcode: '814000003', avg_purchase_price: 200, avg_selling_price: 320, unit: 'unité' },
      { name: 'Soucoupe plastique 25cm', name_ar: 'صحن بلاستيك 25سم', barcode: '814000004', avg_purchase_price: 40, avg_selling_price: 80, unit: 'unité' },
      // Insecticides jardin
      { name: 'Insecticide jardin 500ml', name_ar: 'مبيد حشري حديقة 500مل', barcode: '815000001', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Anti-limaces 500g', name_ar: 'مضاد حلزون 500غ', barcode: '815000002', avg_purchase_price: 280, avg_selling_price: 420, unit: 'unité' },
      { name: 'Désherbant 1L', name_ar: 'مبيد أعشاب 1ل', barcode: '815000003', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
    ],
  },
];

// Helper function to count total products
export const getTotalProductCount = (): number => {
  return catalogCategories.reduce((total, cat) => total + cat.products.length, 0);
};

// Helper function to get all products flat
export const getAllProducts = (): (CatalogProductData & { categoryName: string })[] => {
  return catalogCategories.flatMap(cat => 
    cat.products.map(p => ({ ...p, categoryName: cat.name }))
  );
};
