import { useEffect, useState } from 'react';

export const usePagination = (totalPages: number, count: number) => {
  const [pagination, setPagination] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (totalPages) {
      createPagination();
    }
  }, [totalPages]);

  const createPagination = () => {
    const countPage = Math.ceil(totalPages / count);

    setPagination(Array.from({ length: countPage }, (_, index) => index));
  };

  return { pagination, currentPage, setCurrentPage };
};
