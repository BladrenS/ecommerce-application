import { type FC } from 'react';

import { useSize } from './logic/useSize';
import styles from './styles.module.scss';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const Size: FC = () => {
  const { selectedSize, handleChangeCheckbox } = useSize();

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
