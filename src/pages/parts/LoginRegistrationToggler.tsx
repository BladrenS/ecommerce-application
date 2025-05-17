import clsx from 'clsx';

import styles from './parts.module.scss';

type activeButtonType = 'login' | 'register';

export const LoginRegistrationToggler = ({ activeButton }: { activeButton: activeButtonType }) => {
  return (
    <div className={styles['login-registration-toggler']}>
      <div className={styles['form-toggle']}>
        <button
          className={clsx(styles['toggle-button'], {
            [styles.active]: activeButton === 'login',
          })}
        >
          Login
        </button>
        <span className={styles.separator}></span>
        <button
          className={clsx(styles['toggle-button'], {
            [styles.active]: activeButton === 'register',
          })}
        >
          Register
        </button>
      </div>
      <h4 className={styles.description}>Enter your information to register.</h4>
    </div>
  );
};
