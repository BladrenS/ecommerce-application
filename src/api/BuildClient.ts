import {
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  ClientBuilder,
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';
import fetch from 'isomorphic-fetch';

import { credentials } from './credentials';

const scopes = credentials.CTP_SCOPES.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: credentials.CTP_AUTH_URL,
  projectKey: credentials.CTP_PROJECT_KEY,
  credentials: {
    clientId: credentials.CTP_CLIENT_ID,
    clientSecret: credentials.CTP_CLIENT_SECRET,
  },
  scopes,
  httpClient: fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: credentials.CTP_API_URL,
  httpClient: fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
