import clsx from 'clsx';
import type { ComponentProps, FC } from 'react';

import styles from './styles.module.scss';

interface CategoryProps extends ComponentProps<'li'> {
  name: string;
  checked: boolean;
}

export const Category: FC<CategoryProps> = ({ name, checked, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={clsx(styles.category, {
        [styles.active]: checked,
      })}
    >
      {name}
    </li>
  );
};
