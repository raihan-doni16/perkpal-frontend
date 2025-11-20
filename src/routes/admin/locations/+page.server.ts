import type { Actions, PageServerLoad } from './$types';
import { adminCreateLocation, adminDeleteLocation, adminListLocations, adminUpdateLocation } from '$lib/api/admin';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
  const token = locals.token;
  if (!token) throw redirect(302, '/admin/login');
  const page = Number(url.searchParams.get('page') || 1);
  const per_page = Number(url.searchParams.get('per_page') || 10);
  const search = url.searchParams.get('search') || '';
  const res = await adminListLocations(token, fetch, { page, per_page, search });
  return { items: res.data, meta: res.meta, query: { page, per_page, search } };
};

function parseLocationPayload(fd: FormData) {
  const displayOrder = Number(fd.get('display_order'));
  return {
    name: String(fd.get('name') || '').trim(),
    slug: String(fd.get('slug') || '').trim(),
    description: fd.get('description') ? String(fd.get('description')) : undefined,
    display_order: Number.isFinite(displayOrder) ? displayOrder : 0,
    is_active: Boolean(fd.get('is_active'))
  };
}

export const actions: Actions = {
  create: async ({ locals, request, fetch }) => {
    try {
      const token = locals.token!;
      const fd = await request.formData();
      const payload = parseLocationPayload(fd);
      await adminCreateLocation(token, payload, fetch);
      return { success: true };
    } catch (error: any) {
      console.error('Error creating location:', error);
      let errorMessage = 'Failed to create location';
      if (error?.message) {
        errorMessage = error.message;
      }
      return fail(400, { error: errorMessage });
    }
  },
  update: async ({ locals, request, fetch }) => {
    try {
      const token = locals.token!;
      const fd = await request.formData();
      const id = String(fd.get('id'));
      const payload = parseLocationPayload(fd);
      await adminUpdateLocation(token, id, payload, fetch);
      return { success: true };
    } catch (error: any) {
      console.error('Error updating location:', error);
      let errorMessage = 'Failed to update location';
      if (error?.message) {
        errorMessage = error.message;
      }
      return fail(400, { error: errorMessage });
    }
  },
  delete: async ({ locals, request, fetch }) => {
    try {
      const token = locals.token!;
      const fd = await request.formData();
      const id = String(fd.get('id'));
      await adminDeleteLocation(token, id, fetch);
      return { success: true };
    } catch (error: any) {
      console.error('Error deleting location:', error);
      let errorMessage = 'Failed to delete location';
      if (error?.message) {
        errorMessage = error.message;
      }
      return fail(400, { error: errorMessage });
    }
  }
};
