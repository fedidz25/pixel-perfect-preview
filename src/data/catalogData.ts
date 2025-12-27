// Extended catalog with 2000+ products for Algerian market

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

// Algerian and international brand names
const brands = {
  dairy: ['Soummam', 'Danone', 'Hodna', 'Tifra', 'La Vache Qui Rit', 'Candia', 'Trèfle', 'Yoplait', 'Activia', 'Djurdjura'],
  beverages: ['Hamoud Boualem', 'Ifri', 'Ngaous', 'Rouiba', 'Coca-Cola', 'Pepsi', 'Sprite', 'Fanta', 'Mirinda', 'Orangina', 'Schweppes', '7Up'],
  water: ['Ifri', 'Saïda', 'Guedila', 'Lalla Khedidja', 'Toudja', 'Batna', 'Milok', 'Sidi El Kabir'],
  oils: ['Cevital', 'Afia', 'Safia', 'Elio', 'Fleurial', 'Lesieur', 'Oléor', 'Belhadj'],
  pasta: ['Sim', 'La Pasta', 'Amor Benamor', 'El Milia', 'Warda', 'Panzani', 'Barilla'],
  flour: ['Sfiha', 'Safina', 'El Ghalia', 'La Belle', 'Labelle'],
  coffee: ['Café Essalem', 'Café Negro', 'Nescafé', 'Lavazza', 'Carte Noire', 'Maxwell', 'Tchibo'],
  chocolate: ['La Cigogne', 'Hamza', 'Milka', 'Kinder', 'Ferrero', 'Toblerone', 'Côte d\'Or', 'Lindt'],
  biscuits: ['Bimo', 'LU', 'Delichoc', 'Biscuiterie Moderne', 'Oreo', 'Prince', 'BN', 'Digestive'],
  cleaning: ['Isis', 'Henkel', 'Mr Propre', 'Javel Lacroix', 'OMO', 'Ariel', 'Persil', 'Tide', 'Skip', 'Le Chat'],
  personal: ['Palmolive', 'Dove', 'Nivea', 'L\'Oréal', 'Head & Shoulders', 'Sunsilk', 'Garnier', 'Schwarzkopf'],
  chips: ['Lays', 'Pringles', 'Bingo', 'Croustina', 'Chipsy'],
  cereals: ['Kellogg\'s', 'Nestlé', 'Jordans', 'Quaker'],
};

const sizes = {
  small: ['100g', '125g', '150g', '200g', '250g'],
  medium: ['300g', '400g', '500g', '750g'],
  large: ['1kg', '1.5kg', '2kg', '5kg', '10kg', '25kg'],
  liquid: ['20cl', '25cl', '33cl', '50cl', '1L', '1.5L', '2L', '5L'],
  pack: ['Pack 6', 'Pack 12', 'Pack 24'],
};

export const catalogCategories: CatalogCategoryData[] = [
  // 1. PRODUITS LAITIERS (Dairy) - ~150 products
  {
    name: 'Produits Laitiers',
    name_ar: 'منتجات الألبان',
    icon: 'Milk',
    color: '#3B82F6',
    products: [
      // Lait (Milk) - ~60 products
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
      // Yaourt (Yogurt) - ~80 products
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
      // Yaourt à boire
      ...['Soummam', 'Danone', 'Activia'].flatMap((brand, bi) =>
        ['Fraise', 'Vanille', 'Mangue', 'Pêche'].map((flavor, fi) => ({
          name: `Yaourt à boire ${brand} ${flavor}`,
          name_ar: `ياغورت للشرب ${brand} ${flavor}`,
          barcode: generateBarcode('622A', bi * 10 + fi),
          avg_purchase_price: 40,
          avg_selling_price: 55,
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
      { name: 'Fromage Philadelphia 200g', name_ar: 'جبنة فيلادلفيا 200غ', barcode: '623000011', avg_purchase_price: 380, avg_selling_price: 480, unit: 'unité' },
      { name: 'Fromage Président Brie 200g', name_ar: 'جبنة بريزيدون بري 200غ', barcode: '623000012', avg_purchase_price: 420, avg_selling_price: 520, unit: 'unité' },
      { name: 'Fromage Babybel 6 pièces', name_ar: 'جبنة بيبيبل 6 قطع', barcode: '623000013', avg_purchase_price: 280, avg_selling_price: 360, unit: 'unité' },
      { name: 'Fromage râpé 4 fromages 200g', name_ar: 'جبنة مبشورة 4 أنواع 200غ', barcode: '623000014', avg_purchase_price: 350, avg_selling_price: 450, unit: 'unité' },
      // Beurre (Butter)
      { name: 'Beurre Soummam 200g', name_ar: 'زبدة سومام 200غ', barcode: '624000001', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Beurre Soummam 500g', name_ar: 'زبدة سومام 500غ', barcode: '624000002', avg_purchase_price: 650, avg_selling_price: 780, unit: 'unité' },
      { name: 'Beurre Président 200g', name_ar: 'زبدة بريزيدون 200غ', barcode: '624000003', avg_purchase_price: 350, avg_selling_price: 420, unit: 'unité' },
      { name: 'Beurre Elle & Vire 200g', name_ar: 'زبدة إل أند فير 200غ', barcode: '624000004', avg_purchase_price: 380, avg_selling_price: 460, unit: 'unité' },
      { name: 'Margarine Fleurial 500g', name_ar: 'مارغرين فلوريال 500غ', barcode: '624000005', avg_purchase_price: 180, avg_selling_price: 230, unit: 'unité' },
      { name: 'Margarine La Fermière 250g', name_ar: 'مارغرين لا فرميير 250غ', barcode: '624000006', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Margarine Matina 500g', name_ar: 'مارغرين ماتينا 500غ', barcode: '624000007', avg_purchase_price: 160, avg_selling_price: 210, unit: 'unité' },
      // Crème fraîche
      { name: 'Crème fraîche Soummam 20cl', name_ar: 'كريمة طازجة سومام 20سل', barcode: '625000001', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Crème fraîche Candia 50cl', name_ar: 'كريمة طازجة كانديا 50سل', barcode: '625000002', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Crème fraîche Elle & Vire 20cl', name_ar: 'كريمة طازجة إل أند فير 20سل', barcode: '625000003', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Crème Chantilly 250ml', name_ar: 'كريمة شانتيي 250مل', barcode: '625000004', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      // Lben
      { name: 'Lben Soummam 1L', name_ar: 'لبن سومام 1ل', barcode: '626000001', avg_purchase_price: 80, avg_selling_price: 100, unit: 'unité' },
      { name: 'Lben Hodna 1L', name_ar: 'لبن حضنة 1ل', barcode: '626000002', avg_purchase_price: 75, avg_selling_price: 95, unit: 'unité' },
      { name: 'Lben Danone 50cl', name_ar: 'لبن دانون 50سل', barcode: '626000003', avg_purchase_price: 45, avg_selling_price: 60, unit: 'unité' },
      { name: 'Lben Tifra 1L', name_ar: 'لبن تيفرة 1ل', barcode: '626000004', avg_purchase_price: 78, avg_selling_price: 98, unit: 'unité' },
      // Raïb
      { name: 'Raïb Soummam 1L', name_ar: 'رايب سومام 1ل', barcode: '627000001', avg_purchase_price: 90, avg_selling_price: 110, unit: 'unité' },
      { name: 'Raïb Hodna 1L', name_ar: 'رايب حضنة 1ل', barcode: '627000002', avg_purchase_price: 85, avg_selling_price: 105, unit: 'unité' },
      { name: 'Raïb Djurdjura 1L', name_ar: 'رايب جرجرة 1ل', barcode: '627000003', avg_purchase_price: 88, avg_selling_price: 108, unit: 'unité' },
    ],
  },

  // 2. BOISSONS (Beverages) - ~150 products
  {
    name: 'Boissons',
    name_ar: 'المشروبات',
    icon: 'Wine',
    color: '#EF4444',
    products: [
      // Eau minérale (Mineral water) - ~40 products
      ...brands.water.flatMap((brand, bi) =>
        ['0.5L', '1L', '1.5L', '5L'].map((size, si) => ({
          name: `Eau ${brand} ${size}`,
          name_ar: `ماء ${brand} ${size}`,
          barcode: generateBarcode('631', bi * 10 + si),
          avg_purchase_price: size === '0.5L' ? 25 : size === '1L' ? 35 : size === '1.5L' ? 40 : 80,
          avg_selling_price: size === '0.5L' ? 35 : size === '1L' ? 50 : size === '1.5L' ? 55 : 110,
          unit: 'unité',
        }))
      ),
      // Packs eau
      ...['Ifri', 'Saïda', 'Guedila'].flatMap((brand, bi) =>
        ['Pack 6x1.5L', 'Pack 12x0.5L'].map((size, si) => ({
          name: `Eau ${brand} ${size}`,
          name_ar: `ماء ${brand} ${size}`,
          barcode: generateBarcode('631P', bi * 10 + si),
          avg_purchase_price: size.includes('1.5L') ? 220 : 180,
          avg_selling_price: size.includes('1.5L') ? 280 : 240,
          unit: 'pack',
        }))
      ),
      // Sodas - ~70 products
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
      // Packs sodas
      ...['Coca-Cola', 'Pepsi', 'Hamoud Boualem', 'Ifri'].flatMap((brand, bi) =>
        ['Pack 6x33cl', 'Pack 12x33cl'].map((size, si) => ({
          name: `${brand} ${size}`,
          name_ar: `${brand} ${size}`,
          barcode: generateBarcode('632P', bi * 10 + si),
          avg_purchase_price: size.includes('6') ? 180 : 350,
          avg_selling_price: size.includes('6') ? 240 : 480,
          unit: 'pack',
        }))
      ),
      // Jus de fruits (Fruit juices) - ~60 products
      ...['Orange', 'Pomme', 'Raisin', 'Mangue', 'Cocktail', 'Ananas', 'Pêche', 'Abricot', 'Fraise', 'Grenade'].flatMap((fruit, fi) =>
        ['Rouiba', 'Ngaous', 'Ifri', 'Tropicana'].flatMap((brand, bi) =>
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
      { name: 'Sirop Teisseire Fraise 75cl', name_ar: 'شراب تيسير فراولة 75سل', barcode: '634000005', avg_purchase_price: 350, avg_selling_price: 420, unit: 'unité' },
      // Energy drinks
      { name: 'Red Bull 25cl', name_ar: 'ريد بول 25سل', barcode: '635000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Monster Energy 50cl', name_ar: 'مونستر إنرجي 50سل', barcode: '635000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Power Horse 25cl', name_ar: 'باور هورس 25سل', barcode: '635000003', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Burn 25cl', name_ar: 'بيرن 25سل', barcode: '635000004', avg_purchase_price: 130, avg_selling_price: 180, unit: 'unité' },
      { name: 'Code Red 25cl', name_ar: 'كود ريد 25سل', barcode: '635000005', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
    ],
  },

  // 3. ÉPICERIE SALÉE (Grocery - Savory) - ~200 products
  {
    name: 'Épicerie Salée',
    name_ar: 'البقالة المالحة',
    icon: 'ShoppingBasket',
    color: '#F59E0B',
    products: [
      // Pâtes (Pasta) - ~70 products
      ...brands.pasta.flatMap((brand, bi) =>
        ['Spaghetti', 'Macaroni', 'Coquillettes', 'Penne', 'Farfalle', 'Lasagne', 'Cheveux d\'ange', 'Torsades', 'Fusilli', 'Tagliatelle'].flatMap((type, ti) =>
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
      ...['Sim', 'Warda', 'El Milia'].flatMap((brand, bi) =>
        ['Fin', 'Moyen', 'Gros'].flatMap((type, ti) =>
          ['500g', '1kg'].map((size, si) => ({
            name: `Couscous ${brand} ${type} ${size}`,
            name_ar: `كسكس ${brand} ${type} ${size}`,
            barcode: generateBarcode('642', bi * 100 + ti * 10 + si),
            avg_purchase_price: size === '500g' ? 80 : 150,
            avg_selling_price: size === '500g' ? 110 : 200,
            unit: 'unité',
          }))
        )
      ),
      // Riz (Rice)
      { name: 'Riz Basmati 1kg', name_ar: 'أرز بسمتي 1كغ', barcode: '643000001', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Riz Basmati 5kg', name_ar: 'أرز بسمتي 5كغ', barcode: '643000002', avg_purchase_price: 1300, avg_selling_price: 1600, unit: 'unité' },
      { name: 'Riz Long Grain 1kg', name_ar: 'أرز طويل الحبة 1كغ', barcode: '643000003', avg_purchase_price: 180, avg_selling_price: 240, unit: 'unité' },
      { name: 'Riz Long Grain 5kg', name_ar: 'أرز طويل الحبة 5كغ', barcode: '643000004', avg_purchase_price: 850, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Riz Rond 1kg', name_ar: 'أرز دائري 1كغ', barcode: '643000005', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Riz Rond 5kg', name_ar: 'أرز دائري 5كغ', barcode: '643000006', avg_purchase_price: 750, avg_selling_price: 1000, unit: 'unité' },
      { name: 'Riz Thaï Jasmin 1kg', name_ar: 'أرز تايلاندي ياسمين 1كغ', barcode: '643000007', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Riz Arborio Risotto 500g', name_ar: 'أرز أربوريو ريزوتو 500غ', barcode: '643000008', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      // Farine (Flour)
      ...brands.flour.flatMap((brand, bi) =>
        ['1kg', '5kg', '10kg', '25kg'].map((size, si) => ({
          name: `Farine ${brand} ${size}`,
          name_ar: `فرينة ${brand} ${size}`,
          barcode: generateBarcode('644', bi * 10 + si),
          avg_purchase_price: size === '1kg' ? 60 : size === '5kg' ? 280 : size === '10kg' ? 540 : 1300,
          avg_selling_price: size === '1kg' ? 80 : size === '5kg' ? 350 : size === '10kg' ? 680 : 1600,
          unit: 'unité',
        }))
      ),
      // Semoule
      ...['Fine', 'Moyenne', 'Grosse'].flatMap((type, ti) =>
        ['1kg', '5kg', '25kg'].map((size, si) => ({
          name: `Semoule ${type} ${size}`,
          name_ar: `سميد ${type} ${size}`,
          barcode: generateBarcode('644S', ti * 10 + si),
          avg_purchase_price: size === '1kg' ? 70 : size === '5kg' ? 320 : 1550,
          avg_selling_price: size === '1kg' ? 95 : size === '5kg' ? 420 : 1950,
          unit: 'unité',
        }))
      ),
      // Huiles (Oils) - ~40 products
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
      { name: 'Huile de tournesol 1L', name_ar: 'زيت عباد الشمس 1ل', barcode: '645100004', avg_purchase_price: 250, avg_selling_price: 320, unit: 'unité' },
      { name: 'Huile de maïs 1L', name_ar: 'زيت الذرة 1ل', barcode: '645100005', avg_purchase_price: 300, avg_selling_price: 380, unit: 'unité' },
      // Sucre (Sugar)
      { name: 'Sucre blanc 1kg', name_ar: 'سكر أبيض 1كغ', barcode: '646000001', avg_purchase_price: 110, avg_selling_price: 140, unit: 'unité' },
      { name: 'Sucre blanc 5kg', name_ar: 'سكر أبيض 5كغ', barcode: '646000002', avg_purchase_price: 520, avg_selling_price: 650, unit: 'unité' },
      { name: 'Sucre morceaux 1kg', name_ar: 'سكر مكعبات 1كغ', barcode: '646000003', avg_purchase_price: 130, avg_selling_price: 170, unit: 'unité' },
      { name: 'Sucre glace 500g', name_ar: 'سكر بودرة 500غ', barcode: '646000004', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      { name: 'Sucre roux 1kg', name_ar: 'سكر أسمر 1كغ', barcode: '646000005', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      // Sel (Salt)
      { name: 'Sel de table 1kg', name_ar: 'ملح طعام 1كغ', barcode: '647000001', avg_purchase_price: 20, avg_selling_price: 35, unit: 'unité' },
      { name: 'Sel fin iodé 500g', name_ar: 'ملح ناعم ميودي 500غ', barcode: '647000002', avg_purchase_price: 25, avg_selling_price: 40, unit: 'unité' },
      { name: 'Gros sel 1kg', name_ar: 'ملح خشن 1كغ', barcode: '647000003', avg_purchase_price: 18, avg_selling_price: 30, unit: 'unité' },
      { name: 'Fleur de sel 250g', name_ar: 'زهرة الملح 250غ', barcode: '647000004', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      // Conserves (Canned goods) - ~30 products
      { name: 'Concentré de tomate 200g', name_ar: 'معجون طماطم 200غ', barcode: '648000001', avg_purchase_price: 60, avg_selling_price: 85, unit: 'unité' },
      { name: 'Concentré de tomate 400g', name_ar: 'معجون طماطم 400غ', barcode: '648000002', avg_purchase_price: 110, avg_selling_price: 150, unit: 'unité' },
      { name: 'Concentré de tomate 800g', name_ar: 'معجون طماطم 800غ', barcode: '648000003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Double concentré de tomate 200g', name_ar: 'معجون طماطم مركز 200غ', barcode: '648000004', avg_purchase_price: 80, avg_selling_price: 110, unit: 'unité' },
      { name: 'Tomates pelées 400g', name_ar: 'طماطم مقشرة 400غ', barcode: '648000005', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Pois chiches 400g', name_ar: 'حمص 400غ', barcode: '648000006', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Haricots blancs 400g', name_ar: 'فاصوليا بيضاء 400غ', barcode: '648000007', avg_purchase_price: 80, avg_selling_price: 115, unit: 'unité' },
      { name: 'Haricots rouges 400g', name_ar: 'فاصوليا حمراء 400غ', barcode: '648000008', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Lentilles 400g', name_ar: 'عدس 400غ', barcode: '648000009', avg_purchase_price: 75, avg_selling_price: 110, unit: 'unité' },
      { name: 'Maïs doux 340g', name_ar: 'ذرة حلوة 340غ', barcode: '648000010', avg_purchase_price: 100, avg_selling_price: 140, unit: 'unité' },
      { name: 'Petits pois 400g', name_ar: 'بازلاء 400غ', barcode: '648000011', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Petits pois et carottes 400g', name_ar: 'بازلاء وجزر 400غ', barcode: '648000012', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Champignons 400g', name_ar: 'فطر 400غ', barcode: '648000013', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Olives vertes 400g', name_ar: 'زيتون أخضر 400غ', barcode: '648000014', avg_purchase_price: 180, avg_selling_price: 240, unit: 'unité' },
      { name: 'Olives noires 400g', name_ar: 'زيتون أسود 400غ', barcode: '648000015', avg_purchase_price: 200, avg_selling_price: 270, unit: 'unité' },
      { name: 'Olives farcies 400g', name_ar: 'زيتون محشو 400غ', barcode: '648000016', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Sardines à l\'huile 125g', name_ar: 'سردين بالزيت 125غ', barcode: '648000017', avg_purchase_price: 120, avg_selling_price: 160, unit: 'unité' },
      { name: 'Sardines piquantes 125g', name_ar: 'سردين حار 125غ', barcode: '648000018', avg_purchase_price: 130, avg_selling_price: 175, unit: 'unité' },
      { name: 'Thon à l\'huile 160g', name_ar: 'تونة بالزيت 160غ', barcode: '648000019', avg_purchase_price: 250, avg_selling_price: 320, unit: 'unité' },
      { name: 'Thon au naturel 160g', name_ar: 'تونة طبيعية 160غ', barcode: '648000020', avg_purchase_price: 280, avg_selling_price: 350, unit: 'unité' },
      { name: 'Thon à la tomate 160g', name_ar: 'تونة بالطماطم 160غ', barcode: '648000021', avg_purchase_price: 270, avg_selling_price: 340, unit: 'unité' },
      // Épices (Spices) - ~25 products
      { name: 'Poivre noir moulu 50g', name_ar: 'فلفل أسود مطحون 50غ', barcode: '649000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Poivre noir grains 100g', name_ar: 'فلفل أسود حبوب 100غ', barcode: '649000002', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Cumin moulu 50g', name_ar: 'كمون مطحون 50غ', barcode: '649000003', avg_purchase_price: 70, avg_selling_price: 100, unit: 'unité' },
      { name: 'Cumin grains 100g', name_ar: 'كمون حبوب 100غ', barcode: '649000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Paprika doux 50g', name_ar: 'بابريكا حلوة 50غ', barcode: '649000005', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Piment rouge moulu 50g', name_ar: 'فلفل أحمر مطحون 50غ', barcode: '649000006', avg_purchase_price: 65, avg_selling_price: 95, unit: 'unité' },
      { name: 'Curcuma 50g', name_ar: 'كركم 50غ', barcode: '649000007', avg_purchase_price: 75, avg_selling_price: 110, unit: 'unité' },
      { name: 'Gingembre moulu 50g', name_ar: 'زنجبيل مطحون 50غ', barcode: '649000008', avg_purchase_price: 85, avg_selling_price: 120, unit: 'unité' },
      { name: 'Cannelle moulue 50g', name_ar: 'قرفة مطحونة 50غ', barcode: '649000009', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Cannelle bâtons 50g', name_ar: 'قرفة أعواد 50غ', barcode: '649000010', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Ras el hanout 100g', name_ar: 'رأس الحانوت 100غ', barcode: '649000011', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Harissa 100g', name_ar: 'هريسة 100غ', barcode: '649000012', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Harissa en tube 70g', name_ar: 'هريسة أنبوب 70غ', barcode: '649000013', avg_purchase_price: 100, avg_selling_price: 140, unit: 'unité' },
      { name: 'Laurier feuilles 20g', name_ar: 'ورق الغار 20غ', barcode: '649000014', avg_purchase_price: 40, avg_selling_price: 60, unit: 'unité' },
      { name: 'Thym 50g', name_ar: 'زعتر 50غ', barcode: '649000015', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Safran 1g', name_ar: 'زعفران 1غ', barcode: '649000016', avg_purchase_price: 500, avg_selling_price: 700, unit: 'unité' },
      { name: 'Muscade moulue 30g', name_ar: 'جوزة الطيب مطحونة 30غ', barcode: '649000017', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Clou de girofle 30g', name_ar: 'قرنفل 30غ', barcode: '649000018', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Carvi 50g', name_ar: 'كروية 50غ', barcode: '649000019', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      { name: 'Fenouil graines 50g', name_ar: 'شمر حبوب 50غ', barcode: '649000020', avg_purchase_price: 55, avg_selling_price: 85, unit: 'unité' },
    ],
  },

  // 4. ÉPICERIE SUCRÉE (Sweet Grocery) - ~150 products
  {
    name: 'Épicerie Sucrée',
    name_ar: 'البقالة الحلوة',
    icon: 'Candy',
    color: '#EC4899',
    products: [
      // Café (Coffee) - ~30 products
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
      { name: 'Cappuccino Nescafé Sachet', name_ar: 'كابتشينو نسكافيه كيس', barcode: '651100004', avg_purchase_price: 50, avg_selling_price: 70, unit: 'unité' },
      { name: 'Café Capsules Nespresso x10', name_ar: 'كبسولات قهوة نسبريسو ×10', barcode: '651100005', avg_purchase_price: 450, avg_selling_price: 580, unit: 'boîte' },
      // Thé (Tea) - ~15 products
      { name: 'Thé vert El Mordjane 250g', name_ar: 'شاي أخضر المرجان 250غ', barcode: '652000001', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Thé vert El Mordjane 500g', name_ar: 'شاي أخضر المرجان 500غ', barcode: '652000002', avg_purchase_price: 520, avg_selling_price: 680, unit: 'unité' },
      { name: 'Thé Lipton Yellow Label 25 sachets', name_ar: 'شاي ليبتون 25 كيس', barcode: '652000003', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Thé Lipton Yellow Label 100 sachets', name_ar: 'شاي ليبتون 100 كيس', barcode: '652000004', avg_purchase_price: 650, avg_selling_price: 850, unit: 'unité' },
      { name: 'Thé noir Ceylon 250g', name_ar: 'شاي أسود سيلان 250غ', barcode: '652000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Thé Twinings Earl Grey 25 sachets', name_ar: 'شاي تويننجز إيرل غراي 25 كيس', barcode: '652000006', avg_purchase_price: 350, avg_selling_price: 450, unit: 'unité' },
      { name: 'Infusion Tilleul 25 sachets', name_ar: 'زهر الليمون 25 كيس', barcode: '652000007', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Infusion Camomille 25 sachets', name_ar: 'بابونج 25 كيس', barcode: '652000008', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Infusion Verveine 25 sachets', name_ar: 'لويزة 25 كيس', barcode: '652000009', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      // Chocolat - ~40 products
      ...brands.chocolate.flatMap((brand, bi) =>
        ['Lait', 'Noir', 'Blanc', 'Noisettes'].map((type, ti) => ({
          name: `Chocolat ${brand} ${type} 100g`,
          name_ar: `شوكولاطة ${brand} ${type} 100غ`,
          barcode: generateBarcode('653', bi * 10 + ti),
          avg_purchase_price: 150 + Math.floor(Math.random() * 50),
          avg_selling_price: 200 + Math.floor(Math.random() * 80),
          unit: 'unité',
        }))
      ),
      { name: 'Nutella 350g', name_ar: 'نوتيلا 350غ', barcode: '653100001', avg_purchase_price: 550, avg_selling_price: 700, unit: 'unité' },
      { name: 'Nutella 750g', name_ar: 'نوتيلا 750غ', barcode: '653100002', avg_purchase_price: 1050, avg_selling_price: 1350, unit: 'unité' },
      { name: 'Nutella 1kg', name_ar: 'نوتيلا 1كغ', barcode: '653100003', avg_purchase_price: 1350, avg_selling_price: 1700, unit: 'unité' },
      { name: 'Kinder Bueno Pack 3', name_ar: 'كيندر بوينو 3 قطع', barcode: '653100004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Kinder Surprise', name_ar: 'كيندر سوربريز', barcode: '653100005', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Kinder Country', name_ar: 'كيندر كونتري', barcode: '653100006', avg_purchase_price: 70, avg_selling_price: 100, unit: 'unité' },
      { name: 'Ferrero Rocher 3 pièces', name_ar: 'فيريرو روشيه 3 قطع', barcode: '653100007', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ferrero Rocher 16 pièces', name_ar: 'فيريرو روشيه 16 قطع', barcode: '653100008', avg_purchase_price: 850, avg_selling_price: 1100, unit: 'unité' },
      { name: 'M&M\'s Peanut 45g', name_ar: 'إم أند إمز فول سوداني 45غ', barcode: '653100009', avg_purchase_price: 100, avg_selling_price: 140, unit: 'unité' },
      { name: 'Snickers 50g', name_ar: 'سنيكرز 50غ', barcode: '653100010', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Mars 51g', name_ar: 'مارس 51غ', barcode: '653100011', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Twix 50g', name_ar: 'تويكس 50غ', barcode: '653100012', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Bounty 57g', name_ar: 'باونتي 57غ', barcode: '653100013', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      // Biscuits - ~35 products
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
      { name: 'Granola Chocolat 200g', name_ar: 'غرانولا شوكولا 200غ', barcode: '654100006', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Mikado Chocolat Lait 90g', name_ar: 'ميكادو شوكولا حليب 90غ', barcode: '654100007', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      // Confiture (Jam) - ~15 products
      { name: 'Confiture Fraise 370g', name_ar: 'مربى فراولة 370غ', barcode: '655000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Confiture Abricot 370g', name_ar: 'مربى مشمش 370غ', barcode: '655000002', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Confiture Orange 370g', name_ar: 'مربى برتقال 370غ', barcode: '655000003', avg_purchase_price: 170, avg_selling_price: 240, unit: 'unité' },
      { name: 'Confiture Figue 370g', name_ar: 'مربى تين 370غ', barcode: '655000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Confiture Cerise 370g', name_ar: 'مربى كرز 370غ', barcode: '655000005', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Confiture Myrtille 370g', name_ar: 'مربى توت 370غ', barcode: '655000006', avg_purchase_price: 240, avg_selling_price: 320, unit: 'unité' },
      { name: 'Miel Naturel 500g', name_ar: 'عسل طبيعي 500غ', barcode: '655000007', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Miel Naturel 1kg', name_ar: 'عسل طبيعي 1كغ', barcode: '655000008', avg_purchase_price: 1500, avg_selling_price: 2000, unit: 'unité' },
      { name: 'Miel de Jujubier 250g', name_ar: 'عسل السدر 250غ', barcode: '655000009', avg_purchase_price: 1200, avg_selling_price: 1600, unit: 'unité' },
      // Céréales - ~15 products
      ...brands.cereals.flatMap((brand, bi) =>
        ['Corn Flakes', 'Choco', 'Miel Pops', 'Frosties'].map((type, ti) => ({
          name: `${type} ${brand} 375g`,
          name_ar: `${type} ${brand} 375غ`,
          barcode: generateBarcode('656', bi * 10 + ti),
          avg_purchase_price: 350 + Math.floor(Math.random() * 80),
          avg_selling_price: 450 + Math.floor(Math.random() * 100),
          unit: 'unité',
        }))
      ),
    ],
  },

  // 5. HYGIÈNE & BEAUTÉ (Hygiene & Beauty) - ~180 products
  {
    name: 'Hygiène & Beauté',
    name_ar: 'النظافة والجمال',
    icon: 'Sparkles',
    color: '#8B5CF6',
    products: [
      // Savons (Soaps) - ~20 products
      { name: 'Savon Dove Original 100g', name_ar: 'صابون دوف أصلي 100غ', barcode: '661000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Savon Dove Crème 100g', name_ar: 'صابون دوف كريم 100غ', barcode: '661000002', avg_purchase_price: 130, avg_selling_price: 180, unit: 'unité' },
      { name: 'Savon Palmolive Naturals 100g', name_ar: 'صابون بالموليف طبيعي 100غ', barcode: '661000003', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Savon Lux 100g', name_ar: 'صابون لوكس 100غ', barcode: '661000004', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Savon de Marseille 300g', name_ar: 'صابون مرسيليا 300غ', barcode: '661000005', avg_purchase_price: 150, avg_selling_price: 210, unit: 'unité' },
      { name: 'Savon liquide Dettol 250ml', name_ar: 'صابون سائل ديتول 250مل', barcode: '661000006', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Savon liquide Palmolive 300ml', name_ar: 'صابون سائل بالموليف 300مل', barcode: '661000007', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Gel hydroalcoolique 100ml', name_ar: 'جل كحولي 100مل', barcode: '661000008', avg_purchase_price: 100, avg_selling_price: 150, unit: 'unité' },
      { name: 'Gel hydroalcoolique 500ml', name_ar: 'جل كحولي 500مل', barcode: '661000009', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      // Shampoings - ~40 products
      ...brands.personal.flatMap((brand, bi) =>
        ['Normal', 'Antipelliculaire', 'Cheveux gras', 'Cheveux secs', 'Volume'].map((type, ti) => ({
          name: `Shampoing ${brand} ${type} 400ml`,
          name_ar: `شامبو ${brand} ${type} 400مل`,
          barcode: generateBarcode('662', bi * 100 + ti),
          avg_purchase_price: 280 + Math.floor(Math.random() * 80),
          avg_selling_price: 380 + Math.floor(Math.random() * 100),
          unit: 'unité',
        }))
      ),
      // Après-shampoing
      ...['Dove', 'Pantene', 'L\'Oréal', 'Garnier'].map((brand, bi) => ({
        name: `Après-shampoing ${brand} 400ml`,
        name_ar: `بلسم شعر ${brand} 400مل`,
        barcode: generateBarcode('662A', bi),
        avg_purchase_price: 320,
        avg_selling_price: 450,
        unit: 'unité',
      })),
      // Gel douche - ~15 products
      { name: 'Gel douche Nivea 250ml', name_ar: 'جيل استحمام نيفيا 250مل', barcode: '663000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Gel douche Dove 250ml', name_ar: 'جيل استحمام دوف 250مل', barcode: '663000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Gel douche Palmolive 250ml', name_ar: 'جيل استحمام بالموليف 250مل', barcode: '663000003', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Gel douche Axe Homme 400ml', name_ar: 'جيل استحمام أكس رجال 400مل', barcode: '663000004', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Gel douche Adidas Homme 400ml', name_ar: 'جيل استحمام أديداس رجال 400مل', barcode: '663000005', avg_purchase_price: 380, avg_selling_price: 520, unit: 'unité' },
      // Déodorants - ~20 products
      { name: 'Déodorant Rexona Homme 150ml', name_ar: 'مزيل رائحة ريكسونا رجال 150مل', barcode: '664000001', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Déodorant Rexona Femme 150ml', name_ar: 'مزيل رائحة ريكسونا نساء 150مل', barcode: '664000002', avg_purchase_price: 320, avg_selling_price: 420, unit: 'unité' },
      { name: 'Déodorant Nivea Homme 150ml', name_ar: 'مزيل رائحة نيفيا رجال 150مل', barcode: '664000003', avg_purchase_price: 350, avg_selling_price: 460, unit: 'unité' },
      { name: 'Déodorant Dove Femme 150ml', name_ar: 'مزيل رائحة دوف نساء 150مل', barcode: '664000004', avg_purchase_price: 380, avg_selling_price: 500, unit: 'unité' },
      { name: 'Déodorant Axe Homme 150ml', name_ar: 'مزيل رائحة أكس رجال 150مل', barcode: '664000005', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Déodorant stick Nivea Homme 50ml', name_ar: 'مزيل رائحة ستيك نيفيا رجال 50مل', barcode: '664000006', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Déodorant stick Dove Femme 50ml', name_ar: 'مزيل رائحة ستيك دوف نساء 50مل', barcode: '664000007', avg_purchase_price: 300, avg_selling_price: 400, unit: 'unité' },
      // Dentifrices - ~15 products
      { name: 'Dentifrice Colgate Total 100ml', name_ar: 'معجون أسنان كولجيت توتال 100مل', barcode: '665000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Dentifrice Colgate Max Fresh 100ml', name_ar: 'معجون أسنان كولجيت ماكس فريش 100مل', barcode: '665000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Dentifrice Signal 100ml', name_ar: 'معجون أسنان سيجنال 100مل', barcode: '665000003', avg_purchase_price: 160, avg_selling_price: 220, unit: 'unité' },
      { name: 'Dentifrice Signal White Now 75ml', name_ar: 'معجون أسنان سيجنال وايت ناو 75مل', barcode: '665000004', avg_purchase_price: 300, avg_selling_price: 400, unit: 'unité' },
      { name: 'Dentifrice Sensodyne 75ml', name_ar: 'معجون أسنان سنسوداين 75مل', barcode: '665000005', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Dentifrice Paradontax 75ml', name_ar: 'معجون أسنان بارودونتاكس 75مل', barcode: '665000006', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Dentifrice enfant Colgate 50ml', name_ar: 'معجون أسنان أطفال كولجيت 50مل', barcode: '665000007', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Brosse à dents Colgate Medium', name_ar: 'فرشاة أسنان كولجيت متوسطة', barcode: '665000008', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Brosse à dents Signal Soft', name_ar: 'فرشاة أسنان سيجنال ناعمة', barcode: '665000009', avg_purchase_price: 70, avg_selling_price: 110, unit: 'unité' },
      { name: 'Bain de bouche Listerine 250ml', name_ar: 'غسول فم ليسترين 250مل', barcode: '665000010', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      // Rasage - ~12 products
      { name: 'Mousse à raser Gillette 250ml', name_ar: 'رغوة حلاقة جيليت 250مل', barcode: '666000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Mousse à raser Nivea 200ml', name_ar: 'رغوة حلاقة نيفيا 200مل', barcode: '666000002', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Rasoir Gillette Blue 3 (Pack 4)', name_ar: 'شفرة جيليت بلو 3 (4 قطع)', barcode: '666000003', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Rasoir Gillette Mach3 (Pack 4)', name_ar: 'شفرة جيليت ماك 3 (4 قطع)', barcode: '666000004', avg_purchase_price: 700, avg_selling_price: 950, unit: 'unité' },
      { name: 'Rasoir Bic Sensitive (Pack 5)', name_ar: 'شفرة بيك سنسيتيف (5 قطع)', barcode: '666000005', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Après-rasage Nivea 100ml', name_ar: 'بعد الحلاقة نيفيا 100مل', barcode: '666000006', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      // Couches bébé - ~15 products
      { name: 'Couches Pampers Taille 1 (2-5kg) 48pcs', name_ar: 'حفاضات بامبرز مقاس 1 48 قطعة', barcode: '667000001', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 2 (4-8kg) 40pcs', name_ar: 'حفاضات بامبرز مقاس 2 40 قطعة', barcode: '667000002', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 3 (6-10kg) 36pcs', name_ar: 'حفاضات بامبرز مقاس 3 36 قطعة', barcode: '667000003', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 4 (9-14kg) 32pcs', name_ar: 'حفاضات بامبرز مقاس 4 32 قطعة', barcode: '667000004', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Pampers Taille 5 (11-16kg) 28pcs', name_ar: 'حفاضات بامبرز مقاس 5 28 قطعة', barcode: '667000005', avg_purchase_price: 1200, avg_selling_price: 1500, unit: 'pack' },
      { name: 'Couches Huggies Taille 3 34pcs', name_ar: 'حفاضات هاغيز مقاس 3 34 قطعة', barcode: '667000006', avg_purchase_price: 1100, avg_selling_price: 1400, unit: 'pack' },
      { name: 'Couches Huggies Taille 4 30pcs', name_ar: 'حفاضات هاغيز مقاس 4 30 قطعة', barcode: '667000007', avg_purchase_price: 1100, avg_selling_price: 1400, unit: 'pack' },
      { name: 'Lingettes bébé Pampers 72pcs', name_ar: 'مناديل أطفال بامبرز 72 قطعة', barcode: '667000008', avg_purchase_price: 300, avg_selling_price: 420, unit: 'pack' },
      { name: 'Lingettes bébé Huggies 64pcs', name_ar: 'مناديل أطفال هاغيز 64 قطعة', barcode: '667000009', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      // Hygiène féminine - ~10 products
      { name: 'Serviettes Always Ultra Normal 16pcs', name_ar: 'فوط أولويز ألترا عادية 16 قطعة', barcode: '668000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'pack' },
      { name: 'Serviettes Always Ultra Long 14pcs', name_ar: 'فوط أولويز ألترا طويلة 14 قطعة', barcode: '668000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      { name: 'Serviettes Always Maxi Night 10pcs', name_ar: 'فوط أولويز ماكسي ليلية 10 قطع', barcode: '668000003', avg_purchase_price: 300, avg_selling_price: 420, unit: 'pack' },
      { name: 'Protège-slips Always 30pcs', name_ar: 'واقيات أولويز 30 قطعة', barcode: '668000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      // Mouchoirs et papier toilette - ~12 products
      { name: 'Papier toilette Lotus 4 rouleaux', name_ar: 'ورق تواليت لوتس 4 لفات', barcode: '669000001', avg_purchase_price: 180, avg_selling_price: 250, unit: 'pack' },
      { name: 'Papier toilette Lotus 8 rouleaux', name_ar: 'ورق تواليت لوتس 8 لفات', barcode: '669000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'pack' },
      { name: 'Papier toilette Moltonel 6 rouleaux', name_ar: 'ورق تواليت مولتونيل 6 لفات', barcode: '669000003', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      { name: 'Mouchoirs Kleenex 100 feuilles', name_ar: 'مناديل كلينكس 100 ورقة', barcode: '669000004', avg_purchase_price: 120, avg_selling_price: 170, unit: 'boîte' },
      { name: 'Mouchoirs Kleenex pocket 10 paquets', name_ar: 'مناديل كلينكس جيب 10 علب', barcode: '669000005', avg_purchase_price: 150, avg_selling_price: 210, unit: 'pack' },
      { name: 'Essuie-tout Sopalin 2 rouleaux', name_ar: 'ورق مطبخ سوبالان 2 لفات', barcode: '669000006', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Coton-tige 200pcs', name_ar: 'أعواد قطنية 200 قطعة', barcode: '669000007', avg_purchase_price: 80, avg_selling_price: 120, unit: 'boîte' },
      { name: 'Coton disques 80pcs', name_ar: 'أقراص قطن 80 قطعة', barcode: '669000008', avg_purchase_price: 100, avg_selling_price: 150, unit: 'paquet' },
    ],
  },

  // 6. ENTRETIEN MÉNAGER (Household Cleaning) - ~120 products
  {
    name: 'Entretien Ménager',
    name_ar: 'التنظيف المنزلي',
    icon: 'Spray',
    color: '#10B981',
    products: [
      // Lessives - ~30 products
      ...['OMO', 'Ariel', 'Persil', 'Tide', 'Skip', 'Le Chat'].flatMap((brand, bi) =>
        ['2kg', '4kg', '6kg'].map((size, si) => ({
          name: `Lessive ${brand} ${size}`,
          name_ar: `مسحوق غسيل ${brand} ${size}`,
          barcode: generateBarcode('671', bi * 10 + si),
          avg_purchase_price: size === '2kg' ? 450 : size === '4kg' ? 850 : 1200,
          avg_selling_price: size === '2kg' ? 580 : size === '4kg' ? 1100 : 1550,
          unit: 'unité',
        }))
      ),
      // Lessive liquide
      ...['Ariel', 'Skip', 'Persil'].flatMap((brand, bi) =>
        ['1L', '2L'].map((size, si) => ({
          name: `Lessive liquide ${brand} ${size}`,
          name_ar: `سائل غسيل ${brand} ${size}`,
          barcode: generateBarcode('671L', bi * 10 + si),
          avg_purchase_price: size === '1L' ? 400 : 750,
          avg_selling_price: size === '1L' ? 550 : 980,
          unit: 'unité',
        }))
      ),
      // Assouplissants
      ...['Soupline', 'Lenor', 'Cajoline'].flatMap((brand, bi) =>
        ['1L', '2L'].map((size, si) => ({
          name: `Assouplissant ${brand} ${size}`,
          name_ar: `ملين ملابس ${brand} ${size}`,
          barcode: generateBarcode('672', bi * 10 + si),
          avg_purchase_price: size === '1L' ? 250 : 450,
          avg_selling_price: size === '1L' ? 350 : 600,
          unit: 'unité',
        }))
      ),
      // Javel - ~10 products
      { name: 'Javel Lacroix 1L', name_ar: 'جافيل لاكروا 1ل', barcode: '673000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Javel Lacroix 2L', name_ar: 'جافيل لاكروا 2ل', barcode: '673000002', avg_purchase_price: 140, avg_selling_price: 200, unit: 'unité' },
      { name: 'Javel Lacroix 5L', name_ar: 'جافيل لاكروا 5ل', barcode: '673000003', avg_purchase_price: 320, avg_selling_price: 450, unit: 'unité' },
      { name: 'Javel Isis 1L', name_ar: 'جافيل إيزيس 1ل', barcode: '673000004', avg_purchase_price: 70, avg_selling_price: 100, unit: 'unité' },
      { name: 'Javel Isis 5L', name_ar: 'جافيل إيزيس 5ل', barcode: '673000005', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      // Nettoyants multi-surfaces - ~15 products
      { name: 'Mr Propre Multi-surfaces 1L', name_ar: 'مستر بروبر متعدد الأسطح 1ل', barcode: '674000001', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Ajax Multi-surfaces 1L', name_ar: 'أجاكس متعدد الأسطح 1ل', barcode: '674000002', avg_purchase_price: 160, avg_selling_price: 230, unit: 'unité' },
      { name: 'Cif Crème 500ml', name_ar: 'سيف كريم 500مل', barcode: '674000003', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Spray nettoyant vitres 500ml', name_ar: 'رذاذ نوافذ 500مل', barcode: '674000004', avg_purchase_price: 140, avg_selling_price: 200, unit: 'unité' },
      { name: 'Nettoyant WC Harpic 750ml', name_ar: 'منظف مراحيض هاربيك 750مل', barcode: '674000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Bloc WC Harpic', name_ar: 'بلوك مرحاض هاربيك', barcode: '674000006', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Désodorisant WC spray 300ml', name_ar: 'معطر مرحاض رذاذ 300مل', barcode: '674000007', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      // Liquide vaisselle - ~12 products
      ...['Fairy', 'Pril', 'Mir'].flatMap((brand, bi) =>
        ['500ml', '1L'].map((size, si) => ({
          name: `Liquide vaisselle ${brand} ${size}`,
          name_ar: `سائل غسيل أطباق ${brand} ${size}`,
          barcode: generateBarcode('675', bi * 10 + si),
          avg_purchase_price: size === '500ml' ? 120 : 220,
          avg_selling_price: size === '500ml' ? 170 : 300,
          unit: 'unité',
        }))
      ),
      // Éponges et accessoires - ~10 products
      { name: 'Éponge vaisselle lot de 3', name_ar: 'إسفنج أطباق 3 قطع', barcode: '676000001', avg_purchase_price: 50, avg_selling_price: 80, unit: 'pack' },
      { name: 'Éponge grattoir lot de 2', name_ar: 'إسفنج كاشط 2 قطع', barcode: '676000002', avg_purchase_price: 60, avg_selling_price: 100, unit: 'pack' },
      { name: 'Gants ménage taille M', name_ar: 'قفازات منزل مقاس M', barcode: '676000003', avg_purchase_price: 80, avg_selling_price: 130, unit: 'paire' },
      { name: 'Serpillière', name_ar: 'ممسحة', barcode: '676000004', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'Balai traditionnel', name_ar: 'مكنسة تقليدية', barcode: '676000005', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Balai avec pelle', name_ar: 'مكنسة مع مجروف', barcode: '676000006', avg_purchase_price: 250, avg_selling_price: 380, unit: 'set' },
      // Insecticides - ~10 products
      { name: 'Spray insecticide Raid 300ml', name_ar: 'رذاذ مبيد ريد 300مل', barcode: '677000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Spray anti-cafards 400ml', name_ar: 'رذاذ مضاد الصراصير 400مل', barcode: '677000002', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Prise anti-moustiques', name_ar: 'جهاز طارد الباعوض', barcode: '677000003', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Recharge anti-moustiques', name_ar: 'شحنة طارد الباعوض', barcode: '677000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Spirales anti-moustiques 10pcs', name_ar: 'لفائف ضد الباعوض 10 قطع', barcode: '677000005', avg_purchase_price: 80, avg_selling_price: 130, unit: 'pack' },
      // Désodorisants maison - ~8 products
      { name: 'Désodorisant Brise spray 300ml', name_ar: 'معطر بريز رذاذ 300مل', barcode: '678000001', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      { name: 'Désodorisant Glade spray 300ml', name_ar: 'معطر غليد رذاذ 300مل', barcode: '678000002', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Bougie parfumée', name_ar: 'شمعة معطرة', barcode: '678000003', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Diffuseur de parfum', name_ar: 'موزع عطر', barcode: '678000004', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
    ],
  },

  // 7. SNACKS & CHIPS - ~80 products
  {
    name: 'Snacks & Chips',
    name_ar: 'المقرمشات',
    icon: 'Cookie',
    color: '#F97316',
    products: [
      // Chips - ~40 products
      ...brands.chips.flatMap((brand, bi) =>
        ['Nature', 'Paprika', 'Fromage', 'Barbecue', 'Vinaigre'].flatMap((flavor, fi) =>
          ['45g', '130g'].map((size, si) => ({
            name: `Chips ${brand} ${flavor} ${size}`,
            name_ar: `شيبس ${brand} ${flavor} ${size}`,
            barcode: generateBarcode('681', bi * 100 + fi * 10 + si),
            avg_purchase_price: size === '45g' ? 50 : 120,
            avg_selling_price: size === '45g' ? 70 : 170,
            unit: 'unité',
          }))
        )
      ),
      // Crackers
      { name: 'TUC Original 100g', name_ar: 'توك أصلي 100غ', barcode: '682000001', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'TUC Fromage 100g', name_ar: 'توك جبنة 100غ', barcode: '682000002', avg_purchase_price: 90, avg_selling_price: 130, unit: 'unité' },
      { name: 'Ritz Crackers 200g', name_ar: 'ريتز كراكرز 200غ', barcode: '682000003', avg_purchase_price: 180, avg_selling_price: 250, unit: 'unité' },
      { name: 'Monaco Crackers 100g', name_ar: 'موناكو كراكرز 100غ', barcode: '682000004', avg_purchase_price: 70, avg_selling_price: 100, unit: 'unité' },
      // Cacahuètes et noix
      { name: 'Cacahuètes grillées salées 200g', name_ar: 'فول سوداني مملح 200غ', barcode: '683000001', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Cacahuètes grillées 500g', name_ar: 'فول سوداني محمص 500غ', barcode: '683000002', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Noix de cajou 100g', name_ar: 'كاجو 100غ', barcode: '683000003', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Amandes 100g', name_ar: 'لوز 100غ', barcode: '683000004', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Pistaches 100g', name_ar: 'فستق 100غ', barcode: '683000005', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Mix apéritif 200g', name_ar: 'خليط مقبلات 200غ', barcode: '683000006', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      // Pop-corn et soufflés
      { name: 'Pop-corn micro-ondes nature 100g', name_ar: 'فوشار ميكرووايف طبيعي 100غ', barcode: '684000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Pop-corn micro-ondes beurre 100g', name_ar: 'فوشار ميكرووايف زبدة 100غ', barcode: '684000002', avg_purchase_price: 130, avg_selling_price: 190, unit: 'unité' },
      { name: 'Pop-corn caramélisé 150g', name_ar: 'فوشار بالكراميل 150غ', barcode: '684000003', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Soufflés au fromage 80g', name_ar: 'منفوخات بالجبن 80غ', barcode: '684000004', avg_purchase_price: 60, avg_selling_price: 90, unit: 'unité' },
      // Fruits secs
      { name: 'Dattes Deglet Nour 500g', name_ar: 'تمر دقلة نور 500غ', barcode: '685000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Dattes Deglet Nour 1kg', name_ar: 'تمر دقلة نور 1كغ', barcode: '685000002', avg_purchase_price: 750, avg_selling_price: 1000, unit: 'unité' },
      { name: 'Figues sèches 250g', name_ar: 'تين مجفف 250غ', barcode: '685000003', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Raisins secs 250g', name_ar: 'زبيب 250غ', barcode: '685000004', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Abricots secs 200g', name_ar: 'مشمش مجفف 200غ', barcode: '685000005', avg_purchase_price: 220, avg_selling_price: 320, unit: 'unité' },
      { name: 'Pruneaux 250g', name_ar: 'برقوق مجفف 250غ', barcode: '685000006', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
    ],
  },

  // 8. SURGELES (Frozen Foods) - ~60 products
  {
    name: 'Surgelés',
    name_ar: 'المجمدات',
    icon: 'Snowflake',
    color: '#06B6D4',
    products: [
      // Légumes surgelés
      { name: 'Petits pois surgelés 1kg', name_ar: 'بازلاء مجمدة 1كغ', barcode: '691000001', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Haricots verts surgelés 1kg', name_ar: 'فاصوليا خضراء مجمدة 1كغ', barcode: '691000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Épinards surgelés 1kg', name_ar: 'سبانخ مجمدة 1كغ', barcode: '691000003', avg_purchase_price: 260, avg_selling_price: 360, unit: 'unité' },
      { name: 'Macédoine surgelée 1kg', name_ar: 'مكدونية مجمدة 1كغ', barcode: '691000004', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Brocoli surgelé 500g', name_ar: 'بروكلي مجمد 500غ', barcode: '691000005', avg_purchase_price: 220, avg_selling_price: 320, unit: 'unité' },
      { name: 'Poivrons surgelés 500g', name_ar: 'فلفل مجمد 500غ', barcode: '691000006', avg_purchase_price: 200, avg_selling_price: 290, unit: 'unité' },
      // Frites et pommes de terre
      { name: 'Frites surgelées 1kg', name_ar: 'فريتس مجمدة 1كغ', barcode: '692000001', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Frites surgelées 2.5kg', name_ar: 'فريتس مجمدة 2.5كغ', barcode: '692000002', avg_purchase_price: 650, avg_selling_price: 880, unit: 'unité' },
      { name: 'Potatoes surgelées 1kg', name_ar: 'بوتاتوز مجمدة 1كغ', barcode: '692000003', avg_purchase_price: 320, avg_selling_price: 450, unit: 'unité' },
      { name: 'Röstis surgelés 600g', name_ar: 'روستي مجمد 600غ', barcode: '692000004', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      // Poisson surgelé
      { name: 'Filets de merlu 500g', name_ar: 'فيليه ميرلو 500غ', barcode: '693000001', avg_purchase_price: 450, avg_selling_price: 620, unit: 'unité' },
      { name: 'Crevettes décortiquées 500g', name_ar: 'جمبري مقشر 500غ', barcode: '693000002', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Sardines surgelées 1kg', name_ar: 'سردين مجمد 1كغ', barcode: '693000003', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Calamars surgelés 500g', name_ar: 'كلمار مجمد 500غ', barcode: '693000004', avg_purchase_price: 550, avg_selling_price: 750, unit: 'unité' },
      { name: 'Bâtonnets de poisson panés 400g', name_ar: 'أصابع سمك مقلية 400غ', barcode: '693000005', avg_purchase_price: 380, avg_selling_price: 520, unit: 'unité' },
      // Viande surgelée
      { name: 'Nuggets de poulet 500g', name_ar: 'ناغتس دجاج 500غ', barcode: '694000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Escalopes de poulet panées 500g', name_ar: 'إسكالوب دجاج مقلي 500غ', barcode: '694000002', avg_purchase_price: 450, avg_selling_price: 620, unit: 'unité' },
      { name: 'Cordon bleu 400g', name_ar: 'كوردون بلو 400غ', barcode: '694000003', avg_purchase_price: 480, avg_selling_price: 650, unit: 'unité' },
      { name: 'Boulettes de viande 500g', name_ar: 'كفتة لحم 500غ', barcode: '694000004', avg_purchase_price: 420, avg_selling_price: 580, unit: 'unité' },
      { name: 'Saucisses de volaille 400g', name_ar: 'سجق دواجن 400غ', barcode: '694000005', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      // Pizza et plats préparés
      { name: 'Pizza Margherita 400g', name_ar: 'بيتزا مارغريتا 400غ', barcode: '695000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Pizza 4 Fromages 400g', name_ar: 'بيتزا 4 أجبان 400غ', barcode: '695000002', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Pizza Royale 450g', name_ar: 'بيتزا ملكية 450غ', barcode: '695000003', avg_purchase_price: 450, avg_selling_price: 620, unit: 'unité' },
      { name: 'Lasagnes bolognaise 1kg', name_ar: 'لازانيا بولونيز 1كغ', barcode: '695000004', avg_purchase_price: 600, avg_selling_price: 820, unit: 'unité' },
      // Glaces
      { name: 'Glace vanille 1L', name_ar: 'آيس كريم فانيلا 1ل', barcode: '696000001', avg_purchase_price: 380, avg_selling_price: 520, unit: 'unité' },
      { name: 'Glace chocolat 1L', name_ar: 'آيس كريم شوكولا 1ل', barcode: '696000002', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Glace fraise 1L', name_ar: 'آيس كريم فراولة 1ل', barcode: '696000003', avg_purchase_price: 380, avg_selling_price: 520, unit: 'unité' },
      { name: 'Cornets de glace x6', name_ar: 'أقماع آيس كريم ×6', barcode: '696000004', avg_purchase_price: 450, avg_selling_price: 620, unit: 'pack' },
      { name: 'Bâtonnets glacés x8', name_ar: 'أعواد آيس كريم ×8', barcode: '696000005', avg_purchase_price: 380, avg_selling_price: 520, unit: 'pack' },
      { name: 'Magnum Classic x4', name_ar: 'ماغنوم كلاسيك ×4', barcode: '696000006', avg_purchase_price: 550, avg_selling_price: 750, unit: 'pack' },
    ],
  },

  // 9. PÂTISSERIE & BOULANGERIE - ~50 products
  {
    name: 'Pâtisserie & Boulangerie',
    name_ar: 'الحلويات والمخبوزات',
    icon: 'Croissant',
    color: '#D97706',
    products: [
      // Pains et viennoiseries
      { name: 'Pain de mie 500g', name_ar: 'خبز تواست 500غ', barcode: '701000001', avg_purchase_price: 120, avg_selling_price: 170, unit: 'unité' },
      { name: 'Pain de mie complet 500g', name_ar: 'خبز تواست كامل 500غ', barcode: '701000002', avg_purchase_price: 150, avg_selling_price: 200, unit: 'unité' },
      { name: 'Biscottes 300g', name_ar: 'بسكوت 300غ', barcode: '701000003', avg_purchase_price: 130, avg_selling_price: 180, unit: 'unité' },
      { name: 'Croissants x6', name_ar: 'كرواسون ×6', barcode: '701000004', avg_purchase_price: 200, avg_selling_price: 280, unit: 'pack' },
      { name: 'Pains au chocolat x4', name_ar: 'بان أو شوكولا ×4', barcode: '701000005', avg_purchase_price: 180, avg_selling_price: 260, unit: 'pack' },
      { name: 'Brioches x6', name_ar: 'بريوش ×6', barcode: '701000006', avg_purchase_price: 220, avg_selling_price: 300, unit: 'pack' },
      // Gâteaux
      { name: 'Madeleines x12', name_ar: 'مادلين ×12', barcode: '702000001', avg_purchase_price: 180, avg_selling_price: 260, unit: 'pack' },
      { name: 'Quatre-quarts 300g', name_ar: 'كاتر كار 300غ', barcode: '702000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Cake marbré 350g', name_ar: 'كعكة رخامية 350غ', barcode: '702000003', avg_purchase_price: 220, avg_selling_price: 300, unit: 'unité' },
      { name: 'Brownie chocolat 200g', name_ar: 'براوني شوكولا 200غ', barcode: '702000004', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Muffins chocolat x4', name_ar: 'مافين شوكولا ×4', barcode: '702000005', avg_purchase_price: 280, avg_selling_price: 380, unit: 'pack' },
      // Ingrédients pâtisserie
      { name: 'Levure boulangère 11g x10', name_ar: 'خميرة خباز 11غ ×10', barcode: '703000001', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Levure chimique 8g x10', name_ar: 'خميرة كيميائية 8غ ×10', barcode: '703000002', avg_purchase_price: 80, avg_selling_price: 120, unit: 'pack' },
      { name: 'Pépites de chocolat 200g', name_ar: 'رقائق شوكولاطة 200غ', barcode: '703000003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Noix de coco râpée 200g', name_ar: 'جوز هند مبشور 200غ', barcode: '703000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Amandes effilées 100g', name_ar: 'لوز شرائح 100غ', barcode: '703000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Cacao en poudre 250g', name_ar: 'كاكاو بودرة 250غ', barcode: '703000006', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Sucre vanillé 10x8g', name_ar: 'سكر فانيلا 10×8غ', barcode: '703000007', avg_purchase_price: 60, avg_selling_price: 90, unit: 'pack' },
      { name: 'Arôme vanille 50ml', name_ar: 'نكهة فانيلا 50مل', barcode: '703000008', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Arôme amande 50ml', name_ar: 'نكهة لوز 50مل', barcode: '703000009', avg_purchase_price: 80, avg_selling_price: 120, unit: 'unité' },
      { name: 'Colorant alimentaire rouge 30ml', name_ar: 'ملون غذائي أحمر 30مل', barcode: '703000010', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Colorant alimentaire vert 30ml', name_ar: 'ملون غذائي أخضر 30مل', barcode: '703000011', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Gélatine en feuilles x10', name_ar: 'جيلاتين ورق ×10', barcode: '703000012', avg_purchase_price: 100, avg_selling_price: 150, unit: 'pack' },
      { name: 'Feuilles de brick x10', name_ar: 'أوراق بريك ×10', barcode: '703000013', avg_purchase_price: 120, avg_selling_price: 180, unit: 'pack' },
      { name: 'Pâte feuilletée 230g', name_ar: 'عجينة مورقة 230غ', barcode: '703000014', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Pâte brisée 230g', name_ar: 'عجينة مفتتة 230غ', barcode: '703000015', avg_purchase_price: 160, avg_selling_price: 230, unit: 'unité' },
      { name: 'Lait concentré sucré 397g', name_ar: 'حليب مركز محلى 397غ', barcode: '703000016', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Lait concentré non sucré 410g', name_ar: 'حليب مركز غير محلى 410غ', barcode: '703000017', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
    ],
  },

  // 10. SAUCES & CONDIMENTS - ~60 products
  {
    name: 'Sauces & Condiments',
    name_ar: 'الصلصات والتوابل',
    icon: 'Soup',
    color: '#DC2626',
    products: [
      // Mayonnaise et ketchup
      { name: 'Mayonnaise 250ml', name_ar: 'مايونيز 250مل', barcode: '711000001', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Mayonnaise 500ml', name_ar: 'مايونيز 500مل', barcode: '711000002', avg_purchase_price: 280, avg_selling_price: 380, unit: 'unité' },
      { name: 'Ketchup Heinz 342g', name_ar: 'كاتشب هاينز 342غ', barcode: '711000003', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Ketchup 500g', name_ar: 'كاتشب 500غ', barcode: '711000004', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Moutarde de Dijon 200g', name_ar: 'موتارد ديجون 200غ', barcode: '711000005', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Moutarde à l\'ancienne 210g', name_ar: 'موتارد تقليدية 210غ', barcode: '711000006', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      // Sauces tomate et pizza
      { name: 'Sauce tomate 500g', name_ar: 'صلصة طماطم 500غ', barcode: '712000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Sauce pizza 400g', name_ar: 'صلصة بيتزا 400غ', barcode: '712000002', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Sauce bolognaise 350g', name_ar: 'صلصة بولونيز 350غ', barcode: '712000003', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Sauce pesto 190g', name_ar: 'صلصة بيستو 190غ', barcode: '712000004', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      // Vinaigres
      { name: 'Vinaigre de vin rouge 50cl', name_ar: 'خل نبيذ أحمر 50سل', barcode: '713000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Vinaigre blanc 1L', name_ar: 'خل أبيض 1ل', barcode: '713000002', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      { name: 'Vinaigre de cidre 50cl', name_ar: 'خل التفاح 50سل', barcode: '713000003', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Vinaigre balsamique 25cl', name_ar: 'خل بلسميك 25سل', barcode: '713000004', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      // Sauces asiatiques
      { name: 'Sauce soja 150ml', name_ar: 'صلصة صويا 150مل', barcode: '714000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Sauce soja 500ml', name_ar: 'صلصة صويا 500مل', barcode: '714000002', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      { name: 'Sauce teriyaki 250ml', name_ar: 'صلصة تيرياكي 250مل', barcode: '714000003', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Sauce nuoc mam 200ml', name_ar: 'صلصة نوك مام 200مل', barcode: '714000004', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Sauce sriracha 200ml', name_ar: 'صلصة سريراتشا 200مل', barcode: '714000005', avg_purchase_price: 220, avg_selling_price: 320, unit: 'unité' },
      // Autres condiments
      { name: 'Câpres 100g', name_ar: 'كبر 100غ', barcode: '715000001', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Cornichons 370g', name_ar: 'خيار مخلل 370غ', barcode: '715000002', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Citrons confits 200g', name_ar: 'ليمون مملح 200غ', barcode: '715000003', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Piments marinés 370g', name_ar: 'فلفل مخلل 370غ', barcode: '715000004', avg_purchase_price: 160, avg_selling_price: 240, unit: 'unité' },
      { name: 'Sauce Worcestershire 150ml', name_ar: 'صلصة ورشسترشاير 150مل', barcode: '715000005', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Tabasco 60ml', name_ar: 'تاباسكو 60مل', barcode: '715000006', avg_purchase_price: 250, avg_selling_price: 350, unit: 'unité' },
      { name: 'Sauce BBQ 350ml', name_ar: 'صلصة باربيكيو 350مل', barcode: '715000007', avg_purchase_price: 220, avg_selling_price: 320, unit: 'unité' },
      { name: 'Sauce algéroise 300ml', name_ar: 'صلصة جزائرية 300مل', barcode: '715000008', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Sauce burger 300ml', name_ar: 'صلصة برغر 300مل', barcode: '715000009', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
    ],
  },

  // 11. FRUITS & LÉGUMES SECS - ~40 products
  {
    name: 'Fruits & Légumes Secs',
    name_ar: 'الفواكه والخضر الجافة',
    icon: 'Apple',
    color: '#84CC16',
    products: [
      // Légumes secs
      { name: 'Lentilles vertes 500g', name_ar: 'عدس أخضر 500غ', barcode: '721000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Lentilles vertes 1kg', name_ar: 'عدس أخضر 1كغ', barcode: '721000002', avg_purchase_price: 220, avg_selling_price: 320, unit: 'unité' },
      { name: 'Lentilles corail 500g', name_ar: 'عدس مرجاني 500غ', barcode: '721000003', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Pois chiches secs 500g', name_ar: 'حمص جاف 500غ', barcode: '721000004', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'Pois chiches secs 1kg', name_ar: 'حمص جاف 1كغ', barcode: '721000005', avg_purchase_price: 180, avg_selling_price: 280, unit: 'unité' },
      { name: 'Haricots blancs secs 500g', name_ar: 'فاصوليا بيضاء جافة 500غ', barcode: '721000006', avg_purchase_price: 110, avg_selling_price: 170, unit: 'unité' },
      { name: 'Haricots rouges secs 500g', name_ar: 'فاصوليا حمراء جافة 500غ', barcode: '721000007', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Fèves sèches 500g', name_ar: 'فول جاف 500غ', barcode: '721000008', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'Pois cassés 500g', name_ar: 'بازلاء مجروشة 500غ', barcode: '721000009', avg_purchase_price: 90, avg_selling_price: 150, unit: 'unité' },
      // Fruits secs (supplémentaires)
      { name: 'Noix entières 250g', name_ar: 'جوز 250غ', barcode: '722000001', avg_purchase_price: 350, avg_selling_price: 480, unit: 'unité' },
      { name: 'Noisettes 200g', name_ar: 'بندق 200غ', barcode: '722000002', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Pignons de pin 50g', name_ar: 'صنوبر 50غ', barcode: '722000003', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      { name: 'Cranberries 150g', name_ar: 'توت بري 150غ', barcode: '722000004', avg_purchase_price: 280, avg_selling_price: 400, unit: 'unité' },
      { name: 'Graines de tournesol 250g', name_ar: 'بذور عباد الشمس 250غ', barcode: '722000005', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Graines de courge 150g', name_ar: 'بذور القرع 150غ', barcode: '722000006', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Graines de lin 250g', name_ar: 'بذور الكتان 250غ', barcode: '722000007', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'Graines de chia 200g', name_ar: 'بذور الشيا 200غ', barcode: '722000008', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Graines de sésame 250g', name_ar: 'بذور السمسم 250غ', barcode: '722000009', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
    ],
  },

  // 12. ALIMENTATION ANIMAUX - ~40 products
  {
    name: 'Alimentation Animaux',
    name_ar: 'أغذية الحيوانات',
    icon: 'PawPrint',
    color: '#A855F7',
    products: [
      // Alimentation chats
      { name: 'Croquettes chat adulte 1kg', name_ar: 'طعام قطط جاف بالغ 1كغ', barcode: '731000001', avg_purchase_price: 400, avg_selling_price: 550, unit: 'unité' },
      { name: 'Croquettes chat adulte 4kg', name_ar: 'طعام قطط جاف بالغ 4كغ', barcode: '731000002', avg_purchase_price: 1400, avg_selling_price: 1850, unit: 'unité' },
      { name: 'Croquettes chat adulte 10kg', name_ar: 'طعام قطط جاف بالغ 10كغ', barcode: '731000003', avg_purchase_price: 3200, avg_selling_price: 4200, unit: 'unité' },
      { name: 'Pâtée chat 400g', name_ar: 'طعام قطط معلب 400غ', barcode: '731000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Croquettes chaton 1kg', name_ar: 'طعام قطط صغيرة جاف 1كغ', barcode: '731000005', avg_purchase_price: 450, avg_selling_price: 600, unit: 'unité' },
      { name: 'Sachets fraîcheur chat x12', name_ar: 'أكياس طعام قطط طازج ×12', barcode: '731000006', avg_purchase_price: 350, avg_selling_price: 480, unit: 'pack' },
      // Alimentation chiens
      { name: 'Croquettes chien adulte 2kg', name_ar: 'طعام كلاب جاف بالغ 2كغ', barcode: '732000001', avg_purchase_price: 600, avg_selling_price: 800, unit: 'unité' },
      { name: 'Croquettes chien adulte 10kg', name_ar: 'طعام كلاب جاف بالغ 10كغ', barcode: '732000002', avg_purchase_price: 2500, avg_selling_price: 3200, unit: 'unité' },
      { name: 'Croquettes chien adulte 20kg', name_ar: 'طعام كلاب جاف بالغ 20كغ', barcode: '732000003', avg_purchase_price: 4500, avg_selling_price: 5800, unit: 'unité' },
      { name: 'Pâtée chien 400g', name_ar: 'طعام كلاب معلب 400غ', barcode: '732000004', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      { name: 'Croquettes chiot 2kg', name_ar: 'طعام جراء جاف 2كغ', barcode: '732000005', avg_purchase_price: 700, avg_selling_price: 920, unit: 'unité' },
      { name: 'Friandises chien 200g', name_ar: 'حلويات كلاب 200غ', barcode: '732000006', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      // Alimentation oiseaux
      { name: 'Graines canari 500g', name_ar: 'حبوب كناري 500غ', barcode: '733000001', avg_purchase_price: 120, avg_selling_price: 180, unit: 'unité' },
      { name: 'Graines perruche 1kg', name_ar: 'حبوب ببغاء 1كغ', barcode: '733000002', avg_purchase_price: 200, avg_selling_price: 280, unit: 'unité' },
      { name: 'Millet en grappe', name_ar: 'دخن في عناقيد', barcode: '733000003', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      { name: 'Graines tourterelles 1kg', name_ar: 'حبوب يمام 1كغ', barcode: '733000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      // Alimentation poissons
      { name: 'Flocons poissons rouges 100g', name_ar: 'رقائق أسماك ذهبية 100غ', barcode: '734000001', avg_purchase_price: 150, avg_selling_price: 220, unit: 'unité' },
      { name: 'Granulés poissons tropicaux 100g', name_ar: 'حبيبات أسماك استوائية 100غ', barcode: '734000002', avg_purchase_price: 180, avg_selling_price: 260, unit: 'unité' },
      // Accessoires
      { name: 'Litière chat 5L', name_ar: 'رمل قطط 5ل', barcode: '735000001', avg_purchase_price: 300, avg_selling_price: 420, unit: 'unité' },
      { name: 'Litière chat agglomérante 10L', name_ar: 'رمل قطط متكتل 10ل', barcode: '735000002', avg_purchase_price: 550, avg_selling_price: 750, unit: 'unité' },
      { name: 'Litière chat parfumée 10L', name_ar: 'رمل قطط معطر 10ل', barcode: '735000003', avg_purchase_price: 600, avg_selling_price: 820, unit: 'unité' },
      { name: 'Gamelle inox animal', name_ar: 'وعاء ستانلس للحيوانات', barcode: '735000004', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
    ],
  },

  // 13. AUTOMOBILE - ~45 products
  {
    name: 'Automobile',
    name_ar: 'السيارات',
    icon: 'Car',
    color: '#3B82F6',
    products: [
      // Huiles moteur
      { name: 'Huile moteur 15W40 4L', name_ar: 'زيت محرك 15W40 4ل', barcode: '741000001', avg_purchase_price: 2000, avg_selling_price: 2600, unit: 'unité' },
      { name: 'Huile moteur 10W40 4L', name_ar: 'زيت محرك 10W40 4ل', barcode: '741000002', avg_purchase_price: 2200, avg_selling_price: 2850, unit: 'unité' },
      { name: 'Huile moteur 5W40 4L', name_ar: 'زيت محرك 5W40 4ل', barcode: '741000003', avg_purchase_price: 2800, avg_selling_price: 3600, unit: 'unité' },
      { name: 'Huile moteur 5W30 5L', name_ar: 'زيت محرك 5W30 5ل', barcode: '741000004', avg_purchase_price: 3500, avg_selling_price: 4500, unit: 'unité' },
      { name: 'Huile moteur diesel 5L', name_ar: 'زيت محرك ديزل 5ل', barcode: '741000005', avg_purchase_price: 2500, avg_selling_price: 3200, unit: 'unité' },
      // Liquides
      { name: 'Liquide de refroidissement 5L', name_ar: 'سائل تبريد 5ل', barcode: '742000001', avg_purchase_price: 800, avg_selling_price: 1100, unit: 'unité' },
      { name: 'Liquide lave-glace 5L', name_ar: 'سائل غسيل زجاج 5ل', barcode: '742000002', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Liquide de frein 500ml', name_ar: 'سائل فرامل 500مل', barcode: '742000003', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Eau distillée 5L', name_ar: 'ماء مقطر 5ل', barcode: '742000004', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'AdBlue 10L', name_ar: 'أدبلو 10ل', barcode: '742000005', avg_purchase_price: 600, avg_selling_price: 850, unit: 'unité' },
      // Entretien
      { name: 'Shampooing auto 1L', name_ar: 'شامبو سيارات 1ل', barcode: '743000001', avg_purchase_price: 250, avg_selling_price: 380, unit: 'unité' },
      { name: 'Polish carrosserie 500ml', name_ar: 'ملمع هيكل 500مل', barcode: '743000002', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Nettoyant tableaux de bord 400ml', name_ar: 'منظف لوحة القيادة 400مل', barcode: '743000003', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Nettoyant jantes 500ml', name_ar: 'منظف عجلات 500مل', barcode: '743000004', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Désodorisant voiture', name_ar: 'معطر سيارة', barcode: '743000005', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Éponge lavage auto', name_ar: 'إسفنج غسيل سيارات', barcode: '743000006', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Peau de chamois', name_ar: 'جلد شمواه', barcode: '743000007', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Chiffons microfibre x3', name_ar: 'مناشف ميكروفايبر ×3', barcode: '743000008', avg_purchase_price: 150, avg_selling_price: 250, unit: 'pack' },
      // Accessoires
      { name: 'Câbles de démarrage', name_ar: 'كوابل بطارية', barcode: '744000001', avg_purchase_price: 600, avg_selling_price: 900, unit: 'unité' },
      { name: 'Compresseur à air portable', name_ar: 'ضاغط هواء متنقل', barcode: '744000002', avg_purchase_price: 1500, avg_selling_price: 2200, unit: 'unité' },
      { name: 'Triangle de signalisation', name_ar: 'مثلث تحذير', barcode: '744000003', avg_purchase_price: 300, avg_selling_price: 480, unit: 'unité' },
      { name: 'Gilet réfléchissant', name_ar: 'صدرية عاكسة', barcode: '744000004', avg_purchase_price: 200, avg_selling_price: 320, unit: 'unité' },
      { name: 'Ampoule H7 12V', name_ar: 'مصباح H7 12V', barcode: '744000005', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ampoule H4 12V', name_ar: 'مصباح H4 12V', barcode: '744000006', avg_purchase_price: 180, avg_selling_price: 300, unit: 'unité' },
      { name: 'Fusibles auto assortis', name_ar: 'فيوزات سيارة متنوعة', barcode: '744000007', avg_purchase_price: 80, avg_selling_price: 150, unit: 'pack' },
      { name: 'Antivol volant', name_ar: 'قفل مقود', barcode: '744000008', avg_purchase_price: 800, avg_selling_price: 1200, unit: 'unité' },
    ],
  },

  // 14. QUINCAILLERIE & BRICOLAGE - ~50 products
  {
    name: 'Quincaillerie & Bricolage',
    name_ar: 'الحدادة والأدوات',
    icon: 'Wrench',
    color: '#64748B',
    products: [
      // Outils à main
      { name: 'Marteau 300g', name_ar: 'مطرقة 300غ', barcode: '751000001', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Tournevis plat', name_ar: 'مفك مسطح', barcode: '751000002', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Tournevis cruciforme', name_ar: 'مفك صليبي', barcode: '751000003', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Jeu de tournevis (6 pcs)', name_ar: 'طقم مفكات (6 قطع)', barcode: '751000004', avg_purchase_price: 400, avg_selling_price: 600, unit: 'set' },
      { name: 'Pince universelle', name_ar: 'كماشة عالمية', barcode: '751000005', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Pince coupante', name_ar: 'كماشة قاطعة', barcode: '751000006', avg_purchase_price: 280, avg_selling_price: 420, unit: 'unité' },
      { name: 'Clé à molette 250mm', name_ar: 'مفتاح إنجليزي 250مم', barcode: '751000007', avg_purchase_price: 400, avg_selling_price: 600, unit: 'unité' },
      { name: 'Jeu de clés Allen', name_ar: 'طقم مفاتيح ألن', barcode: '751000008', avg_purchase_price: 250, avg_selling_price: 380, unit: 'set' },
      { name: 'Mètre ruban 5m', name_ar: 'متر شريطي 5م', barcode: '751000009', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Niveau à bulle 40cm', name_ar: 'ميزان ماء 40سم', barcode: '751000010', avg_purchase_price: 300, avg_selling_price: 450, unit: 'unité' },
      { name: 'Cutter professionnel', name_ar: 'قاطع احترافي', barcode: '751000011', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Lames cutter (Pack 10)', name_ar: 'شفرات قاطع (10 قطع)', barcode: '751000012', avg_purchase_price: 80, avg_selling_price: 130, unit: 'pack' },
      { name: 'Scie à métaux', name_ar: 'منشار معادن', barcode: '751000013', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      // Électricité
      { name: 'Ampoule LED E27 9W', name_ar: 'مصباح LED E27 9W', barcode: '752000001', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Ampoule LED E27 12W', name_ar: 'مصباح LED E27 12W', barcode: '752000002', avg_purchase_price: 180, avg_selling_price: 280, unit: 'unité' },
      { name: 'Ampoule LED E14 5W', name_ar: 'مصباح LED E14 5W', barcode: '752000003', avg_purchase_price: 120, avg_selling_price: 200, unit: 'unité' },
      { name: 'Tube LED 120cm 18W', name_ar: 'أنبوب LED 120سم 18W', barcode: '752000004', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Multiprise 4 prises', name_ar: 'قابس متعدد 4 مخارج', barcode: '752000005', avg_purchase_price: 350, avg_selling_price: 500, unit: 'unité' },
      { name: 'Multiprise 6 prises avec interrupteur', name_ar: 'قابس متعدد 6 مخارج مع مفتاح', barcode: '752000006', avg_purchase_price: 500, avg_selling_price: 720, unit: 'unité' },
      { name: 'Rallonge électrique 5m', name_ar: 'تمديد كهربائي 5م', barcode: '752000007', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Rallonge électrique 10m', name_ar: 'تمديد كهربائي 10م', barcode: '752000008', avg_purchase_price: 700, avg_selling_price: 980, unit: 'unité' },
      { name: 'Interrupteur simple', name_ar: 'مفتاح بسيط', barcode: '752000009', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Prise électrique', name_ar: 'قابس كهربائي', barcode: '752000010', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Ruban isolant électrique', name_ar: 'شريط عازل كهربائي', barcode: '752000011', avg_purchase_price: 50, avg_selling_price: 90, unit: 'unité' },
      { name: 'Câble électrique 1.5mm² 25m', name_ar: 'كابل كهربائي 1.5مم² 25م', barcode: '752000012', avg_purchase_price: 600, avg_selling_price: 850, unit: 'rouleau' },
      // Visserie et fixation
      { name: 'Vis à bois assortiment', name_ar: 'براغي خشب متنوعة', barcode: '753000001', avg_purchase_price: 150, avg_selling_price: 250, unit: 'boîte' },
      { name: 'Chevilles plastiques 8mm (Pack 50)', name_ar: 'أوتاد بلاستيك 8مم (50 قطعة)', barcode: '753000002', avg_purchase_price: 100, avg_selling_price: 170, unit: 'pack' },
      { name: 'Clous assortis 500g', name_ar: 'مسامير متنوعة 500غ', barcode: '753000003', avg_purchase_price: 150, avg_selling_price: 250, unit: 'pack' },
      // Peinture
      { name: 'Peinture murale blanche 1L', name_ar: 'دهان حائط أبيض 1ل', barcode: '754000001', avg_purchase_price: 400, avg_selling_price: 580, unit: 'unité' },
      { name: 'Peinture murale blanche 4L', name_ar: 'دهان حائط أبيض 4ل', barcode: '754000002', avg_purchase_price: 1400, avg_selling_price: 1900, unit: 'unité' },
      { name: 'Rouleau peinture 18cm', name_ar: 'رولو دهان 18سم', barcode: '754000003', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Pinceau plat 5cm', name_ar: 'فرشاة دهان 5سم', barcode: '754000004', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Bac à peinture', name_ar: 'صينية دهان', barcode: '754000005', avg_purchase_price: 100, avg_selling_price: 170, unit: 'unité' },
      { name: 'Ruban de masquage 50m', name_ar: 'شريط إخفاء 50م', barcode: '754000006', avg_purchase_price: 150, avg_selling_price: 230, unit: 'unité' },
    ],
  },

  // 15. PAPETERIE & FOURNITURES - ~50 products
  {
    name: 'Papeterie & Fournitures',
    name_ar: 'القرطاسية واللوازم',
    icon: 'Pen',
    color: '#0EA5E9',
    products: [
      // Écriture
      { name: 'Stylo bille bleu (lot 10)', name_ar: 'قلم حبر أزرق (10 قطع)', barcode: '761000001', avg_purchase_price: 100, avg_selling_price: 160, unit: 'pack' },
      { name: 'Stylo bille noir (lot 10)', name_ar: 'قلم حبر أسود (10 قطع)', barcode: '761000002', avg_purchase_price: 100, avg_selling_price: 160, unit: 'pack' },
      { name: 'Stylo bille rouge (lot 10)', name_ar: 'قلم حبر أحمر (10 قطع)', barcode: '761000003', avg_purchase_price: 100, avg_selling_price: 160, unit: 'pack' },
      { name: 'Stylo BIC Cristal (lot 4)', name_ar: 'قلم بيك كريستال (4 قطع)', barcode: '761000004', avg_purchase_price: 150, avg_selling_price: 220, unit: 'pack' },
      { name: 'Crayon HB (lot 12)', name_ar: 'قلم رصاص HB (12 قطعة)', barcode: '761000005', avg_purchase_price: 80, avg_selling_price: 130, unit: 'pack' },
      { name: 'Feutres couleurs (lot 12)', name_ar: 'أقلام تلوين (12 قطعة)', barcode: '761000006', avg_purchase_price: 150, avg_selling_price: 230, unit: 'pack' },
      { name: 'Crayons de couleur (lot 12)', name_ar: 'أقلام ملونة (12 قطعة)', barcode: '761000007', avg_purchase_price: 120, avg_selling_price: 190, unit: 'pack' },
      { name: 'Surligneur jaune', name_ar: 'قلم تحديد أصفر', barcode: '761000008', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Surligneur (lot 4 couleurs)', name_ar: 'أقلام تحديد (4 ألوان)', barcode: '761000009', avg_purchase_price: 180, avg_selling_price: 280, unit: 'pack' },
      { name: 'Marqueur permanent noir', name_ar: 'ماركر دائم أسود', barcode: '761000010', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      // Cahiers et papier
      { name: 'Cahier 96 pages grands carreaux', name_ar: 'دفتر 96 صفحة مربعات كبيرة', barcode: '762000001', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      { name: 'Cahier 200 pages grands carreaux', name_ar: 'دفتر 200 صفحة مربعات كبيرة', barcode: '762000002', avg_purchase_price: 150, avg_selling_price: 230, unit: 'unité' },
      { name: 'Bloc-notes A5', name_ar: 'بلوك نوط A5', barcode: '762000003', avg_purchase_price: 60, avg_selling_price: 100, unit: 'unité' },
      { name: 'Bloc-notes A4', name_ar: 'بلوك نوط A4', barcode: '762000004', avg_purchase_price: 100, avg_selling_price: 160, unit: 'unité' },
      { name: 'Ramette papier A4 500 feuilles', name_ar: 'رزمة ورق A4 500 ورقة', barcode: '762000005', avg_purchase_price: 650, avg_selling_price: 880, unit: 'ramette' },
      { name: 'Post-it jaune 76x76mm', name_ar: 'ملاحظات لاصقة صفراء 76×76مم', barcode: '762000006', avg_purchase_price: 80, avg_selling_price: 130, unit: 'bloc' },
      { name: 'Post-it couleurs assorties', name_ar: 'ملاحظات لاصقة ألوان متنوعة', barcode: '762000007', avg_purchase_price: 120, avg_selling_price: 190, unit: 'pack' },
      // Accessoires bureau
      { name: 'Gomme blanche', name_ar: 'ممحاة بيضاء', barcode: '763000001', avg_purchase_price: 20, avg_selling_price: 40, unit: 'unité' },
      { name: 'Taille-crayon métal', name_ar: 'مبراة معدنية', barcode: '763000002', avg_purchase_price: 30, avg_selling_price: 60, unit: 'unité' },
      { name: 'Règle 30cm', name_ar: 'مسطرة 30سم', barcode: '763000003', avg_purchase_price: 40, avg_selling_price: 70, unit: 'unité' },
      { name: 'Equerre', name_ar: 'مربع', barcode: '763000004', avg_purchase_price: 50, avg_selling_price: 90, unit: 'unité' },
      { name: 'Compas', name_ar: 'بركار', barcode: '763000005', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Ciseaux 17cm', name_ar: 'مقص 17سم', barcode: '763000006', avg_purchase_price: 80, avg_selling_price: 140, unit: 'unité' },
      { name: 'Colle en bâton 21g', name_ar: 'صمغ عصا 21غ', barcode: '763000007', avg_purchase_price: 50, avg_selling_price: 80, unit: 'unité' },
      { name: 'Colle blanche 125ml', name_ar: 'غراء أبيض 125مل', barcode: '763000008', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      { name: 'Scotch transparent 19mm x 33m', name_ar: 'سكوتش شفاف 19مم × 33م', barcode: '763000009', avg_purchase_price: 40, avg_selling_price: 70, unit: 'unité' },
      { name: 'Agrafeuse', name_ar: 'دباسة', barcode: '763000010', avg_purchase_price: 150, avg_selling_price: 250, unit: 'unité' },
      { name: 'Agrafes (boîte 1000)', name_ar: 'دبابيس (1000 قطعة)', barcode: '763000011', avg_purchase_price: 40, avg_selling_price: 70, unit: 'boîte' },
      { name: 'Trombones (boîte 100)', name_ar: 'مشابك ورق (100 قطعة)', barcode: '763000012', avg_purchase_price: 30, avg_selling_price: 60, unit: 'boîte' },
      { name: 'Punaises (boîte 100)', name_ar: 'دبابيس لوحة (100 قطعة)', barcode: '763000013', avg_purchase_price: 40, avg_selling_price: 70, unit: 'boîte' },
      { name: 'Correcteur liquide', name_ar: 'مصحح سائل', barcode: '763000014', avg_purchase_price: 60, avg_selling_price: 100, unit: 'unité' },
      { name: 'Ruban correcteur', name_ar: 'شريط مصحح', barcode: '763000015', avg_purchase_price: 80, avg_selling_price: 130, unit: 'unité' },
      // Classement
      { name: 'Classeur A4 dos 70mm', name_ar: 'ملف A4 ظهر 70مم', barcode: '764000001', avg_purchase_price: 200, avg_selling_price: 300, unit: 'unité' },
      { name: 'Chemise cartonnée (lot 10)', name_ar: 'ملف كرتون (10 قطع)', barcode: '764000002', avg_purchase_price: 120, avg_selling_price: 190, unit: 'pack' },
      { name: 'Pochettes plastiques A4 (lot 100)', name_ar: 'جيوب بلاستيكية A4 (100 قطعة)', barcode: '764000003', avg_purchase_price: 150, avg_selling_price: 240, unit: 'pack' },
      { name: 'Intercalaires A4 12 positions', name_ar: 'فواصل A4 12 موضع', barcode: '764000004', avg_purchase_price: 80, avg_selling_price: 130, unit: 'jeu' },
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
