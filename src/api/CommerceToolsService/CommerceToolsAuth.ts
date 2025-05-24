import axios from 'axios';

import type { LoginField } from '../../components/LoginForm/schemas/loginSchemas';
import type { AuthResponse, MainTokenResponse } from '../../types';
import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsAuth extends CommerceToolsService {
  public static async authCustomer(values: LoginField): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${CommerceToolsService.authUrl}/oauth/${CommerceToolsService.projectKey}/customers/token`,
      new URLSearchParams({
        grant_type: 'password',
        username: values.email,
        password: values.password,
      }),
      {
        auth: CommerceToolsService.auth,
      },
    );

    CommerceToolsService.accessToken = response.data.access_token;

    return response.data;
  }

  public static async getMainToken(): Promise<void> {
    const response = await axios.post<MainTokenResponse>(
      `${CommerceToolsService.authUrl}/oauth/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
      }),
      { auth: CommerceToolsService.auth },
    );

    CommerceToolsService.mainToken = response.data.access_token;
  }

  public static async refreshToken(token: string): Promise<void> {
    try {
      const response = await axios.post<AuthResponse>(
        `${CommerceToolsService.authUrl}/oauth/token`,
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: token,
        }),
        { auth: CommerceToolsService.auth },
      );

      CommerceToolsService.accessToken = response.data.access_token;
    } catch {
      localStorage.removeItem('refresh_token');
    }
  }

  public static async checkEmail(email: string): Promise<boolean> {
    if (!CommerceToolsService.mainToken) {
      await this.getMainToken();
    }

    const response = await axios.get(`${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/customers`, {
      params: {
        where: `email="${email}"`,
      },
      headers: {
        Authorization: `Bearer ${CommerceToolsService.mainToken}`,
      },
    });

    return response.data.count;
  }
}
