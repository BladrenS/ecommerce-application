import type { Cart } from '@commercetools/platform-sdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { addDiscountCode, changeLineItemQuantity, clearCart, getOrCreateCart, removeLineItem } from '../../api/request';
import { empty } from '../../assets';
import { Button, Loader } from '../../components/Ui';
import styles from './styles.module.scss';

export const Basket = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const currentCart = await getOrCreateCart();
      setCart(currentCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId: string, newQty: number) => {
    if (cart && newQty >= 1) {
      const updated = await changeLineItemQuantity(cart.id, cart.version, itemId, newQty);
      setCart(updated);
    }
  };

  const handleRemove = async (itemId: string) => {
    if (cart) {
      const updated = await removeLineItem(cart.id, cart.version, itemId);
      setCart(updated);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim() || !cart) return;
    try {
      const updated = await addDiscountCode(cart.id, cart.version, promoCode.trim());
      setCart(updated);
      setPromoCode('');
      setError('');
    } catch {
      setError('Invalid promo code');
    }
  };

  const handleClearCart = async () => {
    if (cart && cart.lineItems.length > 0) {
      const updated = await clearCart(cart.id, cart.version);
      setCart(updated);
    }
  };

  if (loading)
    return (
      <div className={styles.basket}>
        <Loader />
      </div>
    );

  const lineItems = cart?.lineItems ?? [];
  const totalPrice = cart?.totalPrice?.centAmount ?? 0;

  return (
    <div className={styles.basket}>
      {lineItems.length === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="Empty cart" />
          <h4 className={styles.emptyCart}>Oops! Your cart is empty</h4>
          <NavLink to="/catalog" className={styles.catLink}>
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <div className={styles.main}>
          <motion.ul className={styles.products} layout>
            <AnimatePresence>
              {lineItems.map((item) => {
                const { id, name, quantity, variant, price, discountedPricePerQuantity } = item;
                const img = variant.images?.[0]?.url;

                const original = price.value.centAmount / 100;
                const discounted = discountedPricePerQuantity?.[0]?.discountedPrice?.value?.centAmount;

                return (
                  <motion.li
                    key={id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    <div className={styles.item}>
                      <img src={img} alt={name?.['en-US']} />
                      <div className={styles.info}>
                        <h3>{name?.['en-US']}</h3>
                        <div className={styles.price}>
                          {discounted ? (
                            <>
                              <span className={styles.oldPrice}>${original.toFixed(2)}</span>
                              <span className={styles.newPrice}>${(discounted / 100).toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${(Number(original.toFixed(2)) * quantity).toFixed(2)}</span>
                          )}
                        </div>
                        <div className={styles.controls}>
                          <button className={styles.button} onClick={() => handleQuantityChange(id, quantity - 1)}>
                            -
                          </button>
                          <span>{quantity}</span>
                          <button className={styles.button} onClick={() => handleQuantityChange(id, quantity + 1)}>
                            +
                          </button>
                          <button className={styles.button} onClick={() => handleRemove(id)}>
                            Remove
                          </button>
                          <div className={styles.soloPrice}>${original.toFixed(2)} per item</div>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>

          <div className={styles.checkout}>
            <Button className={styles.checkoutButton}>Proceed to checkout</Button>
            <div className={styles.delivery}>You can choose available delivery options and times at checkout.</div>
            <div className={styles.yourCart}>Your cart</div>
            <div className={styles.promo}>
              <input
                type="text"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="Enter promo code"
              />
              <button className={styles.button} onClick={handleApplyPromo}>
                Apply
              </button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.summary}>
              <span>Total:</span>
              <strong>${(totalPrice / 100).toFixed(2)}</strong>
            </div>
            <button className={styles.button} onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
