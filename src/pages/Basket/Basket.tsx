import type { Cart } from '@commercetools/platform-sdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addDiscountCode, changeLineItemQuantity, clearCart, getOrCreateCart, removeLineItem } from '../../api/request';
import { empty } from '../../assets';
import { Button, Loader } from '../../components/Ui';
import { baseModalStyle } from '../../constants/modal';
import styles from './styles.module.scss';

ReactModal.setAppElement('#root');

export const Basket = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const currentCart = await getOrCreateCart();
      setCart(currentCart);
      setPromoApplied(currentCart.discountCodes.length > 0);
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
      toast.success('Promo code successfully applied', {
        position: 'bottom-right',
        autoClose: 2000,
        theme: 'dark',
      });
      setCart(updated);
      setPromoCode('');
      setError('');
      setPromoApplied(true);
    } catch {
      setError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handleClearCart = async () => {
    if (cart && cart.lineItems.length > 0) {
      const updated = await clearCart(cart.id, cart.version);
      setCart(updated);
    }
    closeModal();
    toast.success('The shopping cart has been successfully cleared', {
      position: 'bottom-center',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  if (loading)
    return (
      <div className={styles.basket}>
        <Loader />
      </div>
    );

  const lineItems = cart?.lineItems ?? [];
  const totalPrice = cart?.totalPrice?.centAmount ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const originalTotal = lineItems.reduce((sum, item) => {
    return sum + item.price.value.centAmount * item.quantity;
  }, 0);

  return (
    <div className={styles.basket}>
      {lineItems.length === 0 ? (
        <div className={styles.empty}>
          <img className={styles.emptyImg} src={empty} alt="Empty cart" />
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
                const { id, name, quantity, variant, price } = item;
                const img = variant.images?.[0]?.url;

                const original = price.value.centAmount;
                const discounted = price.discounted?.value.centAmount;
                const hasDiscount = discounted !== undefined && discounted < original;
                const priceToShow = hasDiscount ? discounted : original;

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
                              <span className={styles.oldPrice}>${(original / 100).toFixed(2)}</span>
                              <span className={styles.newPrice}>${((priceToShow * quantity) / 100).toFixed(2)}</span>
                            </>
                          ) : (
                            <span>${((priceToShow * quantity) / 100).toFixed(2)}</span>
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
                          <div className={styles.soloPrice}>${(priceToShow / 100).toFixed(2)} per item</div>
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
                disabled={promoApplied}
              />
              <button className={styles.button} onClick={handleApplyPromo} disabled={promoApplied}>
                Apply
              </button>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {promoApplied && <div className={styles.success}>Promo code successfully applied</div>}
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.summary}>
              <span>Total:</span>
              {promoApplied && originalTotal > totalPrice ? (
                <>
                  <strong className={styles.oldTotal}>${(originalTotal / 100).toFixed(2)}</strong>
                  <strong className={styles.newTotal}>${(totalPrice / 100).toFixed(2)}</strong>
                </>
              ) : (
                <strong>${(totalPrice / 100).toFixed(2)}</strong>
              )}
            </div>
            <button className={styles.button} onClick={openModal}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
        contentLabel="Confirm Clear Cart"
        style={baseModalStyle}
      >
        <p>Are you sure you want to clear your cart? This action cannot be undone.</p>
        <div className={styles.modalActions}>
          <button className={styles.button} onClick={handleClearCart}>
            Yes, clear
          </button>
          <button className={styles.button} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </ReactModal>
    </div>
  );
};
