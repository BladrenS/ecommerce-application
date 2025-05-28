import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(
    filters?: string[],
    sortQuery?: string,
  ): Promise<ProductProjectionPagedSearchResponse> {
    const parameters: Record<string, unknown> = {
      limit: 100,
      withTotal: true,
      markMatchingVariants: true,
      offset: 0,
      facet: 'variants.price.centAmount: range(0 to *)',
    };

    if (filters) {
      parameters.filter = filters;
    }

    if (sortQuery) {
      parameters.sort = sortQuery;
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
