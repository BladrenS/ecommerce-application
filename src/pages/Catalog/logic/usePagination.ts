import { useEffect, useState } from 'react';

export const usePagination = () => {
  const [pagination, setPagination] = useState<number[]>([]);
  const [page, setPage] = useState({ offset: 0, totalPages: 0, count: 0, limit: 9, currentPage: 1 });

  useEffect(() => {
    if (page.totalPages && page.count) {
      createPagination();
    }
  }, [page.totalPages]);

  const createPagination = () => {
    const countPage = Math.ceil(page.totalPages / page.count);

    setPagination(Array.from({ length: countPage }, (_, index) => index));
  };

  return { pagination, page, setPage };
};
