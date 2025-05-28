import type { ProductProjection } from '@commercetools/platform-sdk';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';
import type { FacetsResponse, IFilters, PriceRangeFacets, SortValue } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState<SortValue>({ value: 'default', direction: 'asc' });
  const [initialPriceValue, setInitialPriceValue] = useState({ from: '', to: '' });
  const [filters, setFilters] = useState<IFilters>({
    categoryId: '',
    priceRange: { from: '', to: '' },
    size: [],
  });

  const createFilterQuery = () => {
    const conditions = [];
    const {
      categoryId,
      priceRange: { from, to },
      size,
    } = filters;

    if (categoryId) {
      conditions.push(`categories.id:"${categoryId}"`);
    }

    if (from || to) {
      conditions.push(
        `variants.price.centAmount:range(${from ? Math.round(+from * 100) : 0} to ${to ? Math.round(+to * 100) : '*'})`,
      );
    }

    if (size.length) {
      conditions.push(`variants.attributes.sizes:${size.map((size) => `"${size.toLowerCase()}"`).join(',')}`);
    }

    return conditions;
  };

  const createSortQuery = () => {
    if (sort.value === 'default') return;

    switch (sort.value) {
      case 'price': {
        return `price ${sort.direction}`;
      }
      case 'name': {
        return `name.en-US ${sort.direction}`;
      }
      default:
        return;
    }
  };

  function getPriceRange(facets?: FacetsResponse): PriceRangeFacets {
    const priceFacet = facets ? facets['variants.price.centAmount'] : '';

    if (!priceFacet || !priceFacet.ranges || priceFacet.ranges.length === 0) {
      return { min: '', max: '' };
    }

    const range = priceFacet.ranges[0];

    return {
      min: (+range.min / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      max: (+range.max / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  }

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const filterQuery = createFilterQuery();
      const sortQuery = createSortQuery();

      const data = await CommerceToolsProducts.getProducts(filterQuery, sortQuery);

      const { min, max } = getPriceRange(data.facets);

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
    initialPriceValue,
    sort,
    loading,
    error,
    setFilters,
    setSort,
    fetchProducts,
  };
};
