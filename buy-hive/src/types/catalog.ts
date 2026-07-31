export interface Product {
  _id: string;
  productName: string;
  shortDescription: string;
  displayMOQ: string;
  minimumOrderQuantity: number;
  price: string;
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

export interface FilterState {
  price: [number, number];
  moq: string;
  productCertificates: string[];
  supplierCertificates: string[];
  locations: string[];
  stock: boolean;
}
