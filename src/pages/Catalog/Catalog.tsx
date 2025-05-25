import { type FC } from 'react';

import { Categories, Products } from '../../components';
import { CatalogProvider } from './context/CatalogContext';
import styles from './styles.module.scss';

export const Catalog: FC = () => {
  return (
    <CatalogProvider>
      <main className={styles.wrapper}>
        <Categories />
        <Products />
      </main>
    </CatalogProvider>
  );
};
