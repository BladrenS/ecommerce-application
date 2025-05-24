import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsUser extends CommerceToolsService {
  public static async getMe(): Promise<void> {
    await axios.get(`${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/me`, {
      headers: {
        Authorization: `Bearer ${CommerceToolsService.accessToken}`,
      },
    });
  }
}
