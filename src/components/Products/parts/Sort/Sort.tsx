import clsx from 'clsx';
import { type FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import { type SortValue } from '../../../../pages/Catalog/types';
import styles from './styles.module.scss';

type SortValueType = SortValue['value'];

const SORTING_VALUE: SortValueType[] = ['default', 'price', 'name'];

export const Sort: FC = () => {
  const {
    filters: {
      sort: { direction, value },
    },
    setFilters,
  } = useCatalogContext();

  const clickSortHandler = (clickedValue: SortValueType) => {
    if (clickedValue === value && clickedValue === 'default') return;

    setFilters((previous) => {
      const isSameField = previous.sort.value === clickedValue;

      const updated: SortValue = {
        value: clickedValue,
        direction: isSameField ? (previous.sort.direction === 'asc' ? 'desc' : 'asc') : 'asc',
      };

      return { ...previous, sort: updated };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sorting:</div>
      <div className={styles.wrapper}>
        {SORTING_VALUE.map((currentValue) => (
          <div className={clsx(styles.value, {})} onClick={() => clickSortHandler(currentValue)} key={currentValue}>
            <div
              className={clsx(styles.item, {
                [styles.active]: value === currentValue,
              })}
            >
              {currentValue}
            </div>
            <span className={styles.decor}>
              {currentValue === value && currentValue !== 'default' ? (direction === 'asc' ? '🠕' : '🠗') : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
