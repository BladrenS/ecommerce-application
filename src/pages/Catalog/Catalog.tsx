import { type FC } from 'react';

import { Categories, Products } from '../../components';
import styles from './styles.module.scss';

export const Catalog: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Categories />
      <Products />
    </main>
  );
};
