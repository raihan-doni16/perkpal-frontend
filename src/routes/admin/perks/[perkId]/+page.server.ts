import type { Actions, PageServerLoad } from './$types';
import { adminGetPerk, adminListCategories, adminListLocations, adminListSubcategories, adminUpdatePerk } from '$lib/api/admin';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
  const token = locals.token;
  if (!token) throw redirect(302, '/admin/login');

  const [categoriesRes, subcategoriesRes, locationsRes, perkRes] = await Promise.all([
    adminListCategories(token, fetch, { per_page: 200 }),
    adminListSubcategories(token, fetch),
    adminListLocations(token, fetch, { per_page: 200 }),
    adminGetPerk(token, params.perkId, fetch)
  ]);

  return {
    categories: categoriesRes.data,
    subcategories: subcategoriesRes.data,
    locations: locationsRes.data,
    perk: perkRes.data
  };
};

export const actions: Actions = {
  default: async ({ locals, request, fetch, params }) => {
    try {
      const token = locals.token;
      if (!token) throw redirect(302, '/admin/login');
      const fd = await request.formData();
      const intent = String(fd.get('intent') || 'save');
      if (!fd.get('status')) {
        fd.set('status', 'draft');
      }
      if (intent === 'publish') {
        fd.set('status', 'published');
        fd.set('published_at', new Date().toISOString());
      }
      const updated = await adminUpdatePerk(token, params.perkId, fd, fetch);
      return {
        success: true,
        intent,
        perk: updated?.data ?? null
      };
    } catch (error) {
      return fail(400, { error: 'Failed to update perk. Please review the inputs and try again.' });
    }
  }
};
