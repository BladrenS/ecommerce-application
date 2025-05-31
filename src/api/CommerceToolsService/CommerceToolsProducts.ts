import type { CategoryPagedQueryResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(
    filters?: string[],
    sortQuery?: string,
    search?: string,
  ): Promise<ProductProjectionPagedSearchResponse> {
    const parameters: Record<string, any> = {
      limit: 9,
      withTotal: true,
      markMatchingVariants: true,
      offset: 0,
      facet: ['variants.price.centAmount: range(0 to *)'],
    };

    if (filters) {
      parameters['filter.query'] = filters;
    }

    if (sortQuery) {
      parameters.sort = sortQuery;
    }

    if (search) {
      parameters['text.en-US'] = search;
      parameters.fuzzy = 'true';
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

    return response.data;
  }

  public static async getCategories(): Promise<CategoryPagedQueryResponse> {
    const response = await axios.get<CategoryPagedQueryResponse>(`${this.apiUrl}/${this.projectKey}/categories`, {
      headers: {
        Authorization: `Bearer ${CommerceToolsService.accessToken}`,
      },
    });

    return response.data;
  }
}
