import 'swiper/css/bundle';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { A11y, Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss';

type ProductGalleryProps = {
  images: { url: string }[];
};

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add(styles['no-scroll']);
    } else {
      document.body.classList.remove(styles['no-scroll']);
    }
    return () => {
      document.body.classList.remove(styles['no-scroll']);
    };
  }, [isModalOpen]);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        className={styles['my-swiper']}
        navigation
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        onClick={openModal}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url}
              alt={`Product image ${index + 1}`}
              style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Gallery Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <button onClick={closeModal} className={styles['close-button']}>
          x
        </button>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
          effect="fade"
          slidesPerView={1}
          navigation
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className={styles['modal-swiper']}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={`Modal product image ${index + 1}`}
                style={{ width: '100%', height: 'auto', borderRadius: '15px' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
};
