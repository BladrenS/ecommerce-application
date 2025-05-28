import clsx from 'clsx';
import { type FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import styles from './styles.module.scss';

const SORTING_VALUE = ['Default', 'Price', 'Name'];

export const Sorting: FC = () => {
  const { sort, setSort } = useCatalogContext();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sorting:</div>
      <div className={styles.wrapper}>
        {SORTING_VALUE.map((value, index) => (
          <div
            key={value}
            onClick={() => setSort(index)}
            className={clsx(styles.item, { [styles.active]: sort === index })}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
