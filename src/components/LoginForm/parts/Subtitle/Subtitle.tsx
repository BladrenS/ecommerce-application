import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

export const Subtitle: FC = () => {
  return (
    <div className={styles.subtitle}>
      <div className={styles.active}>Login</div>
      <span className={styles.decor}></span>
      <NavLink to={'/register'} className={styles['auth-page']}>
        Register
      </NavLink>
    </div>
  );
};
