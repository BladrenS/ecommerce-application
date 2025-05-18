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

export enum ErrorCodeResponse {
  BAD_REQUEST = 400,
  CONFLICT = 409,
}
