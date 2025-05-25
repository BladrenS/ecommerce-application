import { type FC, useEffect } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog/context/CatalogContext';
import { usePrice } from './logic/usePrice';
import styles from './styles.module.scss';

export const Price: FC = () => {
  const { fetchProducts } = useCatalogContext();

  const { value, changeValue, filterQuery } = usePrice();

  useEffect(() => {
    if (!value.from || !value.to) return;

    fetchProducts(filterQuery());
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Price</h3>
      <div className={styles.container}>
        <label className={styles.label}>
          <div className={styles.text}>From</div>
          <input name="from" className={styles.input} type="number" value={value.from} onChange={changeValue} />
        </label>
        <label className={styles.label}>
          <div className={styles.text}>To</div>
          <input name="to" className={styles.input} type="number" value={value.to} onChange={changeValue} />
        </label>
      </div>
    </div>
  );
};
