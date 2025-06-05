import type { FC } from 'react';

import { star } from '../../assets';
import styles from './styles.module.scss';

export type FooterItemProps = {
  text: string;
};

export const FooterItem: FC<FooterItemProps> = ({ text }) => {
  return (
    <div className={styles['footer-item']}>
      {text}
      <img src={star} alt="star" />
    </div>
  );
};
