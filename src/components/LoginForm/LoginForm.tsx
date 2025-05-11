import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { Button, Loader } from '../Ui';
import { useLoginSubmitting } from './logic/useLoginSubmitting';
import { AuthInput, Subtitle } from './parts';
import { type LoginField, schema } from './schemas/loginSchemas';
import styles from './styles.module.scss';

export const LoginForm: FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<LoginField>({ mode: 'onChange', resolver: zodResolver(schema) });

  const { submit, loading } = useLoginSubmitting(setError);

  return (
    <div className={styles.wrapper}>
      {loading && <Loader />}
      <Subtitle />
      <div className={styles.title}>Enter your email and password to login.</div>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <div className={styles.container}>
          <AuthInput
            error={errors.email?.message}
            type="email"
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
