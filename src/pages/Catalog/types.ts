export interface IFilters {
  categoryId: string;
  priceRange: { from: string; to: string };
  size: string[];
}
