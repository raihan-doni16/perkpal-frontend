import type { Actions, PageServerLoad } from './$types';
import { adminCreateJournalPost, adminListCategories } from '$lib/api/admin';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const token = locals.token;
  if (!token) throw redirect(302, '/admin/login');

  const categoriesRes = await adminListCategories(token, fetch);
  return { categories: categoriesRes.data };
};

export const actions: Actions = {
  default: async ({ locals, request, fetch }) => {
    try {
      const token = locals.token!;
      const fd = await request.formData();
      if (!fd.get('published_at')) {
        fd.delete('published_at');
      }
      await adminCreateJournalPost(token, fd, fetch);
      return { success: true };
    } catch (error: any) {
      return fail(400, { error: error?.message || 'Failed to create journal post' });
    }
  }
};
