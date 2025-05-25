import type { ProductProjection } from '@commercetools/platform-sdk';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async (filterQuery?: string) => {
    try {
      setLoading(true);
      const data = await CommerceToolsProducts.getProducts(filterQuery);

      setProducts(data.results);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { products, loading, error, setProducts, fetchProducts };
};
