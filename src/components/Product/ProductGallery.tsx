import 'swiper/css/bundle';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

import { A11y, Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

type ProductGalleryProps = {
  images: { url: string }[];
};

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  if (!images?.length) return <p>Изображения отсутствуют</p>;

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      effect="fade"
      slidesPerView={1}
      className={styles['my-swiper']}
      navigation
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image.url}
            alt={`Изображение товара ${index + 1}`}
            style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
