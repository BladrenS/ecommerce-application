import { type AuthMiddlewareOptions, ClientBuilder } from '@commercetools/ts-client';
import fetch from 'isomorphic-fetch';

import { COMMERCETOOLS_CONFIG } from '../constants';

const { authUrl, projectKey, clientId, clientSecret, apiUrl, scope } = COMMERCETOOLS_CONFIG;

const httpMiddlewareOptions = {
  host: apiUrl,
  httpClient: fetch,
};

// ---------- АНОНИМНЫЙ КЛИЕНТ ----------
export const createAnonymousClient = (anonymousId?: string) => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: { clientId, clientSecret },
    scopes: scope.split(' '),
    httpClient: fetch,
  };

  const builder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions).withAnonymousSessionFlow({
    ...authMiddlewareOptions,
    ...(anonymousId ? { anonymousId } : {}),
  });

  return builder.build();
};

// ---------- СИСТЕМНЫЙ КЛИЕНТ ----------
export const createSystemClient = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey,
    credentials: { clientId, clientSecret },
    scopes: scope.split(' '),
    httpClient: fetch,
  };

  const builder = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions);

  return builder.build();
};
