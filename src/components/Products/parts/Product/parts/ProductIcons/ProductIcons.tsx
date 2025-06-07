import clsx from 'clsx';
import type { FC, MouseEvent } from 'react';

import { CartIcon, FavoriteIcon } from '../../../../../Header/parts';
import { useCart } from '../../../../../Product/logic/useCart';
import { useWishlist } from '../../../../../Product/logic/useWishlist';
import styles from './styles.module.scss';

export const ProductIcons: FC<{ id?: string }> = ({ id }) => {
  const { itemInWishlist, toggle } = useWishlist(id);
  const { itemInCart, add, remove } = useCart(id);

  const favoriteIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    toggle();
  };

  const cartIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (itemInCart) return;

    itemInCart ? remove() : add();
  };

  return (
    <div className={styles.icons}>
      <div className={styles['icon-container']} onClick={favoriteIconHandler}>
        <FavoriteIcon
          className={clsx(styles.icon, {
            [styles['item-in-favorite']]: itemInWishlist,
          })}
        />
      </div>
      <div className={styles['icon-container']} onClick={cartIconHandler}>
        <CartIcon
          className={clsx(styles.icon, {
            [styles['item-in-cart']]: itemInCart,
          })}
        />
      </div>
    </div>
  );
};
