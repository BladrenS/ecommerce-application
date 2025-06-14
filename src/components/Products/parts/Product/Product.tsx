import { type Price } from '@commercetools/platform-sdk';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { centToDollar } from '../../../../utils/centToDollar';
import { ProductIcons } from './parts';
import styles from './styles.module.scss';

interface ProductProps {
  name: string;
  description: string;
  imageUrl: string;
  price: Price;
  imageAlt: string;
  id: string;
  onWishlistRemove?: () => void;
}

export const Product: FC<Partial<ProductProps>> = ({
  name,
  description,
  price,
  imageUrl,
  imageAlt,
  id,
  onWishlistRemove,
}) => {
  const navigate = useNavigate();
  const priceFormatted = centToDollar(price?.value.centAmount);

  return (
    <li className={styles.product} onClick={() => navigate(`/product/${id}`)}>
      <ProductIcons id={id} name={name} onWishlistRemove={onWishlistRemove} />
      <img src={imageUrl} alt={imageAlt} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles['price-container']}>
          {price?.discounted ? (
            <>
              <div className={styles['new-price']}>{centToDollar(price.discounted.value.centAmount)}</div>
              <div className={styles['old-price']}>{priceFormatted}</div>
            </>
          ) : (
            <div className={styles.price}>{priceFormatted}</div>
          )}
        </div>
        <div className={styles.text}>{description}</div>
        <div className={styles.link}>More</div>
      </div>
    </li>
  );
};
