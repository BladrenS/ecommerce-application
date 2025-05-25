import type {
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import axios from 'axios';

import { CommerceToolsService } from './CommerceToolsService';

export class CommerceToolsProducts extends CommerceToolsService {
  public static async getProducts(): Promise<ProductProjectionPagedQueryResponse> {
    const response = await axios.get<ProductProjectionPagedQueryResponse>(
      `${CommerceToolsService.apiUrl}/${CommerceToolsService.projectKey}/product-projections/search`,
      {
        params: {
          filter: `categories.id:"d92f525a-7a01-4b7d-a270-6d758f221c0a"`,
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

  public static async getFilteredProducts(filterQuery: string): Promise<ProductProjectionPagedSearchResponse> {
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

    return response.data;
  }
}
