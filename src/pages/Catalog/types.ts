export interface IFilters {
  categoryId: string;
  priceRange: PriceRange;
  size: string[];
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
