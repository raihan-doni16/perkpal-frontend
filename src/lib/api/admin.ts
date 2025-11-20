import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { ApiListResponse, ApiItemResponse, ApiSettingsResponse } from '$lib/types/api';

const API_BASE = privateEnv.PRIVATE_API_BASE || publicEnv.PUBLIC_API_BASE;

function bearerHeaders(token: string) {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  } as const;
}

function jsonHeaders(token: string) {
  return {
    ...bearerHeaders(token),
    'Content-Type': 'application/json'
  } as const;
}

async function throwAdminApiError(res: Response, fallbackMessage: string): Promise<never> {
  const errorData = await res.json().catch(() => null);
  const message = (errorData as any)?.message || fallbackMessage;
  const error = new Error(message);
  (error as any).status = res.status;
  (error as any).details = errorData;
  throw error;
}

// Perks
export async function adminListPerks(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/perks${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch perks');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminCreatePerk(token: string, body: FormData | Record<string, any>, fetcher = fetch) {
  const isFormData = body instanceof FormData;
  const res = await fetcher(`${API_BASE}/admin/perks`, {
    method: 'POST',
    headers: isFormData ? bearerHeaders(token) : jsonHeaders(token),
    body: isFormData ? body : JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create perk' }));
    const error = new Error(errorData.message || 'Failed to create perk');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdatePerk(token: string, id: number | string, body: FormData | Record<string, any>, fetcher = fetch) {
  const isFormData = body instanceof FormData;

  // For FormData with file uploads, use POST with _method=PUT (Laravel method spoofing)
  if (isFormData) {
    const res = await fetcher(`${API_BASE}/admin/perks/${id}`, {
      method: 'POST',
      headers: bearerHeaders(token),
      body: body
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Failed to update perk' }));
      const error = new Error(errorData.message || 'Failed to update perk');
      (error as any).status = res.status;
      (error as any).details = errorData;
      throw error;
    }
    return res.json() as Promise<ApiItemResponse<any>>;
  }

  // For JSON body, use regular PUT
  const res = await fetcher(`${API_BASE}/admin/perks/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update perk' }));
    const error = new Error(errorData.message || 'Failed to update perk');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeletePerk(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/perks/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to delete perk');
}

export async function adminGetPerk(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/perks/${id}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch perk');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminListSubcategories(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/subcategories${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch subcategories');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminCreateSubcategory(token: string, body: Record<string, any>, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/subcategories`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create subcategory' }));
    const error = new Error(errorData.message || 'Failed to create subcategory');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdateSubcategory(token: string, id: number | string, body: Record<string, any>, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/subcategories/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update subcategory' }));
    const error = new Error(errorData.message || 'Failed to update subcategory');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteSubcategory(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/subcategories/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to delete subcategory' }));
    const error = new Error(errorData.message || 'Failed to delete subcategory');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
}

export async function adminListJournalPosts(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/journal${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch journal posts');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminGetJournalPost(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/journal/${id}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch journal post');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminCreateJournalPost(token: string, body: FormData | Record<string, any>, fetcher = fetch) {
  const isFormData = body instanceof FormData;
  const res = await fetcher(`${API_BASE}/admin/journal`, {
    method: 'POST',
    headers: isFormData ? bearerHeaders(token) : jsonHeaders(token),
    body: isFormData ? body : JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create journal post' }));
    const error = new Error(errorData.message || 'Failed to create journal post');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdateJournalPost(token: string, id: number | string, body: FormData | Record<string, any>, fetcher = fetch) {
  const isFormData = body instanceof FormData;

  // For FormData with file uploads, use POST with _method=PUT (Laravel method spoofing)
  // This is because Laravel doesn't support multipart/form-data with PUT natively
  if (isFormData) {
    // _method field should already be added in the form component
    const res = await fetcher(`${API_BASE}/admin/journal/${id}`, {
      method: 'POST',
      headers: bearerHeaders(token),
      body: body
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Failed to update journal post' }));
      const error = new Error(errorData.message || 'Failed to update journal post');
      (error as any).status = res.status;
      (error as any).details = errorData;
      throw error;
    }
    return res.json() as Promise<ApiItemResponse<any>>;
  }

  // For JSON body, use regular PUT
  const res = await fetcher(`${API_BASE}/admin/journal/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update journal post' }));
    const error = new Error(errorData.message || 'Failed to update journal post');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteJournalPost(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/journal/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to delete journal post' }));
    const error = new Error(errorData.message || 'Failed to delete journal post');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
}


// Categories
export async function adminListCategories(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/categories${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminCreateCategory(token: string, body: any, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/categories`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create category' }));
    const error = new Error(errorData.message || 'Failed to create category');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdateCategory(token: string, id: number | string, body: any, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/categories/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update category' }));
    const error = new Error(errorData.message || 'Failed to update category');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteCategory(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/categories/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to delete category' }));
    const error = new Error(errorData.message || 'Failed to delete category');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
}

// Locations
export async function adminListLocations(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/locations${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminCreateLocation(token: string, body: any, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/locations`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    await throwAdminApiError(res, 'Failed to create location');
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdateLocation(token: string, id: number | string, body: any, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/locations/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    await throwAdminApiError(res, 'Failed to update location');
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteLocation(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/locations/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) {
    await throwAdminApiError(res, 'Failed to delete location');
  }
}

// Settings (admin)
export async function adminGetSettings(token: string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/settings`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json() as Promise<ApiSettingsResponse<any>>;
}

export async function adminUpdateSettings(token: string, body: any, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/settings`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to update settings');
  return res.json() as Promise<ApiItemResponse<any>>;
}

// Leads
export async function adminListLeads(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/leads${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch leads');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminDeleteLead(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/leads/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to delete lead');
}

// Inbox
export async function adminListInbox(token: string, fetcher = fetch, params: Record<string, string | number | boolean> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/inbox${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch inbox');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminGetInboxMessage(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/${id}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch message');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminMarkInboxAsRead(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/${id}/mark-read`, {
    method: 'POST',
    headers: bearerHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to mark message as read');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminMarkInboxAsUnread(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/${id}/mark-unread`, {
    method: 'POST',
    headers: bearerHeaders(token)
  });
  if (!res.ok) throw new Error('Failed to mark message as unread');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteInboxMessage(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to delete message');
}

export async function adminBulkMarkInboxAsRead(token: string, ids: number[], fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/bulk-mark-read`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({ ids })
  });
  if (!res.ok) throw new Error('Failed to mark messages as read');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminBulkDeleteInbox(token: string, ids: number[], fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/inbox/bulk-delete`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({ ids })
  });
  if (!res.ok) throw new Error('Failed to delete messages');
  return res.json() as Promise<ApiItemResponse<any>>;
}

// User Management
export async function adminListUsers(token: string, fetcher = fetch, params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, String(v));
  });
  const res = await fetcher(`${API_BASE}/admin/users${qs.size ? `?${qs}` : ''}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json() as Promise<ApiListResponse<any>>;
}

export async function adminGetUser(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/users/${id}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminCreateUser(token: string, body: Record<string, any>, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/users`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create user' }));
    const error = new Error(errorData.message || 'Failed to create user');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdateUser(token: string, id: number | string, body: Record<string, any>, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/users/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update user' }));
    const error = new Error(errorData.message || 'Failed to update user');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeleteUser(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/users/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to delete user' }));
    const error = new Error(errorData.message || 'Failed to delete user');
    (error as any).status = res.status;
    (error as any).details = errorData;
    throw error;
  }
}

// Page Content Management (CMS)
export async function adminGetAllPageContents(token: string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch page contents');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminGetPages(token: string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/pages`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch pages structure');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminGetPageContent(token: string, pageName: string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/${pageName}`, { headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to fetch page content');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUpdatePageContent(token: string, body: Record<string, any>, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/update`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to update page content');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminBulkUpdatePageContent(token: string, sections: Record<string, any>[], fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/bulk-update`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({ sections })
  });
  if (!res.ok) throw new Error('Failed to bulk update page content');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminUploadPageContentImage(token: string, formData: FormData, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/upload-image`, {
    method: 'POST',
    headers: bearerHeaders(token),
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json() as Promise<ApiItemResponse<any>>;
}

export async function adminDeletePageContent(token: string, id: number | string, fetcher = fetch) {
  const res = await fetcher(`${API_BASE}/admin/page-content/${id}`, { method: 'DELETE', headers: bearerHeaders(token) });
  if (!res.ok) throw new Error('Failed to delete page content');
}
