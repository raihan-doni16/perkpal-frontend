import type { ApiItemResponse, ApiListResponse } from '$lib/types/api';
import { apiGet } from './client';

export interface JournalItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  created_at?: string;
  reading_time?: number;
  category?: string | null;
  category_id?: number | null;
  category_slug?: string | null;
  category_data?: { id: number; name: string; slug: string } | null;
}

export async function listJournal(fetcher?: typeof fetch, params: { category?: string; page?: number; per_page?: number } = {}) {
  const qs = new URLSearchParams();
  if (params.category) qs.set('category', params.category);
  if (params.page) qs.set('page', String(params.page));
  if (params.per_page) qs.set('per_page', String(params.per_page));
  const path = `/journal${qs.toString() ? `?${qs.toString()}` : ''}`;
  return apiGet<any>(path, fetcher);
}

export async function getJournal(slug: string, fetcher?: typeof fetch) {
  return apiGet<ApiItemResponse<JournalItem>>(`/journal/${slug}`, fetcher);
}
