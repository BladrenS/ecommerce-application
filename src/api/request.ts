import type { Cart, MyCustomerDraft, ShoppingList } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { COMMERCETOOLS_CONFIG } from '../constants';
import { countryNameToCode } from '../constants/countries';
import type { RegistrationFormData } from '../pages/registrationPage/registrationForm/validation';
import { createSystemClient } from './BuildClient';

const ctpClient = createSystemClient(); // <-- системный клиент
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: COMMERCETOOLS_CONFIG.projectKey,
});

export const createCustomer = async (formData: RegistrationFormData) => {
  try {
    const addresses = [];

    const shippingAddress = {
      country: countryNameToCode[formData.country_shipping],
      streetName: formData.street_shipping,
      postalCode: formData.postalCode_shipping,
      city: formData.city_shipping,
    };

    addresses.push(shippingAddress);

    let billingAddress;
    if (!formData.shippingAsBilling) {
      billingAddress = {
        country: countryNameToCode[formData.country_billing!],
        streetName: formData.street_billing,
        postalCode: formData.postalCode_billing,
        city: formData.city_billing,
      };
      addresses.push(billingAddress);
    }

    const body: MyCustomerDraft = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth.toISOString().split('T')[0],
      addresses,
      defaultShippingAddress: 0,
      defaultBillingAddress: formData.shippingAsBilling ? 0 : 1,
    };

    const response = await apiRoot.me().signup().post({ body }).execute();

    if (response.statusCode !== 201) {
      console.error('Failed to create customer:', response.statusCode, response.body);
      throw new Error(`Failed to create customer. Status: ${response.statusCode}`);
    }

    return response.body;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const queryProduct = async (productID: string) => {
  const response = await apiRoot.products().withId({ ID: productID }).get().execute();
  return response.body;
};

export const queryCategory = async (categoryID: string) => {
  const response = await apiRoot.categories().withId({ ID: categoryID }).get().execute();
  return response.body;
};

export const queryCategories = async () => {
  const response = await apiRoot.categories().get().execute();
  return response.body;
};

export const getOrCreateCart = async (): Promise<Cart> => {
  const storedCartId = localStorage.getItem('cartId');
  if (storedCartId) {
    try {
      const cart = await apiRoot.carts().withId({ ID: storedCartId }).get().execute();
      return cart.body;
    } catch {
      localStorage.removeItem('cartId');
    }
  }
  const newCart = await apiRoot
    .carts()
    .post({
      body: { currency: 'USD' },
    })
    .execute();

  localStorage.setItem('cartId', newCart.body.id);
  return newCart.body;
};

export const addToCart = async (productId: string) => {
  const cart = await getOrCreateCart();

  const response = await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  return response.body;
};

export const removeFromCart = async (lineItemId: string) => {
  const cart = await getOrCreateCart();

  const response = await apiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  return response.body;
};

export const getOrCreateWishlist = async (): Promise<ShoppingList> => {
  const storedWishlistId = localStorage.getItem('wishlistId');
  if (storedWishlistId) {
    try {
      const wishlist = await apiRoot.shoppingLists().withId({ ID: storedWishlistId }).get().execute();
      return wishlist.body;
    } catch {
      localStorage.removeItem('wishlistId');
    }
  }

  const newWishlist = await apiRoot
    .shoppingLists()
    .post({
      body: {
        name: { en: 'My Wishlist' },
        key: `wishlist-${Date.now()}`,
      },
    })
    .execute();

  localStorage.setItem('wishlistId', newWishlist.body.id);
  return newWishlist.body;
};

export const addToWishlist = async (productId: string) => {
  const wishlist = await getOrCreateWishlist();

  const response = await apiRoot
    .shoppingLists()
    .withId({ ID: wishlist.id })
    .post({
      body: {
        version: wishlist.version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  return response.body;
};

export const removeFromWishlist = async (lineItemId: string) => {
  const wishlist = await getOrCreateWishlist();

  const response = await apiRoot
    .shoppingLists()
    .withId({ ID: wishlist.id })
    .post({
      body: {
        version: wishlist.version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  return response.body;
};
