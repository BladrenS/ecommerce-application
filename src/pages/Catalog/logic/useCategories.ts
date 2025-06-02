import { type Category } from '@commercetools/platform-sdk';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { CommerceToolsProducts } from '../../../api/CommerceToolsService';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const data = await CommerceToolsProducts.getCategories();

      setCategories(data.results);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    }
  };

  return { categories, error, fetchCategories };
};
