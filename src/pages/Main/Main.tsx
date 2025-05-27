import type { FC } from 'react';
import { useEffect } from 'react';

import { CommerceToolsUser } from '../../api/CommerceToolsService';
import { MainSlider } from '../../components/Main/MainSlider';
import styles from './styles.module.scss';

export const Main: FC = () => {
  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      CommerceToolsUser.getMe();
    }
  }, []);

  return (
    <div className={styles.main}>
      <MainSlider />
      <h2 className={styles['header-big']}>New models arrived!</h2>
      <h6 className={styles['header-small']}>
        This is where we share our experiences with fellow motorcycle enthusiasts.
      </h6>
    </div>
  );
};
