import { type ProductProjection } from '@commercetools/platform-sdk';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { useProducts } from '../logic/useProducts';
import type { IFilters, PriceRange, SortValue } from '../types';

interface CatalogContextType {
  products: ProductProjection[];
  filters: IFilters;
  initialPriceValue: PriceRange;
  sort: SortValue;
  search: string;
  loading: boolean;
  error: string;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  setSort: Dispatch<SetStateAction<SortValue>>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    products,
    filters,
    initialPriceValue,
    sort,
    search,
    loading,
    error,
    fetchProducts,
    setFilters,
    setSort,
    setSearch,
  } = useProducts();
  const debounceFilters = useDebounce(filters, 1000);
  const debounceSearch = useDebounce(search, 1000);

  useEffect(() => {
    fetchProducts();
  }, [debounceFilters, sort, debounceSearch]);

  return (
    <CatalogContext.Provider
      value={{ products, filters, initialPriceValue, sort, search, loading, error, setFilters, setSort, setSearch }}
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
