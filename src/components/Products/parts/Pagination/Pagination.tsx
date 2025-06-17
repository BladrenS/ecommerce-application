import clsx from 'clsx';
import { type FC, useEffect } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog/context/CatalogContext';
import styles from './styles.module.scss';

const OFFSET = 9;

export const Pagination: FC = () => {
  const { pagination, page, setPage } = useCatalogContext();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setPage((previous) => ({ ...previous, offset: (previous.currentPage - 1) * OFFSET }));
  }, [page.currentPage]);

  if (page.totalPages < page.limit) return;

  return (
    <div className={styles.container}>
      <button
        className={styles.item}
        onClick={() => setPage((previous) => ({ ...previous, currentPage: previous.currentPage - 1 }))}
        disabled={page.currentPage - 1 === 0}
      >
        {'<'}
      </button>
      {pagination.map((pageNumber) => (
        <button
          onClick={() => setPage((previous) => ({ ...previous, currentPage: pageNumber + 1 }))}
          className={clsx(styles.item, { [styles.active]: page.currentPage - 1 === pageNumber })}
          key={pageNumber}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className={styles.item}
        onClick={() => setPage((previous) => ({ ...previous, currentPage: previous.currentPage + 1 }))}
        disabled={page.currentPage === pagination.length}
      >
        {'>'}
      </button>
    </div>
  );
};
