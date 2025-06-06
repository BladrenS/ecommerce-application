import type { FC } from 'react';

import type { FooterItemProps } from './FooterItem';
import styles from './styles.module.scss';

export const BackFooterItem: FC<FooterItemProps> = ({ text }) => {
  return <div className={styles['back-footer-item']}>{text}</div>;
};
