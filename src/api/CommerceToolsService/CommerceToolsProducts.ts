import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(filters?: string): Promise<ProductProjectionPagedSearchResponse> {
    const parameters: { limit: number; filter?: string } = { limit: 100 };

    if (filters) {
      parameters.filter = filters;
    }

    const response = await axios.get<ProductProjectionPagedSearchResponse>(
      `${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/product-projections/search`,
      {
        params: parameters,
        headers: {
          Authorization: `Bearer ${CommerceToolsService.accessToken}`,
        },
      },
    );

    console.log(response.data);

    return response.data;
  }
}
