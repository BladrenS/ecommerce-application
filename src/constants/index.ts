import {
  bit,
  chain,
  facebook,
  helmet,
  instagram,
  linkedin,
  mastercard,
  parts,
  paypal,
  twitter,
  visa,
  youtube,
} from '../assets/';

export const COMMERCETOOLS_CONFIG = {
  authUrl: process.env.CTP_AUTH_URL || '',
  clientId: process.env.CTP_CLIENT_ID || '',
  clientSecret: process.env.CTP_CLIENT_SECRET || '',
  projectKey: process.env.CTP_PROJECT_KEY || '',
  scope: process.env.CTP_SCOPES || '',
  apiUrl: process.env.CTP_API_URL || '',
};

export const promoItems: {
  img: string;
  text: string;
}[] = [
  {
    img: helmet,
    text: 'Gear up for the ride! This week only – special discounts on all motorcycle helmets. Stay safe and stylish without breaking the bank!',
  },
  {
    img: parts,
    text: 'Rev up your savings! Get top-quality motorcycle parts at unbeatable prices — for a limited time only. Keep your ride in peak condition without draining your wallet!',
  },
  {
    img: chain,
    text: 'Chain up and ride strong! Premium motorcycle chains now on sale — built for durability, priced for riders. Don’t miss the deal that keeps you moving!',
  },
];

export const footerLinks: {
  header: string;
  links: (
    | {
        to: string;
        label: string;
        disabled?: undefined;
      }
    | {
        to: string;
        label: string;
        disabled: boolean;
      }
  )[];
}[] = [
  {
    header: 'General',
    links: [
      { to: '/profile', label: 'My account' },
      { to: '/about', label: 'About us' },
      { to: '/blog', label: 'Blog' },
      { to: '', label: 'Career', disabled: true },
      { to: '/Cooperation', label: 'Cooperation' },
    ],
  },
  {
    header: 'Help & Guide',
    links: [
      { to: '', label: 'Help center', disabled: true },
      { to: '', label: 'How to buy', disabled: true },
      { to: '', label: 'Delivery', disabled: true },
      { to: '', label: 'Product Policy', disabled: true },
      { to: '', label: 'How to Return', disabled: true },
    ],
  },
  {
    header: 'Categories',
    links: [
      { to: '/profile', label: 'Cat' },
      { to: '/about', label: 'Cat' },
      { to: '/blog', label: 'Cat' },
      { to: '', label: 'Cat' },
      { to: '/Cooperation', label: 'Cat' },
    ],
  },
];

export const socialIcons: string[] = [twitter, linkedin, facebook, instagram, youtube];
export const paymentIcons: string[] = [paypal, visa, mastercard, bit];
