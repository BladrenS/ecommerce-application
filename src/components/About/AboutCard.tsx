import type { FC } from 'react';

import { dcb, gitimg, locationimg, logo } from '../../assets';
import { BackFooterItem } from './BackFooterItem';
import { FooterItem } from './FooterItem';
import styles from './styles.module.scss';

type CardProps = {
  link: string;
  name: string;
  photo: string;
  location: string;
  git: string;
  header: string;
  done: string[];
  text: string;
  contribution: string[];
};

export const Card: FC<CardProps> = ({ link, name, photo, location, git, header, done, text, contribution }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className={styles.card}>
    <div className={styles['cards-inner-front']}>
      <img src={dcb} className={styles['card-top-bg']} alt="background" />
      <img src={photo} className={styles['card-photo']} alt={`${name}'s photo`} />

      <div className={styles['inner-header']}>
        <span className={styles.name}>{name}</span>
        <span>Developer</span>
      </div>

      <div className={styles['inner-info']}>
        {[
          { icon: locationimg, text: location },
          { icon: logo, text: 'Desperados Team Inc.' },
          { icon: gitimg, text: git },
        ].map(({ icon, text }, index) => (
          <div key={index} className={styles['inner-item']}>
            <img src={icon} alt="icon" className={styles.icons} />
            <span className={styles.info}>{text}</span>
          </div>
        ))}
      </div>

      <div className={styles['inner-footer']}>
        {done.map((item, index) => (
          <FooterItem key={index} text={item} />
        ))}
      </div>
    </div>

    <div className={styles['cards-inner-back']}>
      <div className={styles['inner-back-header']}>{header}</div>

      <div className={styles['inner-back-info']}>
        <div className={styles['back-info-header']}>About</div>
        <div className={styles['back-info-text']}>{text}</div>

        <div className={styles['inner-back-footer']}>
          <div className={styles['back-footer-header']}>Contribution</div>
          <div className={styles['back-footer-items']}>
            {contribution.map((item, index) => (
              <BackFooterItem key={index} text={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </a>
);
