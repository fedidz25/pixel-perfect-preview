import { catalogCategories, CatalogCategoryData, CatalogProductData, getTotalProductCount } from "@/data/catalogData";

export interface CatalogCategory {
  id: string;
  name: string;
  name_ar: string;
  icon: string;
  color: string;
}

export interface CatalogProduct {
  id: string;
  category_id: string;
  name: string;
  name_ar: string;
  barcode: string;
  avg_purchase_price: number;
  avg_selling_price: number;
  unit: string;
}

export function useCatalog() {
  // Convert catalog data to the expected format
  const categories: CatalogCategory[] = catalogCategories.map((cat, index) => ({
    id: `cat-${index}`,
    name: cat.name,
    name_ar: cat.name_ar,
    icon: cat.icon,
    color: cat.color,
  }));

  const products: CatalogProduct[] = catalogCategories.flatMap((cat, catIndex) =>
    cat.products.map((prod, prodIndex) => ({
      id: `prod-${catIndex}-${prodIndex}`,
      category_id: `cat-${catIndex}`,
      name: prod.name,
      name_ar: prod.name_ar,
      barcode: prod.barcode,
      avg_purchase_price: prod.avg_purchase_price,
      avg_selling_price: prod.avg_selling_price,
      unit: prod.unit,
    }))
  );

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId);
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.barcode?.includes(query) ||
      p.name_ar?.includes(query)
    );
  };

  return {
    categories,
    products,
    isLoading: false,
    getProductsByCategory,
    searchProducts,
    totalCount: getTotalProductCount(),
  };
}
