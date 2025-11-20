import type { ApiListResponse } from '$lib/types/api';
import type { LocationOption } from '$lib/types/location';
import { apiGet } from './client';

export async function listLocations(fetcher?: typeof fetch) {
  return apiGet<ApiListResponse<LocationOption>>('/locations', fetcher);
}
