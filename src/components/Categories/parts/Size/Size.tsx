import { type FC } from 'react';

import styles from './styles.module.scss';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const Size: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Size</h3>
      <ul className={styles.list}>
        {SIZES.map((text) => (
          <label key={text} className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <div className={styles.text}>{text}</div>
          </label>
        ))}
      </ul>
    </div>
  );
};
