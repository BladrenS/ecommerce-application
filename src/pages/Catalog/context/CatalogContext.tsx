import { type ProductProjection } from '@commercetools/platform-sdk';
import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useProducts } from '../logic/useProducts';

interface CatalogContextType {
  products: ProductProjection[];
  loading: boolean;
  error: string;
  fetchProducts: (filterQuery: string) => Promise<void>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <CatalogContext.Provider value={{ products, loading, error, fetchProducts }}>{children}</CatalogContext.Provider>
  );
};

export const useCatalogContext = () => {
  const catalog = useContext(CatalogContext);

  if (!catalog) {
    throw Error('Missing in provider');
  }

  return catalog;
};
