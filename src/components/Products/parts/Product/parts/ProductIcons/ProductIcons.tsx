import clsx from 'clsx';
import type { FC, MouseEvent } from 'react';
import { toast } from 'react-toastify';

import { CartIcon, FavoriteIcon } from '../../../../../Header/parts';
import { useCart } from '../../../../../Product/logic/useCart';
import { useWishlist } from '../../../../../Product/logic/useWishlist';
import styles from './styles.module.scss';

interface ProductIconsProps {
  id?: string;
  name?: string;
}

export const ProductIcons: FC<ProductIconsProps> = ({ id, name }) => {
  const { itemInWishlist, toggle } = useWishlist(id);
  const { itemInCart, add, remove } = useCart(id);

  const createNotification = (message: string) => {
    toast.success(`${name} ${message}`, {
      position: 'bottom-left',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  const favoriteIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    toggle();

    itemInWishlist ? createNotification('removed from wishlist') : createNotification('added to wishlist');
  };

  const cartIconHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (itemInCart) return;

    if (itemInCart) {
      remove();
      createNotification('removed from cart');
    } else {
      add();
      createNotification('added to cart');
    }
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
