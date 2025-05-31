import { type FC } from 'react';

import { usePrice } from './logic/usePrice';
import styles from './styles.module.scss';

export const Price: FC = () => {
  const { from, to, min, max, changeValue } = usePrice();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Price</h3>
      <div className={styles.container}>
        <label className={styles.label}>
          <div className={styles.text}>From</div>
          <input
            placeholder={min}
            name="from"
            className={styles.input}
            type="number"
            value={from}
            onChange={changeValue}
          />
        </label>
        <label className={styles.label}>
          <div className={styles.text}>To</div>
          <input placeholder={max} name="to" className={styles.input} type="number" value={to} onChange={changeValue} />
        </label>
      </div>
    </div>
  );
};
