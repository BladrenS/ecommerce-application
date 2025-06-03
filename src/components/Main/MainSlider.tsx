import 'swiper/css/bundle';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

import type { FC } from 'react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { gloves, honda, kawa, mitz, sale, suzuki, yama } from '../../assets';
import styles from './styles.module.scss';

export const MainSlider: FC = () => {
  return (
    <Swiper
      modules={[Scrollbar, Autoplay]}
      slidesPerView={1}
      className={styles['my-swiper']}
      loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
    >
      <SwiperSlide className={styles.slide}>
        <div className={styles['slide-one']}>
          <img src={gloves} alt="Изображение товара" className={styles.gloves} />
          <div className={styles.action}>
            <div className={styles['action-header']}>Special Offer!</div>
            <div className={styles['action-text']}>
              Helmet <br />+<br /> Motorcycle Suit <br />=<br /> Free Gloves!
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles['slide-two-container']}>
        <div className={styles['slide-two']}>
          <i className={styles.green}></i>
          <i className={styles.pink}></i>
          <i className={styles.yellow}></i>
        </div>
        <div className={styles.info}>
          <span className={styles.spring}>SUMMER</span>
          <span className={styles.white}>SALE</span>
          <span className={styles.text}>Motorbike season kick-off with 15% discount</span>
          <div className={styles.promo}>
            <img src={sale} alt="sale" />
            <span style={{ marginLeft: '10px' }}>SPRING-SALE-15%</span>
          </div>
          <span className={styles.dates}>03.06.2025 - 15.07.2025</span>
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles['slide-three-container']}>
        <div className={styles.info}>
          <span className={styles.spring}>JAPANESE</span>
          <span className={styles.white}>spare parts</span>
          <div className={styles.text}>Now on sale with 15% discount!</div>
          <div className={styles.icons}>
            <img src={honda} alt="honda" className={styles.round} />
            <img src={kawa} alt="kawa" className={styles.round} />
            <img src={yama} alt="yama" className={styles.round} />
            <img src={mitz} alt="mitz" className={styles.round} />
            <img src={suzuki} alt="suzuki" className={styles.round} />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
