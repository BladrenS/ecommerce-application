import {
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  ClientBuilder,
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';
import fetch from 'isomorphic-fetch';

import { COMMERCETOOLS_CONFIG } from '../constants/credentials';

const { authUrl, projectKey, clientId, clientSecret, apiUrl, scope } = COMMERCETOOLS_CONFIG;

const scopes = scope.split(' ');

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes,
  httpClient: fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
