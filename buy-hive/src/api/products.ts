import type { Product, ProductsResponse } from "../types/catalog";

const baseUrl = import.meta.env.API_BASE_URL;

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${baseUrl}/products`);
  if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
  const data: ProductsResponse = await response.json();
  return data.items ?? [];
}
