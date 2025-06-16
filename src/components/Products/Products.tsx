import { type FC } from 'react';

import { Pagination, ProductsList, Search, Sort } from './parts';
import styles from './styles.module.scss';

export const Products: FC = () => {
  return (
    <section className={styles.container}>
      <Search />
      <Sort />
      <Pagination />
      <ProductsList />
      <Pagination />
    </section>
  );
};
