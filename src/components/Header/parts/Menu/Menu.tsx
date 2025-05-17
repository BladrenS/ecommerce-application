import clsx from 'clsx';
import type { ComponentProps, Dispatch, FC, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import { HEADER_ICONS, HEADER_LINKS } from '../../constants';
import { LogoutIcon } from '../LogoutIcon/LogoutIcon';
import styles from './styles.module.scss';

interface MenuProps extends ComponentProps<'div'> {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  userLogout: () => void;
}

export const Menu: FC<MenuProps> = ({ active, setActive, userLogout }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles['menu-link'], {
      [styles.active]: isActive,
    });

  const closeMenu = () => {
    setActive(false);
  };

  return (
    <div onClick={closeMenu} className={clsx(styles.menu, { [styles.active]: active })}>
      <div onClick={(event) => event.stopPropagation()} className={styles.content}>
        <ul className={styles.list}>
          {HEADER_LINKS.map(({ href, text }) => (
            <li onClick={closeMenu} key={href} className={styles.item}>
              <NavLink key={href} to={href} className={getNavLinkClass}>
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={styles['list-icons']}>
          {HEADER_ICONS.map(({ Component, href }) => (
            <li onClick={closeMenu} key={href} className={styles.item}>
              <NavLink key={href} to={href}>
                <Component className={styles.icon} />
              </NavLink>
            </li>
          ))}
          <li onClick={closeMenu} className={styles.item}>
            <LogoutIcon onClick={userLogout} className={styles.icon} />
          </li>
        </ul>
      </div>
    </div>
  );
};
