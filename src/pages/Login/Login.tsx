import type { FC } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../components';
import styles from './styles.module.scss';

export const Login: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      navigate('/main');
    }
  }, []);

  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
};
