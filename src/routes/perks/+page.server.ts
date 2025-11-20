import type { PageServerLoad } from './$types';
import { listPerks } from '$lib/api/perks';
import { listCategories } from '$lib/api/categories';
import { listLocations } from '$lib/api/locations';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const params: Record<string, string> = {};
  const allowed = ['page', 'per_page', 'category', 'subcategory', 'location', 'search', 'featured', 'sort'];
  for (const key of allowed) {
    const val = url.searchParams.get(key);
    if (val) params[key] = val;
  }

  const [perksRes, catsRes, locationsRes] = await Promise.all([
    listPerks(params, fetch),
    listCategories(fetch),
    listLocations(fetch)
  ]);

  return {
    perks: perksRes.data,
    meta: perksRes.meta,
    categories: catsRes.data,
    locations: locationsRes.data,
    current: params
  };
};
