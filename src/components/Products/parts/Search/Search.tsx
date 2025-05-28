import type { ChangeEvent, FC } from 'react';

import { useCatalogContext } from '../../../../pages/Catalog';
import styles from './styles.module.scss';

export const Search: FC = () => {
  const { search, setSearch } = useCatalogContext();

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearch(value);
  };

  return (
    <div className={styles.container}>
      <input placeholder="Search..." type="text" className={styles.input} value={search} onChange={searchHandler} />
    </div>
  );
};
