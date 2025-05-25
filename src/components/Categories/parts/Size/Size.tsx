import { type FC, useEffect } from 'react';

import { CommerceToolsProducts } from '../../../../api/CommerceToolsService';
import { useSize } from './logic/useSize';
import styles from './styles.module.scss';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const Size: FC = () => {
  const { selectedSize, handleChangeCheckbox, filterQuery } = useSize();

  useEffect(() => {
    if (!selectedSize.length) return;

    CommerceToolsProducts.getFilteredProducts(filterQuery(selectedSize));
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
