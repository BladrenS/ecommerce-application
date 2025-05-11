import type { FC } from 'react';

import styles from './styles.module.scss';

export const Loader: FC = () => {
  return <div className={styles.loader}></div>;
};
