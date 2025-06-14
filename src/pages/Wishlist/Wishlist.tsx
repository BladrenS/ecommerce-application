import type { Product } from '@commercetools/platform-sdk';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { getOrCreateWishlist, queryProduct } from '../../api/request';
import { empty } from '../../assets';
// import { Breadcrumbs } from '../../components/Product/Breadcrumbs';
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
      {/* <div className={styles['breadcrumbs-container']}>
        <Breadcrumbs />
        <span className={styles.delimiter}>•</span>
        <div className={styles.wish}>WISHLIST</div>
      </div> */}

      {wishlistProducts.length === 0 ? (
        <div className={styles['empty']}>
          <img src={empty} alt="Empty wishlist" />
          <h4 className={styles.emptyText}>Your wishlist is currently empty</h4>
          <NavLink to="/catalog" className={styles.catLink}>
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <ul className={styles.products}>
          {wishlistProducts.map(({ id, key, masterData }) => {
            const productData = masterData.current;
            return (
              <ProductCard
                key={id}
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
            );
          })}
        </ul>
      )}
    </div>
  );
};
