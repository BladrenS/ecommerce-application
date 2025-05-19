import type { MyCustomerDraft } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { RegistrationFormData } from 'src/pages/registrationPage/registrationForm/validation';

import { COMMERCETOOLS_CONFIG } from '../constants';
import { countryNameToCode } from '../constants/countries';
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
