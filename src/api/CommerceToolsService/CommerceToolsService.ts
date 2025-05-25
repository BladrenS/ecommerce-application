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
}
