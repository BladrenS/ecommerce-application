import {
  bit,
  blog1,
  blog2,
  chain,
  facebook,
  harley,
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
  authUrl: process.env.REACT_APP_CTP_AUTH_URL || '',
  clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY || '',
  scope: process.env.REACT_APP_CTP_SCOPES || '',
  apiUrl: process.env.REACT_APP_CTP_API_URL || '',
};

export type BlogItem = {
  date: string;
  title: string;
  text: string;
  image: string;
  link?: string;
  index?: number;
};

export const blogItems: BlogItem[] = [
  {
    date: 'March 30',
    title: 'Yamaha R1 2025',
    text: 'Don’t miss the updated model of the iconic R1 series!',
    image: blog1,
    index: 0,
  },
  {
    date: 'February 25',
    title: 'Kawasaki Ninja H2R',
    text: 'The Untamed Hyperbike Redefining Speed',
    image: blog2,
    index: 1,
  },
  {
    date: 'May 5',
    title: 'Harley Davidson Nightster 2025',
    text: 'The New Era of Dark Custom',
    image: harley,
    index: 2,
  },
];

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
        id?: string;
      }
    | {
        to: string;
        label: string;
        disabled: boolean;
        id?: string;
      }
  )[];
}[] = [
  {
    header: 'General',
    links: [
      { to: '/profile', label: 'My account' },
      { to: '/about', label: 'About us' },
      { to: '/news', label: 'News' },
      { to: '', label: 'Career', disabled: true },
      { to: '/Cooperation', label: 'Cooperation', disabled: true },
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
      { to: '/catalog', label: 'Sport', id: '2ade6a19-0a51-4cde-8a70-b24326f0fcfd' },
      { to: '/catalog', label: 'Street', id: 'b0ec9a42-2df5-43e1-b3cd-382fe6e6bca4' },
      { to: '/catalog', label: 'Parts', id: 'c1f40b0b-6a6b-453b-86c2-658ec103f51c' },
      { to: '/catalog', label: 'Gear', id: '373e93bd-c96e-43ab-a438-d464049d05dd' },
      { to: '/catalog', label: 'Helmets', id: '3ee46543-fa9a-4132-b8d2-2ffe152c6cbb' },
    ],
  },
];

export const socialIcons: string[] = [twitter, linkedin, facebook, instagram, youtube];
export const paymentIcons: string[] = [paypal, visa, mastercard, bit];
