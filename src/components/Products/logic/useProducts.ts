import type { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await CommerceToolsProducts.getProducts();

      setProducts(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products, loading };
};
