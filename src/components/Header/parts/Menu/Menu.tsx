import clsx from 'clsx';
import type { ComponentProps, Dispatch, FC, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';

import { HEADER_LINKS } from '../../constants';
import { LogoutIcon } from '../LogoutIcon/LogoutIcon';
import styles from './styles.module.scss';

interface MenuProps extends ComponentProps<'div'> {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  userLogout: () => void;
  token: string | null;
  icons: {
    Component: FC<{ className?: string }>;
    href: string;
    counter?: number;
    active?: boolean;
    disabled?: boolean;
  }[];
}

export const Menu: FC<MenuProps> = ({ active, setActive, userLogout, token, icons }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles['menu-link'], {
      [styles.active]: isActive,
    });

  const closeMenu = () => setActive(false);

  return (
    <div className={clsx(styles.menu, { [styles.active]: active })}>
      <div onClick={(event) => event.stopPropagation()} className={styles.content}>
        <ul className={styles.list}>
          {HEADER_LINKS.map(({ href, text }, index) => {
            const shouldDisable = token && (index === 0 || index === 1);
            return shouldDisable ? (
              <span
                key={href}
                className={`${styles['disabled-link']} ${styles['nav-link']}`}
                style={{ pointerEvents: 'none', opacity: 0.5 }}
              >
                {text}
              </span>
            ) : (
              <NavLink onClick={closeMenu} key={href} to={href} className={getNavLinkClass}>
                {text}
              </NavLink>
            );
          })}
        </ul>

        <ul className={styles['list-icons']}>
          {icons.map(({ Component, href, counter, active, disabled }) => (
            <li onClick={closeMenu} key={href} className={styles.item}>
              <NavLink to={href}>
                <div className={styles['icon-wrapper']}>
                  <Component
                    className={clsx(styles.icon, active && styles['icon-active'], disabled && styles.disabled)}
                  />
                  {counter ? <span className={styles.counter}>{counter}</span> : null}
                </div>
              </NavLink>
            </li>
          ))}
          {token && (
            <li onClick={closeMenu} className={styles.item}>
              <LogoutIcon onClick={userLogout} className={styles.icon} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
