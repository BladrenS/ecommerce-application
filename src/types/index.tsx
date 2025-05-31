export enum AuthFieldName {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  token_type: string;
}

export interface MainTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface BaseAddress {
  id: string;
  city: string;
  country: string; // Country Code если что, а не страна, надо распарсить
  streetName: string;
  postalCode: string;
}

export interface MyCustomer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  defaultShippingAddress: number;
  defaultBillingAddress: number;
  addresses: BaseAddress[];
}

export enum ErrorCodeResponse {
  BAD_REQUEST = 400,
  CONFLICT = 409,
}
