import type { ProductProjection } from '@commercetools/platform-sdk';
import { AxiosError } from 'axios';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';
import type { FacetsResponse, IFilters, Page, PriceRangeFacets } from '../types';

export const useProducts = (
  page: Page,
  filters: IFilters,
  createFilterQuery: () => string[],
  createSortQuery: () => string,
  setPage: Dispatch<SetStateAction<Page>>,
) => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialPriceValue, setInitialPriceValue] = useState({ from: '', to: '' });

  function getPriceRange(facets?: FacetsResponse): PriceRangeFacets {
    const priceFacet = facets ? facets['variants.price.centAmount'] : '';

    if (!priceFacet || !priceFacet.ranges || priceFacet.ranges.length === 0) {
      return { min: '', max: '' };
    }

    const range = priceFacet.ranges[0];

    return {
      min: (+range.min / 100).toLocaleString('en-US', { minimumFractionDigits: 2 }),
      max: (+range.max / 100).toLocaleString('en-US', { minimumFractionDigits: 2 }),
    };
  }

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const filterQuery = createFilterQuery();
      const sortQuery = createSortQuery();

      const data = await CommerceToolsProducts.getProducts(filterQuery, sortQuery, filters.search, page.offset);

      const { min, max } = getPriceRange(data.facets);

      setPage((previous) => ({ ...previous, totalPages: data.total ?? 0, count: data.count }));
      setInitialPriceValue({ from: min, to: max });

      setProducts(data.results);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    filters,
    page,
    initialPriceValue,
    loading,
    error,
    setPage,
    fetchProducts,
  };
};
