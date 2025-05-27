import type { ProductProjection } from '@commercetools/platform-sdk';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';
import type { IFilters } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

    return conditions.join(' and ');
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const filterQuery = createFilterQuery();

      const data = await CommerceToolsProducts.getProducts(filterQuery);

      setProducts(data.results);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { products, filters, loading, error, setFilters, fetchProducts };
};
