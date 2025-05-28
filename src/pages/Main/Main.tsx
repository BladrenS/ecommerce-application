import type { FC } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { CommerceToolsUser } from '../../api/CommerceToolsService';
import { blog1, blog2, newHelm } from '../../assets';
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
      <div className={styles['blog-wrapper']}>
        <NavLink to={'/yamahaR1'} className={styles['blog-item']}>
          <img className={styles['blog-img']} src={blog1} alt="yama" />
          <div className={styles['blog-info']}>
            <span className={styles['info-date']}>March 30 </span>
            <span className={styles['info-header']}>Yamaha r1 2025</span>
            <span className={styles['info-text']}>Don’t miss the updated model of the iconic R1 series!</span>
          </div>
        </NavLink>
        <NavLink to={'/kawasaki'} className={styles['blog-item']}>
          <img className={styles['blog-img']} src={blog2} alt="kawasaki" />
          <div className={styles['blog-info']}>
            <span className={styles['info-date']}>February 25</span>
            <span className={styles['info-header']}>New classic model?</span>
            <span className={styles['info-text']}>Don’t miss the updated model of the iconic R1 series!</span>
          </div>
        </NavLink>
        <div className={styles['blog-item']}>
          <img className={styles['blog-img']} src={newHelm} alt="new helmets" />
          <div className={styles['blog-info']}>
            <span className={styles['info-date']}>May 5</span>
            <span className={styles['info-header']}>New classic model?</span>
            <span className={styles['info-text']}>Don’t miss the updated model of the iconic R1 series!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
