import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from '../styles.module.scss';
import { LogoutIcon } from './';

export const HeaderIcons = ({
  icons,
  token,
  onLogout,
}: {
  icons: any[];
  token: string | null;
  onLogout: () => void;
}) => {
  return (
    <div className={styles['header-icons']}>
      {icons.map((item, index) => (
        <NavLink className={styles['icon-parent']} key={index} to={item.href}>
          <item.Component
            className={clsx(
              styles['header-icon'],
              item.active && styles['header-icon-active'],
              item.disabled && styles.disabled,
            )}
          />
          {item.counter ? <div className={styles.counter}>{item.counter}</div> : null}
        </NavLink>
      ))}
      {token && <LogoutIcon onClick={onLogout} className={styles['header-icon']} />}
    </div>
  );
};
