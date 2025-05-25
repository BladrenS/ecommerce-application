import { type FC } from 'react';

import { useCatalogContext } from '../../pages/Catalog/context/CatalogContext';
import { Product } from '../index';
import { Loader } from '../Ui';
import styles from './styles.module.scss';

export const Products: FC = () => {
  const { products, loading } = useCatalogContext();

  return (
    <section className={styles.container}>
      {loading && <Loader />}
      {products.map(({ description, id, name, key, masterVariant: { images, prices } }) => {
        return (
          <Product
            key={id}
            name={name && name['en-US']}
            description={description && description['en-US']}
            imageUrl={images && images[0].url}
            price={prices && prices[0]}
            imageAlt={key}
          />
        );
      })}
    </section>
  );
};
