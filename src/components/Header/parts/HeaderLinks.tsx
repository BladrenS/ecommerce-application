import { NavLink } from 'react-router-dom';

import { HEADER_LINKS } from '../constants';
import styles from '../styles.module.scss';

export const HeaderLinks = ({ token }: { token: string | null }) => {
  const getClass = ({ isActive }: { isActive: boolean }) => `${styles['header-link']} ${isActive ? styles.active : ''}`;

  return (
    <div className={styles['header-links']}>
      {HEADER_LINKS.map(({ href, text }, index) => {
        const isDisabled = token && (index === 0 || index === 1);
        const clearStorage = () => localStorage.removeItem('filter');

        return isDisabled ? (
          <span
            key={href}
            className={`${styles['disabled-link']} ${styles['nav-link']}`}
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            {text}
          </span>
        ) : (
          <NavLink key={href} to={href} className={getClass} onClick={clearStorage}>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
