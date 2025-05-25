import { type FC } from 'react';

import { Button } from '../Ui';
import { Category, Price, Size } from './parts';
import styles from './styles.module.scss';

export const Categories: FC = () => {
  return (
    <aside className={styles.categories}>
      <Category />
      <Price />
      <Size />
      <div className={styles.center}>
        <Button>Reset</Button>
      </div>
    </aside>
  );
};
