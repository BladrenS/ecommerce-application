import { type FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import { Category } from '../index';
import styles from './styles.module.scss';

export const Categories: FC = () => {
  const { categories, setFilters } = useCatalogContext();

  const categoryClickHandler = (id: string) => {
    setFilters((previous) => ({ ...previous, categoryId: id }));
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Category</h3>
      <ul className={styles.list}>
        {categories.map(({ id, orderHint, name }) => (
          <Category key={id} onClick={() => categoryClickHandler(id)} order={orderHint} name={name['en-US']} />
        ))}
      </ul>
    </div>
  );
};
