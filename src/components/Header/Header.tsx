import clsx from 'clsx';
import { type FC, memo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { logo } from '../../assets/';
import { HEADER_ICONS, HEADER_LINKS } from './constants';
import { useMenuVisible } from './logic/useMenuVisible';
import { LogoutIcon, Menu } from './parts';
import styles from './styles.module.scss';

export const Header: FC = memo(() => {
  const token = localStorage.getItem('refresh_token');

  const navigate = useNavigate();
  const { isActiveMenu, setIsActiveMenu } = useMenuVisible();
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles['header-link'], {
      [styles.active]: isActive,
    });

  const userLogout = () => {
    if (token) {
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
      navigate('/login');
    }
  };

  const clickHandlerBurger = () => {
    setIsActiveMenu((previous) => !previous);
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <NavLink to={'/main'}>
          <img src={logo} alt="logo" />
        </NavLink>
        <div className={styles['header-links']}>
          {HEADER_LINKS.map(({ href, text }, index) => {
            const shouldDisable = token && (index === 0 || index === 1);
            const clearStorage = () => {
              localStorage.removeItem('filter');
            };
            return shouldDisable ? (
              <span
                key={href}
                className={`${styles['disabled-link']} ${styles['nav-link']}`}
                style={{ pointerEvents: 'none', opacity: 0.5 }}
              >
                {text}
              </span>
            ) : (
              <NavLink key={href} to={href} className={getNavLinkClass} onClick={clearStorage}>
                {text}
              </NavLink>
            );
          })}
        </div>

        <div className={styles['header-icons']}>
          {HEADER_ICONS.map(({ Component, href }) => (
            <NavLink key={href} to={href}>
              <Component className={styles['header-icon']} />
            </NavLink>
          ))}
          {token && <LogoutIcon onClick={userLogout} className={styles['header-icon']} />}
        </div>
        <div
          className={clsx(styles.burger, isActiveMenu && styles['active-burger'])}
          onClick={clickHandlerBurger}
        ></div>
      </div>
      <Menu active={isActiveMenu} setActive={setIsActiveMenu} userLogout={userLogout} />
    </header>
  );
});
