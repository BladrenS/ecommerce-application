import { type FC } from 'react';

import styles from './styles.module.scss';

interface ProductProps {
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
}

export const Product: FC<ProductProps> = ({ name, description, price, imageUrl }) => {
  return (
    <div className={styles.product}>
      <img src={imageUrl} alt="product" className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.price}>{price}</div>
        <div className={styles.text}>{description}</div>
        <div className={styles.link}>More</div>
      </div>
    </div>
  );
};
