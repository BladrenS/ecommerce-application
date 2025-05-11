import type { FC } from 'react';
import { useEffect } from 'react';

import { CommerceToolsService } from '../../api/CommerceToolsService';
import styles from './styles.module.scss';

export const Main: FC = () => {
  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      CommerceToolsService.getMe();
    }
  }, []);

  return (
    <div className={styles.main}>
      <h1>Main</h1>
    </div>
  );
};
