import { type FC } from 'react';

import { usePrice } from './logic/usePrice';
import styles from './styles.module.scss';

export const Price: FC = () => {
  const { from, to, changeValue } = usePrice();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Price</h3>
      <div className={styles.container}>
        <label className={styles.label}>
          <div className={styles.text}>From</div>
          <input name="from" className={styles.input} type="number" value={from} onChange={changeValue} />
        </label>
        <label className={styles.label}>
          <div className={styles.text}>To</div>
          <input name="to" className={styles.input} type="number" value={to} onChange={changeValue} />
        </label>
      </div>
    </div>
  );
};
