import type { ChangeEvent, FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import styles from './styles.module.scss';

export const Search: FC = () => {
  const { filters, setFilters, setPage } = useCatalogContext();

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFilters((previous) => ({ ...previous, search: value }));
    setPage({ offset: 0, totalPages: 0, count: 0, limit: 9, currentPage: 1 });
  };

  return (
    <div className={styles.container}>
      <input
        name="search"
        placeholder="Search..."
        type="text"
        className={styles.input}
        value={filters.search}
        onChange={searchHandler}
      />
    </div>
  );
};
