import { type FC, useEffect } from 'react';

import { CommerceToolsService } from '../../api/CommerceToolsService';
import { Categories } from '../../components';
import styles from './styles.module.scss';

export const Catalog: FC = () => {
  useEffect(() => {
    CommerceToolsService.getProducts();
  }, []);

  return (
    <main className={styles.wrapper}>
      <Categories />
    </main>
  );
};
