import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(
    filterQuery = 'categories.id:"d92f525a-7a01-4b7d-a270-6d758f221c0a"',
  ): Promise<ProductProjectionPagedSearchResponse> {
    const response = await axios.get<ProductProjectionPagedSearchResponse>(
      `${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/product-projections/search`,
      {
        params: {
          filter: filterQuery,
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${CommerceToolsService.accessToken}`,
        },
      },
    );

    console.log(response.data.results);

    return response.data;
  }
}
