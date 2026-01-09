export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  year: number;
  weight: string;
  mileage: string;
  location: string;
  image: string;
  sellerId: string;
  category: ProductCategory;
  condition: ProductCondition;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory =
  | 'trucks'
  | 'buses'
  | 'construction'
  | 'agricultural'
  | 'material-handling';

export type ProductCondition =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor';

export interface ProductFilters {
  category?: ProductCategory;
  priceRange?: { min: number; max: number };
  yearRange?: { min: number; max: number };
  location?: string;
  condition?: ProductCondition;
}

