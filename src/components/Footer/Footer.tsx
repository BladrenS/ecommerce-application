import { type FC, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { location, logo, mail, phone } from '../../assets/';
import { footerLinks, paymentIcons, promoItems, socialIcons } from '../../constants/';
import styles from './styles.module.scss';

export const Footer: FC = memo(() => {
  const { pathname } = useLocation();
  const handleClick = (id: string | undefined) => {
    if (id) {
      localStorage.setItem('filter', id);
    }
  };
  if (pathname === '/catalog') {
    for (const item of footerLinks[2].links) {
      item.disabled = true;
    }
  } else {
    for (const item of footerLinks[2].links) {
      item.disabled = false;
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-promo']}>
          {promoItems.map((item, i) => (
            <div key={i} className={styles['footer-promo-item']}>
              <img src={item.img} alt={`promo-${i}`} />
              <span className={styles.span}>{item.text}</span>
            </div>
          ))}
          <div className={styles['footer-promo-item']}>
            <h3>Want to be the first to know about all our deals? Subscribe now!</h3>
            <div className={styles['input-block']}>
              <input
                name="email-field"
                type="text"
                placeholder="enter your email address..."
                className={styles.input}
              />
              <div className={styles['yes-button']}>Yes</div>
            </div>
            <span className={styles.span}>
              Subscribe to our newsletter for updates on new arrivals, exclusive discounts, and notifications about our
              latest blog articles. Stay informed and enhance your moto experience with our expert tips and offers!
            </span>
          </div>
        </div>
      </div>

      <div className={styles['footer-connections']}>
        <NavLink to="/main" className={styles.shop}>
          <img src={logo} alt="logo" />
          хрустикshop
        </NavLink>
        <a
          className={styles['footer-connections-item']}
          href="https://maps.app.goo.gl/1jSjmqpZzkUWpoZJ8"
          target="_blank"
        >
          <img src={location} alt="mark" />
          Николаева ул., 2/1, Москва, 103274
        </a>
        <a href="mailto:connect@хрустикshop.com" className={styles['footer-connections-item']}>
          <img src={mail} alt="mail" />
          connect@хрустикshop.com
        </a>
        <a href="tel:+78005552525" className={styles['footer-connections-item']}>
          <img src={phone} alt="phone" />
          +7 800 555 25 25
        </a>
      </div>

      <div className={styles['footer-container']}>
        {footerLinks.map((block, index) => (
          <div className={styles['footer-links-block']} key={index}>
            <h2 className={styles['links-header']}>{block.header}</h2>
            {block.links.map((link, i) =>
              link.disabled ? (
                <div key={i} className={styles.disabled}>
                  {link.label}
                </div>
              ) : (
                <NavLink key={i} to={link.to} className={styles['footer-link']} onClick={() => handleClick(link.id)}>
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
        ))}

        <div className={styles['footer-icons-block']}>
          <h2 className={styles.paragraph}>Social Media</h2>
          <div className={styles['icons-container']}>
            {socialIcons.map((icon, i) => (
              <img key={i} src={icon} alt={`social-${i}`} className={styles.icon} />
            ))}
          </div>
          <h2 className={styles.paragraph}>We accept</h2>
          <div className={styles['icons-container']}>
            {paymentIcons.map((icon, i) => (
              <img key={i} src={icon} alt={`payment-${i}`} width="32" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});
