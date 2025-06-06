import { getOrCreateCart, getOrCreateWishlist } from '../../../api/request';
import { CartIcon, FavoriteIcon, ProfileIcon } from '../parts';

export const HEADER_LINKS = [
  { href: '/login', text: 'Login' },
  { href: '/register', text: 'Register' },
  { href: '/main', text: 'Main' },
  { href: '/catalog', text: 'Catalog' },
  { href: '/news', text: 'News' },
  { href: '/about', text: 'About us' },
];

export const HEADER_ICONS = [
  {
    id: 'cart',
    Component: CartIcon,
    href: '/cart',
    active: false,
    counter: 0,
  },
  {
    id: 'wishlist',
    Component: FavoriteIcon,
    href: '/wishlist',
    active: false,
    counter: 0,
  },
  {
    id: 'profile',
    Component: ProfileIcon,
    href: '/profile',
    active: false,
    disabled: false,
    counter: 0,
  },
];

let updateCallback: ((icons: typeof HEADER_ICONS) => void) | null = null;

export function registerHeaderUpdater(function_: typeof updateCallback) {
  updateCallback = function_;
}

export async function forceUpdateHeaderCounters() {
  const cart = await getOrCreateCart();
  const wishlist = await getOrCreateWishlist();

  HEADER_ICONS[0].counter = cart.lineItems.length;
  HEADER_ICONS[1].counter = wishlist.lineItems.length;

  if (updateCallback) {
    updateCallback([...HEADER_ICONS]);
  }
}

export async function updateHeaderIconCounters() {
  const cart = await getOrCreateCart();
  const wishlist = await getOrCreateWishlist();

  HEADER_ICONS[0] = {
    ...HEADER_ICONS[0],
    counter: cart.lineItems.length,
  };
  HEADER_ICONS[1] = {
    ...HEADER_ICONS[1],
    counter: wishlist.lineItems.length,
  };

  return [...HEADER_ICONS];
}
