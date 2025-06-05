import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import axios from 'axios';

import { COMMERCETOOLS_CONFIG } from '../../constants';

const { authUrl, projectKey, clientId, clientSecret, apiUrl } = COMMERCETOOLS_CONFIG;

export class CommerceToolsService {
  protected static accessToken: string;
  protected static mainToken: string;
  protected static authUrl = authUrl;
  protected static projectKey = projectKey;
  protected static apiUrl = apiUrl;
  protected static auth = {
    username: clientId,
    password: clientSecret,
  };

  public static async getMe(): Promise<Customer> {
    const response = await axios.get(`${apiUrl}/${projectKey}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data;
  }

  public static async updateMe(actions: MyCustomerUpdateAction[]): Promise<Customer> {
    const me = await this.getMe();
    const response = await axios.post(
      `${apiUrl}/${projectKey}/me`,
      { version: me.version, actions },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
    return response.data;
  }

  public static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const me = await this.getMe();

    await axios.post(
      `${apiUrl}/${projectKey}/me/password`,
      {
        version: me.version,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      },
    );
  }
}
