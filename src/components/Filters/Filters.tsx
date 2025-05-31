import { type FC } from 'react';

import { useCatalogContext } from '../../pages/Catalog';
import { Button } from '../Ui';
import { Categories, Price, Size } from './parts';
import styles from './styles.module.scss';

export const Filters: FC = () => {
  const { setFilters } = useCatalogContext();

  const initialValue = () => {
    setFilters({
      categoryId: '',
      priceRange: { from: '', to: '' },
      size: [],
      search: '',
      sort: { value: 'default', direction: 'asc' },
    });
  };

  return (
    <aside className={styles.categories}>
      <Categories />
      <Price />
      <Size />
      <div className={styles.center}>
        <Button onClick={initialValue}>Reset</Button>
      </div>
    </aside>
  );
};
