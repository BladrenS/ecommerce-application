import { type ChangeEvent } from 'react';

import { useCatalogContext } from '../../../../../pages/Catalog';

export const usePrice = () => {
  const { filters, initialPriceValue, setFilters } = useCatalogContext();

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      priceRange: {
        ...previous.priceRange,
        [name]: value,
      },
    }));
  };

  return {
    from: filters.priceRange.from,
    to: filters.priceRange.to,
    min: initialPriceValue.from,
    max: initialPriceValue.to,
    changeValue,
  };
};
