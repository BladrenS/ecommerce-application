import 'swiper/css/bundle';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

import type { Product } from '@commercetools/platform-sdk';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { queryCategory, queryProduct } from '../../api/request';
import { FavoriteIcon } from '../../components/Header/parts';
import { Button, Loader } from '../../components/Ui';
import { centToDollar } from '../../utils/centToDollar';
import styles from './styles.module.scss';

type Category = any;

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category1, setCategory1] = useState<Category | undefined>();
  const [category2, setCategory2] = useState<Category | undefined>();
  const [loading, setIsLoading] = useState(true);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles['breadcrumbs'], {
      [styles.active]: isActive,
    });

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const productData = await queryProduct(productId);
        setProduct(productData);
        const getCategory = await queryCategory(productData.masterData.current.categories[0].id);
        setCategory1(getCategory);
        const getCategory2 = await queryCategory(productData.masterData.current.categories[1].id);
        setCategory2(getCategory2);
        console.log(productData);
      } catch (error) {
        console.error('Ошибка при получении товара:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const price: number | undefined = product?.masterData?.current?.masterVariant?.prices?.[0]?.value?.centAmount;
  const discountedPrice: number | undefined =
    product?.masterData?.current?.masterVariant?.prices?.[0]?.discounted?.value?.centAmount;

  if (loading) {
    return (
      <div className={styles['product-wrapper']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles['product-wrapper']}>
      <div className={styles.links}>
        <NavLink to={'/main'} className={getNavLinkClass}>
          MAIN
        </NavLink>
        <span className={styles.delimiter}>•</span>
        <NavLink to={'/catalog'} className={getNavLinkClass}>
          CATALOG
        </NavLink>
        <span className={styles.delimiter}>•</span>
        <NavLink to={'/catalog'} className={getNavLinkClass}>
          {category1 && category1.name['en-US']}
        </NavLink>
        <span className={styles.delimiter}>•</span>
        <NavLink to={'/catalog'} className={styles.active}>
          {category2 && category2.name['en-US']}
        </NavLink>
      </div>
      <div className={styles['product-container']}>
        {product?.masterData.current.masterVariant.images?.length ? (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
            effect="fade"
            slidesPerView={1}
            className={styles['my-swiper']}
            navigation
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {product.masterData.current.masterVariant.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.url}
                  alt={`Изображение товара ${index + 1}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Изображения отсутствуют</p>
        )}
        <div className={styles['product-info']}>
          {product && (
            <>
              <h2 className={styles['product-name']}>{product.masterData.current.name['en-US']}</h2>
              <div className={styles.prices}>
                <div className={styles.sale}>{price && centToDollar(price)}</div>
                <div className={styles.price}>{discountedPrice && centToDollar(discountedPrice)}</div>
              </div>
              <h3 className={styles.description_header}>Description:</h3>
              <p className={styles.description}>{product.masterData.current.description?.['en-US']}</p>
              <div className={styles['buttons-wrapper']}>
                <Button className={styles.add}>Add to cart</Button>
                <FavoriteIcon className={styles.like}></FavoriteIcon>
              </div>
              <div className={styles.description}>
                Categories:
                <span className={styles['current-category']}>
                  {category1 && category1.name['en-US']}
                  <span className={styles.delimiter}>•</span>
                  {category2 && category2.name['en-US']}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
