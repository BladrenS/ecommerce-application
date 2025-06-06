import { useEffect, useState } from 'react';

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

  const toggle = async () => {
    if (!productId) return;

    if (itemInWishlist && wishlistItemId) {
      await removeFromWishlist(wishlistItemId);
      setItemInWishlist(false);
      setWishlistItemId(null);
    } else {
      const updatedWishlist = await addToWishlist(productId);
      const newItem = updatedWishlist.lineItems.find((item) => item.productId === productId);
      if (newItem) {
        setItemInWishlist(true);
        setWishlistItemId(newItem.id);
      }
    }

    forceUpdateHeaderCounters();
  };

  return { itemInWishlist, toggle };
};
