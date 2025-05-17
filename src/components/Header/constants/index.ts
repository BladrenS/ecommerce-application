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
    href: '/about',
    text: 'About us',
  },
];

export const HEADER_ICONS = [
  {
    Component: CartIcon,
    href: '/cart',
  },
  {
    Component: FavoriteIcon,
    href: '/like',
  },
  {
    Component: ProfileIcon,
    href: '/profile',
  },
];
