import axios from 'axios';

import { type LoginField } from '../components/LoginForm/schemas/loginSchemas';
import { COMMERCETOOLS_CONFIG } from '../constants';
import type { AuthResponse, MainTokenResponse } from '../types';

const { authUrl, projectKey, clientId, clientSecret, apiUrl } = COMMERCETOOLS_CONFIG;

const auth = {
  username: clientId,
  password: clientSecret,
};

export class CommerceToolsService {
  private static accessToken: string;
  private static mainToken: string;

  public static async authCustomer(values: LoginField): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${authUrl}/oauth/${projectKey}/customers/token`,
      new URLSearchParams({
        grant_type: 'password',
        username: values.email,
        password: values.password,
      }),
      {
        auth,
      },
    );

    CommerceToolsService.accessToken = response.data.access_token;
    localStorage.setItem('access_token', response.data.access_token);

    return response.data;
  }

  public static async getMainToken(): Promise<void> {
    const response = await axios.post<MainTokenResponse>(
      `${authUrl}/oauth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      { auth },
    );

    CommerceToolsService.mainToken = response.data.access_token;
  }

  public static async refreshToken(token: string): Promise<void> {
    try {
      const response = await axios.post<AuthResponse>(
        `${authUrl}/oauth/token`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: token,
        }),
        { auth },
      );

      CommerceToolsService.accessToken = response.data.access_token;
    } catch {
      localStorage.removeItem('refresh_token');
    }
  }

  public static async getMe(): Promise<void> {
    await axios.get(`${apiUrl}/${projectKey}/me`, {
      headers: {
        Authorization: `Bearer ${CommerceToolsService.accessToken}`,
      },
    });
  }

  public static async checkEmail(email: string): Promise<boolean> {
    if (!CommerceToolsService.mainToken) {
      await CommerceToolsService.getMainToken();
    }

    const response = await axios.get(`${apiUrl}/${projectKey}/customers?where=email="${encodeURIComponent(email)}"`, {
      headers: {
        Authorization: `Bearer ${CommerceToolsService.mainToken}`,
      },
    });

    return response.data.count;
  }
}
