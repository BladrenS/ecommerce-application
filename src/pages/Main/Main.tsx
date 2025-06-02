import type { FC } from 'react';
import { useEffect } from 'react';

import { CommerceToolsService } from '../../api/CommerceToolsService/CommerceToolsService';
import { BlogCard } from '../../components/Main/BlogCard';
import { MainSlider } from '../../components/Main/MainSlider';
import { blogItems } from '../../constants';
import styles from './styles.module.scss';

export const Main: FC = () => {
  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('refresh_token')) {
        await CommerceToolsService.getMe();
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.main}>
      <MainSlider />
      <h2 className={styles['header-big']}>New models arrived!</h2>
      <h6 className={styles['header-small']}>
        This is where we share our experiences with fellow motorcycle enthusiasts.
      </h6>
      <div className={styles['blog-wrapper']}>
        {blogItems.map((item, index) => (
          <BlogCard key={index} {...item} index={index} />
        ))}
      </div>
    </div>
  );
};
