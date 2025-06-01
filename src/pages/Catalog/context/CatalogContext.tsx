import type { Category, ProductProjection } from '@commercetools/platform-sdk';
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useDebounce } from '../../../hooks';
import { useCategories, usePagination, useProducts } from '../logic/';
import type { IFilters, Page, PriceRange } from '../types';

interface CatalogContextType {
  products: ProductProjection[];
  categories: Category[];
  filters: IFilters;
  page: Page;
  pagination: number[];
  currentPage: number;
  initialPriceValue: PriceRange;
  loading: boolean;
  error: string;
  setFilters: Dispatch<SetStateAction<IFilters>>;
  setPage: Dispatch<SetStateAction<Page>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const CatalogContext = createContext<null | CatalogContextType>(null);

export const CatalogProvider: FC<PropsWithChildren> = ({ children }) => {
  const { products, filters, page, initialPriceValue, loading, error, fetchProducts, setFilters, setPage } =
    useProducts();

  const { categories, fetchCategories } = useCategories();
  const { pagination, currentPage, setCurrentPage } = usePagination(page.totalPages, page.count);

  const debounceFilters = useDebounce(filters, 1000);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debounceFilters, page.offset]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        filters,
        page,
        pagination,
        currentPage,
        initialPriceValue,
        categories,
        loading,
        error,
        setPage,
        setFilters,
        setCurrentPage,
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
