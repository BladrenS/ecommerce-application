import clsx from 'clsx';
import { type FC, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { logo } from '../../assets/';
import { HEADER_LINKS } from './constants';
import { CartIcon, FavoriteIcon, LogoutIcon, ProfileIcon } from './parts';
import styles from './styles.module.scss';

export const Header: FC = memo(() => {
  const navigate = useNavigate();
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles['header-link'], {
      [styles.active]: isActive,
    });

  const userLogout = () => {
    const token = localStorage.getItem('refresh_token');

    if (token) {
      localStorage.removeItem('refresh_token');
      navigate('/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <NavLink to={'/main'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <div className={styles['header-links']}>
          {HEADER_LINKS.map(({ href, text }) => (
            <NavLink key={href} to={href} className={getNavLinkClass}>
              {text}
            </NavLink>
          ))}
        </div>
        <div className={styles['header-icons']}>
          <NavLink to={'/cart'}>
            <CartIcon className={styles['header-icon']} />
          </NavLink>
          <NavLink to={'/like'}>
            <FavoriteIcon className={styles['header-icon']} />
          </NavLink>
          <NavLink to={'/profile'}>
            <ProfileIcon className={styles['header-icon']} />
          </NavLink>
          <LogoutIcon onClick={userLogout} className={styles['header-icon']} />
        </div>
        <div className={styles.burger}>
          <span></span>
        </div>
      </div>
    </header>
  );
});
