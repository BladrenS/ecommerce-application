import type { Category, CategoryReference, Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { queryCategory, queryProduct } from '../../../api/request';

export const useProductData = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [category1, setCategory1] = useState<Category>();
  const [category2, setCategory2] = useState<Category>();
  const [loading, setIsLoading] = useState(true);
  const [category1Id, setCategory1Id] = useState<string>();
  const [category2Id, setCategory2Id] = useState<string>();

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productData = await queryProduct(productId);
        setProduct(productData);

        const categories: CategoryReference[] = productData.masterData.current.categories;

        setCategory1Id(categories[0].id);
        setCategory2Id(categories[1].id);

        const [cat1, cat2] = await Promise.all([
          categories[0]?.id ? queryCategory(categories[0].id) : Promise.resolve(undefined),
          categories[1]?.id ? queryCategory(categories[1].id) : Promise.resolve(undefined),
        ]);

        setCategory1(cat1);
        setCategory2(cat2);
      } catch (error) {
        console.error('Ошибка при получении данных продукта:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const current = product?.masterData?.current;
  const variant = current?.masterVariant;
  const price = variant?.prices?.[0]?.value?.centAmount;
  const discountedPrice = variant?.prices?.[0]?.discounted?.value?.centAmount;

  return {
    loading,
    product,
    category1Name: category1?.name?.['en-US'],
    category2Name: category2?.name?.['en-US'],
    images: variant?.images || [],
    name: current?.name?.['en-US'] || '',
    description: current?.description?.['en-US'] || '',
    price,
    discountedPrice,
    category1Id,
    category2Id,
  };
};
