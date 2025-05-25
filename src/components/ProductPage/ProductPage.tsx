import type { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { queryProduct } from '../../api/request';

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const productData = await queryProduct(productId);
        setProduct(productData);
        console.log(productData);
      } catch (error) {
        console.error('Ошибка при получении товара:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div style={{ paddingTop: '120px' }}>Загрузка товара...</div>;
  }

  return (
    <div style={{ paddingTop: '120px' }}>
      <h1>Страница товара</h1>
      <p>ID товара: {productId}</p>
      {product && (
        <>
          <h2>{product.masterData.current.name['en-US']}</h2>
          <p></p>
        </>
      )}
    </div>
  );
};
