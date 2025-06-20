import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { addToWishlist, getOrCreateWishlist, removeFromWishlist } from '../../../api/request';
import { forceUpdateHeaderCounters } from '../../../components/Header/constants/index';

export const useWishlist = (productId: string | undefined) => {
  const [itemInWishlist, setItemInWishlist] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!productId) return;
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

    checkWishlist();
  }, [productId]);

  const toggle = async (name: string) => {
    if (!productId) return;

    if (itemInWishlist && wishlistItemId) {
      await removeFromWishlist(wishlistItemId);
      setItemInWishlist(false);
      setWishlistItemId(null);
      toast.success(`${name} removed from wishlist`, {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });
    } else {
      const updatedWishlist = await addToWishlist(productId);
      const newItem = updatedWishlist.lineItems.find((item) => item.productId === productId);
      if (newItem) {
        setItemInWishlist(true);
        setWishlistItemId(newItem.id);
        toast.success(`${name} added to wishlist`, {
          position: 'bottom-left',
          autoClose: 2000,
          theme: 'dark',
        });
      }
    }

    forceUpdateHeaderCounters();
  };

  return { itemInWishlist, toggle };
};
