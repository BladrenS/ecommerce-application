import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

  const add = async (name: string) => {
    if (!productId) return;
    const updatedCart = await addToCart(productId);
    const lineItem = updatedCart.lineItems.find((item: any) => item.productId === productId);
    if (lineItem) {
      setItemInCart(true);
      setLineItemId(lineItem.id);
      forceUpdateHeaderCounters();
      toast.success(`${name} added to cart`, {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const remove = async (name: string) => {
    if (!lineItemId) return;
    await removeFromCart(lineItemId);
    setItemInCart(false);
    setLineItemId(null);
    forceUpdateHeaderCounters();
    toast.success(`${name} deleted from cart`, {
      position: 'bottom-left',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  return { itemInCart, add, remove };
};
