import type { ComponentProps, FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const Button: FC<PropsWithChildren<ComponentProps<'button'>>> = ({ children, className, ...props }) => {
  const combinedClassName = [styles.button, className].filter(Boolean).join(' ');

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
