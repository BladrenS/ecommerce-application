import { type FC } from 'react';

import { useCatalogContext } from '../../pages/Catalog';
import { Loader } from '../Ui';
import { Pagination, Product, Search, Sort } from './parts';
import styles from './styles.module.scss';

export const Products: FC = () => {
  const { products, loading } = useCatalogContext();

  return (
    <section className={styles.container}>
      <Search />
      <Sort />
      <Pagination />
      {loading && <Loader />}
      <ul className={styles.products}>
        {products.map(({ description, id, name, key, masterVariant: { images, prices } }) => {
          return (
            <Product
              key={id}
              id={id}
              name={name && name['en-US']}
              description={description && description['en-US']}
              imageUrl={images && images[0].url}
              price={prices && prices[0]}
              imageAlt={key}
            />
          );
        })}
      </ul>
      <Pagination />
    </section>
  );
};
