import { type ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(): Promise<ProductProjectionPagedQueryResponse> {
    const response1 = await axios.get<ProductProjectionPagedQueryResponse>(
      `${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/categories`,
      {
        headers: {
          Authorization: `Bearer ${CommerceToolsService.accessToken}`,
        },
      },
    );

    console.log(response1);

    const response = await axios.get<ProductProjectionPagedQueryResponse>(
      `${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/product-projections/search`,
      {
        params: {
          filter: `categories.id:"d92f525a-7a01-4b7d-a270-6d758f221c0a"`,
          expand: 'categories',
        },
        headers: {
          Authorization: `Bearer ${CommerceToolsService.accessToken}`,
        },
      },
    );

    return response.data;
  }
}
