import clsx from 'clsx';
import type { FC } from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { logoutCustomer } from '../../api/request';
import { logo } from '../../assets/';
import { useHeaderData } from './logic/useHeaderData';
import { useMenuVisible } from './logic/useMenuVisible';
import { Menu } from './parts';
import { HeaderIcons } from './parts/HeaderIcons';
import { HeaderLinks } from './parts/HeaderLinks';
import styles from './styles.module.scss';

export const Header: FC = memo(() => {
  const { isActiveMenu, setIsActiveMenu } = useMenuVisible();
  const { headerIcons, token } = useHeaderData();

  const clickHandlerBurger = () => setIsActiveMenu((previous) => !previous);

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <NavLink to="/main">
          <img src={logo} alt="logo" />
        </NavLink>

        <HeaderLinks token={token} />
        <HeaderIcons icons={headerIcons} token={token} onLogout={logoutCustomer} />

        <div className={clsx(styles.burger, isActiveMenu && styles['active-burger'])} onClick={clickHandlerBurger} />
      </div>

      <Menu
        active={isActiveMenu}
        setActive={setIsActiveMenu}
        userLogout={logoutCustomer}
        icons={headerIcons}
        token={token}
      />
    </header>
  );
});
