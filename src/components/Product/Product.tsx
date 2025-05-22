import { type FC } from 'react';

import helmet from '../../assets/helmet.jpg';
import styles from './styles.module.scss';

export const Product: FC = () => {
  return (
    <div className={styles.product}>
      <img src={helmet} alt="product" className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>Новый шлем</h3>
        <div className={styles.price}>$89.00</div>
        <div className={styles.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas illo in accusamus nisi fuga itaque non aut rem
          optio tenetur minus magnam explicabo quae, nobis dicta. Labore, at iste. Corrupti?.
        </div>
        <div className={styles.link}>More</div>
      </div>
    </div>
  );
};
