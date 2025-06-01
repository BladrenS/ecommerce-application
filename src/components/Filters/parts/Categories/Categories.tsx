import { type FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import { Category } from '../index';
import styles from './styles.module.scss';

export const Categories: FC = () => {
  const { categories, filters, setFilters, setCurrentPage } = useCatalogContext();

  const categoryClickHandler = (id: string) => {
    setFilters((previous) => {
      if (previous.category.includes(id)) {
        return { ...previous, category: previous.category.filter((c) => c !== id) };
      }

      return {
        ...previous,
        category: [...previous.category, id],
      };
    });

    setCurrentPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Category</h3>
      <ul className={styles.list}>
        {categories.map(({ id, name }) => (
          <Category
            key={id}
            checked={filters.category.includes(id)}
            onClick={() => categoryClickHandler(id)}
            name={name['en-US']}
          />
        ))}
      </ul>
    </div>
  );
};
