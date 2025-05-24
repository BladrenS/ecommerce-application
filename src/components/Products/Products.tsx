import { type FC } from 'react';

import { Product } from '../index';
import { useProducts } from './logic/useProducts';
import styles from './styles.module.scss';

export const Products: FC = () => {
  const { products } = useProducts();

  console.log(products);

  return (
    <section className={styles.container}>
      {products.map(({ description, id, name, masterVariant: { images, prices } }) => {
        return (
          <Product
            key={id}
            name={name && name['en-US']}
            description={description && description['en-US']}
            imageUrl={images && images[0].url}
            price={prices && prices?.at(-1)?.key}
          />
        );
      })}
    </section>
  );
};
