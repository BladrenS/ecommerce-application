import { type FC } from 'react';

import { Product } from '../index';
import styles from './styles.module.scss';

export const Products: FC = () => {
  return (
    <section className={styles.container}>
      <Product />
      <Product />
      <Product />
      <Product />
    </section>
  );
};
