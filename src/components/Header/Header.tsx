import clsx from 'clsx';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { logo } from '../../assets/';
import { useHeaderData } from './logic/useHeaderData';
import { useMenuVisible } from './logic/useMenuVisible';
import { Menu } from './parts';
import { HeaderIcons } from './parts/HeaderIcons';
import { HeaderLinks } from './parts/HeaderLinks';
import styles from './styles.module.scss';

export const Header = memo(() => {
  const { isActiveMenu, setIsActiveMenu } = useMenuVisible();
  const { headerIcons, token } = useHeaderData();

  const clickHandlerBurger = () => setIsActiveMenu((previous) => !previous);

  const userLogout = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_login');
    window.location.href = '/login';
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <NavLink to="/main">
          <img src={logo} alt="logo" />
        </NavLink>

        <HeaderLinks token={token} />
        <HeaderIcons icons={headerIcons} token={token} onLogout={userLogout} />

        <div className={clsx(styles.burger, isActiveMenu && styles['active-burger'])} onClick={clickHandlerBurger} />
      </div>

      <Menu
        active={isActiveMenu}
        setActive={setIsActiveMenu}
        userLogout={userLogout}
        icons={headerIcons}
        token={token}
      />
    </header>
  );
});
