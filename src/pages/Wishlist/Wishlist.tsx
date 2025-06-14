import type { Product } from '@commercetools/platform-sdk';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getOrCreateWishlist, queryProduct } from '../../api/request';
import { empty } from '../../assets';
import { Product as ProductCard } from '../../components/Products/parts/Product/Product';
import { Loader } from '../../components/Ui';
import styles from './styles.module.scss';

export const Wishlist: FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const wishlist = await getOrCreateWishlist();
      const lineItems = wishlist.lineItems;

      const productResults = await Promise.all(
        lineItems.map(async (item) => {
          if (item.productId) {
            try {
              const product = await queryProduct(item.productId);
              return product;
            } catch (error) {
              console.warn(`Failed to fetch product ${error} ${item.productId}`);
            }
          }
          return null;
        }),
      );

      const filteredProducts = productResults.filter((product): product is Product => product !== null);
      setWishlistProducts(filteredProducts);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [wishlistProducts]);

  if (loading) {
    return (
      <div className={styles.wishlist}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.wishlist}>
      {wishlistProducts.length === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="Empty wishlist" />
          <h4 className={styles.emptyText}>Your wishlist is currently empty</h4>
          <NavLink to="/catalog" className={styles.catLink}>
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <motion.ul className={styles.products} layout>
          <AnimatePresence>
            {wishlistProducts.map(({ id, key, masterData }) => {
              const productData = masterData.current;
              return (
                <motion.li
                  key={id}
                  layout // Анимация при изменении порядка
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    id={id}
                    name={productData.name?.['en-US'] || ''}
                    description={productData.description?.['en-US'] || ''}
                    imageUrl={productData.masterVariant.images?.[0]?.url || ''}
                    price={productData.masterVariant.prices?.[0]}
                    imageAlt={key || ''}
                    onWishlistRemove={async () => {
                      await fetchWishlist();
                    }}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
};
