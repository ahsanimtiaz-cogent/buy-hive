export interface Product {
  _id: string;
  productName: string;
  shortDescription: string;
  displayMOQ: string;
  minimumOrderQuantity: number;
  price: string;
  priceMin: number | null;
  priceMax: number | null;
  categoryName: string;
  country: string;
  stockInUSA: boolean;
  images: string[];
  certificates: string[];
  supplierName: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  pages: number;
}

/** Filter options served by the API so the UI never hardcodes catalog values. */
export interface Facets {
  categories: string[];
  countries: string[];
  certificates: string[];
  priceRange: [number, number];
}

export interface FilterState {
  price: [number, number];
  /** Kept as a string so an empty box means "no MOQ filter" rather than NaN. */
  moq: string;
  productCertificates: string[];
  locations: string[];
  stock: boolean;
}
