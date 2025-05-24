import type { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { CommerceToolsService } from '../../../api/CommerceToolsService';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const getProducts = async () => {
    try {
      const data = await CommerceToolsService.getProducts();

      setProducts(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
};
