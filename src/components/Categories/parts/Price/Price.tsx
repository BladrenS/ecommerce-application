import { type ChangeEvent, type FC, useState } from 'react';

import styles from './styles.module.scss';

export const Price: FC = () => {
  const [value, setValue] = useState({
    from: '3.50',
    to: '160.00',
  });

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValue((previous) => {
      return { ...previous, [name]: value };
    });
  };

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
