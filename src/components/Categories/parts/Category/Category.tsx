import { type FC } from 'react';

import styles from './styles.module.scss';

export const Category: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Category</h3>
      <ul className={styles.list}>
        <li className={styles.item}>Lorem ipsum, dolor sit</li>
        <li className={styles.item}>Amet consectetur adipisicing</li>
      </ul>
    </div>
  );
};
