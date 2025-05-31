import type { Category, ProductProjection } from '@commercetools/platform-sdk';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { useCategories, useProducts } from '../logic/';
import type { IFilters, PriceRange } from '../types';

interface CatalogContextType {
  products: ProductProjection[];
  categories: Category[];
  filters: IFilters;
  initialPriceValue: PriceRange;
  loading: boolean;
  error: string;
  setFilters: Dispatch<SetStateAction<IFilters>>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { products, filters, initialPriceValue, loading, error, fetchProducts, setFilters } = useProducts();

  const { categories, fetchCategories } = useCategories();

  const debounceFilters = useDebounce(filters, 1000);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debounceFilters]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        filters,
        initialPriceValue,
        categories,
        loading,
        error,
        setFilters,
      }}
    >
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
