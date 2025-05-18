import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const Button: FC<PropsWithChildren<ComponentProps<'button'>>> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
