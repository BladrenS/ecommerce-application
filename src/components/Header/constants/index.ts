import { CartIcon, FavoriteIcon, ProfileIcon } from '../parts';

export const HEADER_LINKS = [
  {
    href: '/login',
    text: 'Login',
  },
  {
    href: '/register',
    text: 'Register',
  },
  {
    href: '/main',
    text: 'Main',
  },
  {
    href: '/catalog',
    text: 'Catalog',
  },
  {
    href: '/news',
    text: 'News',
  },
  {
    href: '/about',
    text: 'About us',
  },
];

export const HEADER_ICONS = [
  {
    Component: CartIcon,
    href: '/cart',
    active: false,
  },
  {
    Component: FavoriteIcon,
    href: '/wishlist',
    active: false,
  },
  {
    Component: ProfileIcon,
    href: '/profile',
    active: false,
  },
];
