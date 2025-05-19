import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './parts.module.scss';

type ActiveButtonType = 'login' | 'register';

export const LoginRegistrationToggler = ({ activeButton }: { activeButton: ActiveButtonType }) => {
  return (
    <div className={styles['login-registration-toggler']}>
      <div className={styles['form-toggle']}>
        {activeButton === 'login' ? (
          <span className={clsx(styles['toggle-button'], styles.active)}>Login</span>
        ) : (
          <NavLink className={styles['toggle-button']} to="/login">
            Login
          </NavLink>
        )}
        <span className={styles.separator}></span>
        {activeButton === 'register' ? (
          <span className={clsx(styles['toggle-button'], styles.active)}>Register</span>
        ) : (
          <NavLink className={styles['toggle-button']} to="/register">
            Register
          </NavLink>
        )}
      </div>
      <h4 className={styles.description}>
        {activeButton === 'register'
          ? 'Enter your information to register.'
          : 'Enter your email and password to login.'}
      </h4>
    </div>
  );
};
