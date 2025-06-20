import clsx from 'clsx';
import type { FC, MouseEvent } from 'react';

import { CartIcon, FavoriteIcon } from '../../../../../Header/parts';
import { useCart } from '../../../../../Product/logic/useCart';
import { useWishlist } from '../../../../../Product/logic/useWishlist';
import styles from './styles.module.scss';

interface ProductIconsProps {
  id?: string;
  name?: string;
  onWishlistRemove?: () => void;
}

export const ProductIcons: FC<ProductIconsProps> = ({ id, name, onWishlistRemove }) => {
  const { itemInWishlist, toggle } = useWishlist(id);
  const { itemInCart, add, remove } = useCart(id);

  const carIconsToggler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (name) toggle(name);
  };

  const cartIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (itemInCart) return;

    if (itemInCart) {
      if (name) remove(name);
      onWishlistRemove?.();
    } else {
      if (name) add(name);
    }
  };

  return (
    <div className={styles.icons}>
      <div className={styles['icon-container']} onClick={carIconsToggler}>
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
