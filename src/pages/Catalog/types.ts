export interface IFilters {
  category: string[];
  priceRange: PriceRange;
  size: string[];
  search: string;
  sort: SortValue;
}
export interface PriceRangeFacets {
  min: string;
  max: string;
}
export interface PriceRange {
  from: string;
  to: string;
}

export interface PriceFacet {
  type: string;
  dataType: string;
  ranges: PriceRangeFacets[];
}

export interface FacetsResponse {
  'variants.price.centAmount'?: PriceFacet;
}

export interface SortValue {
  value: 'name' | 'price' | 'default';
  direction: 'asc' | 'desc';
}

export interface Page {
  offset: number;
  totalPages: number;
  count: number;
  limit: number;
}
