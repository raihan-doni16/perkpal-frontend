import type { PageServerLoad } from './$types';
import { listJournal } from '$lib/api/journal';
import { listCategories } from '$lib/api/categories';
import type { Category } from '$lib/types/category';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const category = url.searchParams.get('category') || '';
  const page = Number(url.searchParams.get('page') || '1');
  const per_page = Number(url.searchParams.get('per_page') || '9');
  const [journalRes, categoriesRes] = await Promise.all([
    listJournal(fetch, { category, page, per_page }),
    listCategories(fetch).catch(() => ({ data: [] }))
  ]);

  const cmsCategories =
    (categoriesRes?.data || [])
      .map((cat: Category) => ({
        slug: cat?.slug || '',
        name: cat?.name || ''
      }))
      .filter((cat) => Boolean(cat.slug && cat.name));

  const fallbackCategories = Array.isArray((journalRes as any)?.categories)
    ? (journalRes as any).categories
        .map((cat: any) => ({
          slug: cat?.slug || (typeof cat === 'string' ? cat : ''),
          name: cat?.name || (typeof cat === 'string' ? cat : '')
        }))
        .filter((cat) => Boolean(cat.slug && cat.name))
    : [];

  const categories = cmsCategories.length ? cmsCategories : fallbackCategories;

  return {
    posts: journalRes.data,
    meta: journalRes.meta || null,
    categories,
    current: { category, page, per_page, ...(journalRes.current || {}) }
  };
};
