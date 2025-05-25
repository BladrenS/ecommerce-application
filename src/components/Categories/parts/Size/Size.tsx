import { type FC, useEffect } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog/context/CatalogContext';
import { useSize } from './logic/useSize';
import styles from './styles.module.scss';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const Size: FC = () => {
  const { fetchProducts } = useCatalogContext();

  const { selectedSize, handleChangeCheckbox, filterQuery } = useSize();

  useEffect(() => {
    if (!selectedSize.length) return;

    fetchProducts(filterQuery());
  }, [selectedSize]);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Size</h3>
      <ul className={styles.list}>
        {SIZES.map((size) => (
          <label key={size} className={styles.label}>
            <input
              checked={selectedSize.includes(size)}
              onChange={() => handleChangeCheckbox(size)}
              name="size"
              className={styles.input}
              type="checkbox"
            />
            <div className={styles.text}>{size}</div>
          </label>
        ))}
      </ul>
    </div>
  );
};
