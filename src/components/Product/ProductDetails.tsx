import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addToCart, getOrCreateCart, removeFromCart } from '../../api/request';
import { addToWishlist, getOrCreateWishlist, removeFromWishlist } from '../../api/request';
import { FavoriteIcon } from '../../components/Header/parts';
import { Button } from '../../components/Ui';
import { centToDollar } from '../../utils/centToDollar';
import { forceUpdateHeaderCounters } from '../Header/constants';
import styles from './styles.module.scss';

type ProductDetailsProps = {
  name: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  category1?: string;
  category2?: string;
};

export const ProductDetails = ({
  name,
  description,
  price,
  discountedPrice,
  category1,
  category2,
}: ProductDetailsProps) => {
  const { productId } = useParams();
  const [itemInCart, setItemInCart] = useState(false);
  const [lineItemId, setLineItemId] = useState<string | null>(null);

  const [itemInWishlist, setItemInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  useEffect(() => {
    const checkItem = async () => {
      if (!productId) {
        setItemInCart(false);
        setLineItemId(null);
        setItemInWishlist(false);
        setWishlistItemId(null);
        return;
      }

      const cart = await getOrCreateCart();
      const lineItem = cart.lineItems.find((item) => item.productId === productId);
      if (lineItem) {
        setItemInCart(true);
        setLineItemId(lineItem.id);
      } else {
        setItemInCart(false);
        setLineItemId(null);
      }

      const wishlist = await getOrCreateWishlist();
      const wishItem = wishlist.lineItems.find((item) => item.productId === productId);
      if (wishItem) {
        setItemInWishlist(true);
        setWishlistItemId(wishItem.id);
      } else {
        setItemInWishlist(false);
        setWishlistItemId(null);
      }
    };

    checkItem();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!productId) return;
    const updatedCart = await addToCart(productId);
    const lineItem = updatedCart.lineItems.find((item: any) => item.productId === productId);
    if (lineItem) {
      setItemInCart(true);
      setLineItemId(lineItem.id);
      forceUpdateHeaderCounters();
    }
  };

  const handleRemoveFromCart = async () => {
    if (!lineItemId) return;
    await removeFromCart(lineItemId);
    setItemInCart(false);
    setLineItemId(null);
    forceUpdateHeaderCounters();
  };

  const handleToggleWishlist = async () => {
    if (!productId) return;

    if (itemInWishlist && wishlistItemId) {
      await removeFromWishlist(wishlistItemId);
      setItemInWishlist(false);
      setWishlistItemId(null);
      forceUpdateHeaderCounters();
    } else {
      const updatedWishlist = await addToWishlist(productId);
      const newItem = updatedWishlist.lineItems.find((item) => item.productId === productId);
      if (newItem) {
        setItemInWishlist(true);
        setWishlistItemId(newItem.id);
        forceUpdateHeaderCounters();
      }
    }
  };

  return (
    <div className={styles['product-info']}>
      <h2 className={styles['product-name']}>{name}</h2>
      <div className={styles.prices}>
        <div className={discountedPrice ? styles.sale : styles.standard}>{price && centToDollar(price)}</div>
        <div className={styles.price}>{discountedPrice && centToDollar(discountedPrice)}</div>
      </div>
      <h3 className={styles['description-header']}>Description:</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles['buttons-wrapper']}>
        {itemInCart ? (
          <Button className={styles.add} onClick={handleRemoveFromCart}>
            Remove from cart
          </Button>
        ) : (
          <Button className={styles.add} onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}

        <FavoriteIcon
          className={`${styles.like} ${itemInWishlist ? styles.liked : ''}`}
          onClick={handleToggleWishlist}
        />
      </div>

      <div className={styles.description}>
        Categories:
        <span className={styles['current-category']}>
          {category1}
          <span className={styles.delimiter}>•</span>
          {category2}
        </span>
      </div>
    </div>
  );
};
