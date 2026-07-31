import type { FilterState, ProductsResponse } from "../types/catalog";
import { maxPrice } from "../data/catalog";

const baseUrl = import.meta.env.API_BASE_URL;

export async function fetchProducts(
  filters: FilterState,
  search: string,
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (filters.price[0] > 0) params.set("minPrice", String(filters.price[0]));
  if (filters.price[1] < maxPrice) params.set("maxPrice", String(filters.price[1]));
  if (filters.moq) params.set("moq", filters.moq);
  // Unchecked means "show everything", so we only send the flag when it is on.
  if (filters.stock) params.set("availableInUs", "true");
  filters.productCertificates.forEach((item) => params.append("productCertificate", item));
  filters.locations.forEach((item) => params.append("country", item));

  const response = await fetch(`${baseUrl}/products?${params}`);
  if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
  return response.json();
}
