import type { Actions, PageServerLoad } from './$types';
import { adminGetJournalPost, adminListCategories, adminUpdateJournalPost } from '$lib/api/admin';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
  const token = locals.token;
  if (!token) throw redirect(302, '/admin/login');

  const [categoriesRes, postRes] = await Promise.all([
    adminListCategories(token, fetch),
    adminGetJournalPost(token, params.postId, fetch)
  ]);

  return {
    categories: categoriesRes.data,
    post: postRes.data
  };
};

export const actions: Actions = {
  default: async ({ locals, request, fetch, params }) => {
    try {
      const token = locals.token!;
      const fd = await request.formData();
      const id = params.postId;
      if (!fd.get('published_at')) {
        fd.delete('published_at');
      }
      await adminUpdateJournalPost(token, id, fd, fetch);
      return { success: true };
    } catch (error: any) {
      return fail(400, { error: error?.message || 'Failed to update journal post' });
    }
  }
};
