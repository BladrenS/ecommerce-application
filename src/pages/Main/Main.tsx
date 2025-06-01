import type { FC } from 'react';
import { useEffect } from 'react';

import { CommerceToolsUser } from '../../api/CommerceToolsService';
import styles from './styles.module.scss';

export const Main: FC = () => {
  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      CommerceToolsUser.getMe();
    }
  }, []);

  return (
    <div className={styles.main}>
      <h1>Main</h1>
    </div>
  );
};
