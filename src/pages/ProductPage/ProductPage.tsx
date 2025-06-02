import { Breadcrumbs } from '../../components/Product/Breadcrumbs';
import { useProductData } from '../../components/Product/logic/useProductData';
import { ProductDetails } from '../../components/Product/ProductDetails';
import { ProductGallery } from '../../components/Product/ProductGallery';
import { Loader } from '../../components/Ui';
import styles from './styles.module.scss';

export const ProductPage = () => {
  const {
    loading,
    name,
    description,
    images,
    price,
    discountedPrice,
    category1Name,
    category2Name,
    category1Id,
    category2Id,
  } = useProductData();

  if (loading) {
    return (
      <div className={styles['product-wrapper']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles['product-wrapper']}>
      <Breadcrumbs category1={category2Name} category2={category1Name} id1={category1Id} id2={category2Id} />
      <div className={styles['product-container']}>
        <ProductGallery images={images} />
        <ProductDetails
          name={name}
          description={description}
          price={price}
          discountedPrice={discountedPrice}
          category1={category1Name}
          category2={category2Name}
        />
      </div>
    </div>
  );
};
