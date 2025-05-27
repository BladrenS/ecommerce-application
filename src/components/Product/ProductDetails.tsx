import { FavoriteIcon } from '../../components/Header/parts';
import { Button } from '../../components/Ui';
import { centToDollar } from '../../utils/centToDollar';
import styles from './styles.module.scss';

type ProductDetailsProps = {
  name: string;
  description?: string;
  price?: number;
  discountedPrice?: number;
  category1?: string;
  category2?: string;
};

export const ProductDetails = ({
  name,
  description,
  price,
  discountedPrice,
  category1,
  category2,
}: ProductDetailsProps) => (
  <div className={styles['product-info']}>
    <h2 className={styles['product-name']}>{name}</h2>
    <div className={styles.prices}>
      <div className={styles.sale}>{price && centToDollar(price)}</div>
      <div className={styles.price}>{discountedPrice && centToDollar(discountedPrice)}</div>
    </div>
    <h3 className={styles.description_header}>Description:</h3>
    <p className={styles.description}>{description}</p>
    <div className={styles['buttons-wrapper']}>
      <Button className={styles.add}>Add to cart</Button>
      <FavoriteIcon className={styles.like} />
    </div>
    <div className={styles.description}>
      Categories:
      <span className={styles['current-category']}>
        {category1}
        <span className={styles.delimiter}>•</span>
        {category2}
      </span>
    </div>
  </div>
);
