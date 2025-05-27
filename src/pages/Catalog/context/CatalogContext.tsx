import { type ProductProjection } from '@commercetools/platform-sdk';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { useProducts } from '../logic/useProducts';
import type { IFilters } from '../types';

interface CatalogContextType {
  products: ProductProjection[];
  filters: IFilters;
  loading: boolean;
  error: string;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { products, filters, loading, error, fetchProducts, setFilters } = useProducts();
  const debounceFilters = useDebounce(filters, 1000);

  useEffect(() => {
    fetchProducts();
  }, [debounceFilters]);

  return (
    <CatalogContext.Provider value={{ products, filters, loading, error, setFilters }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogContext = () => {
  const catalog = useContext(CatalogContext);

  if (!catalog) {
    throw Error('Missing in provider');
  }

  return catalog;
};
