import type { Category, ProductProjection } from '@commercetools/platform-sdk';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { useCategories, useFilters, usePagination, useProducts } from '../logic/';
import type { IFilters, Page, PriceRange } from '../types';

interface CatalogContextType {
  products: ProductProjection[];
  categories: Category[];
  filters: IFilters;
  page: Page;
  pagination: number[];
  initialPriceValue: PriceRange;
  loading: boolean;
  error: string;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  setPage: Dispatch<SetStateAction<Page>>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { pagination, page, setPage } = usePagination();
  const { filters, createFilterQuery, createSortQuery, setFilters } = useFilters();
  const { products, initialPriceValue, loading, error, fetchProducts } = useProducts(
    page,
    filters,
    createFilterQuery,
    createSortQuery,
    setPage,
  );

  const { categories, fetchCategories } = useCategories();

  const debounceFilters = useDebounce(filters, 500);
  const debouncePage = useDebounce(page.offset, 500);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debounceFilters, debouncePage]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        filters,
        page,
        pagination,
        initialPriceValue,
        categories,
        loading,
        error,
        setPage,
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
