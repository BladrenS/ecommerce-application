import { useEffect, useState } from 'react';

import { addToCart, getOrCreateCart, removeFromCart } from '../../../api/request';
import { forceUpdateHeaderCounters } from '../../../components/Header/constants/index';

export const useCart = (productId: string | undefined) => {
  const [itemInCart, setItemInCart] = useState(false);
  const [lineItemId, setLineItemId] = useState<string | null>(null);

  useEffect(() => {
    const checkCart = async () => {
      if (!productId) return;
      const cart = await getOrCreateCart();
      const lineItem = cart.lineItems.find((item) => item.productId === productId);
      if (lineItem) {
        setItemInCart(true);
        setLineItemId(lineItem.id);
      } else {
        setItemInCart(false);
        setLineItemId(null);
      }
    };

    checkCart();
  }, [productId]);

  const add = async () => {
    if (!productId) return;
    const updatedCart = await addToCart(productId);
    const lineItem = updatedCart.lineItems.find((item: any) => item.productId === productId);
    if (lineItem) {
      setItemInCart(true);
      setLineItemId(lineItem.id);
      forceUpdateHeaderCounters();
    }
  };

  const remove = async () => {
    if (!lineItemId) return;
    await removeFromCart(lineItemId);
    setItemInCart(false);
    setLineItemId(null);
    forceUpdateHeaderCounters();
  };

  return { itemInCart, add, remove };
};
