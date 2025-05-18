import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './parts.module.scss';

type activeButtonType = 'login' | 'register';

export const LoginRegistrationToggler = ({ activeButton }: { activeButton: activeButtonType }) => {
  return (
    <div className={styles['login-registration-toggler']}>
      <div className={styles['form-toggle']}>
        <NavLink
          className={clsx(styles['toggle-button'], {
            [styles.active]: activeButton === 'login',
          })}
          to={'/login'}
        >
          Login
        </NavLink>
        <span className={styles.separator}></span>
        <NavLink
          className={clsx(styles['toggle-button'], {
            [styles.active]: activeButton === 'register',
          })}
          to={'/register'}
        >
          Register
        </NavLink>
      </div>
      <h4 className={styles.description}>
        {activeButton === 'register'
          ? 'Enter your information to register.'
          : 'Enter your email and password to login.'}
      </h4>
    </div>
  );
};
