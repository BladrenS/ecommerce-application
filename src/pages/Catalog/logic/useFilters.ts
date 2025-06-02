import { useState } from 'react';

import { type IFilters } from '../types';

export const useFilters = (id = localStorage.getItem('filter')) => {
  const [filters, setFilters] = useState<IFilters>({
    category: id ? [id] : [],
    priceRange: { from: '', to: '' },
    size: [],
    search: '',
    sort: { value: 'default', direction: 'asc' },
  });

  const createFilterQuery = () => {
    const conditions = [];
    const {
      category,
      priceRange: { from, to },
      size,
    } = filters;

    if (category.length) {
      conditions.push(`categories.id:${category.map((c) => `"${c}"`).join(',')}`);
    }

    if (from || to) {
      conditions.push(
        `variants.price.centAmount:range(${from ? Math.round(+from * 100) : 0} to ${to ? Math.round(+to * 100) : '*'})`,
      );
    }

    if (size.length) {
      conditions.push(`variants.attributes.sizes:${size.map((size) => `"${size.toLowerCase()}"`).join(',')}`);
    }

    return conditions;
  };

  const createSortQuery = () => {
    if (filters.sort.value === 'default') return '';

    switch (filters.sort.value) {
      case 'price': {
        return `price ${filters.sort.direction}`;
      }
      case 'name': {
        return `name.en-US ${filters.sort.direction}`;
      }
      default:
        return '';
    }
  };

  return { filters, createFilterQuery, createSortQuery, setFilters };
};
