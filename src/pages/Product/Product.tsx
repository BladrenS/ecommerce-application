import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

export const Product: FC = () => {
  const { id } = useParams();

  return (
    <div className={styles.main}>
      <h1>
        product id:
        {id ? id : ''}
      </h1>
    </div>
  );
};
