import { type FC } from 'react';

import { useCatalogContext } from '../../pages/Catalog';
import { Button } from '../Ui';
import { Category, Price, Size } from './parts';
import styles from './styles.module.scss';

export const Categories: FC = () => {
  const { setFilters } = useCatalogContext();

  return (
    <aside className={styles.categories}>
      <Category />
      <Price />
      <Size />
      <div className={styles.center}>
        <Button onClick={() => setFilters({ categoryId: '', priceRange: { from: '', to: '' }, size: [] })}>
          Reset
        </Button>
      </div>
    </aside>
  );
};
