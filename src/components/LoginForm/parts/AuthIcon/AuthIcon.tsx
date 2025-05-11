import type { ComponentProps, FC } from 'react';

import styles from './styles.module.scss';

interface IconAuthProps extends ComponentProps<'img'> {
  onClick: () => void;
}

export const AuthIcon: FC<IconAuthProps> = ({ onClick, ...props }) => {
  return <img onClick={onClick} className={styles.icon} {...props} />;
};
