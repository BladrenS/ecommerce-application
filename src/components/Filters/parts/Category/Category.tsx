import clsx from 'clsx';
import type { ComponentProps, FC } from 'react';

import styles from './styles.module.scss';

interface CategoryProps extends ComponentProps<'li'> {
  order: string;
  name: string;
}

const MAIN_ORDER_HINT_CATEGORIES = 0.05;

export const Category: FC<CategoryProps> = ({ name, order, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={clsx(styles.category, { [styles['sub-category']]: +order > MAIN_ORDER_HINT_CATEGORIES })}
    >
      {name}: {order}
    </li>
  );
};
