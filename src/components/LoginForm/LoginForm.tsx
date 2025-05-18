import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { LoginRegistrationToggler } from '../../pages/parts/LoginRegistrationToggler';
import { Button, Loader } from '../Ui';
import { useLoginSubmitting } from './logic/useLoginSubmitting';
import { AuthInput } from './parts';
import styles from './styles.module.scss';

export const LoginForm: FC = () => {
  const { submit, register, isValid, loading, errors } = useLoginSubmitting();

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      <LoginRegistrationToggler activeButton="login" />
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.container}>
          <AuthInput
            error={errors.email?.message}
            type="text"
            autoComplete="true"
            placeholder="Enter your email"
            {...register('email')}
          />
          <AuthInput
            error={errors.password?.message}
            type="password"
            autoComplete="true"
            placeholder="Enter your password"
            {...register('password')}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button disabled={!isValid}>Login</Button>
        </div>
        {errors.root && <p className={styles['credentials-error']}>{errors.root.message}</p>}
      </form>
      <div className={styles.redirect}>
        Don't have an account yet?
        <NavLink to={'/register'} className={styles.link}>
          Register
        </NavLink>
      </div>
    </div>
  );
};
