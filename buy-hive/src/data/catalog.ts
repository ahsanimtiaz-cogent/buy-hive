/** Sentinel for the category Select meaning "don't filter by category". */
export const ALL_CATEGORIES = "All Categories";

/**
 * "relevance" and "ratings_desc" have no backing field on the API and fall back
 * to natural order there.
 */
export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price Low to High" },
  { value: "price_desc", label: "Price High to Low" },
  { value: "moq_asc", label: "MOQ Low to High" },
  { value: "ratings_desc", label: "Ratings High to Low" },
];
