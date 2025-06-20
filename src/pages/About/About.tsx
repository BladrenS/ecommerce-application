import type { FC } from 'react';

import { school } from '../../assets';
import { Card } from '../../components/About/AboutCard';
import { aboutInfo } from '../../constants/aboutInfo';
import styles from './styles.module.scss';

export const About: FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.team}>Desperados Team</div>
      <div className={styles['cards-container']}>
        {aboutInfo.map((person, index) => (
          <Card key={index} {...person} />
        ))}
      </div>
      <a href="https://rs.school/" target="_blank" className={styles.rss}>
        <img src={school} alt="rss" />
      </a>
    </div>
  );
};
