<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Category } from '$lib/types/category';
  import type { LocationOption } from '$lib/types/location';
  export let categories: Category[] = [];
  export let locations: LocationOption[] = [];
  export let current: { category?: string; subcategory?: string; location?: string; search?: string; sort?: string } = {};
  export let basePath: string = '/perks';

  let selectedCategory = current.category || '';
  let selectedSubcategory = current.subcategory || '';
  let location = current.location || 'all';
  let search = current.search || '';
  let sort = (current.sort as string) || 'latest';
  let locationOptions: LocationOption[] = [];

  // Keep local state in sync when `current` changes (e.g., after reset)
  $: if (current) {
    selectedCategory = current.category || '';
    selectedSubcategory = current.subcategory || '';
    location = current.location || 'all';
    search = current.search || '';
    sort = (current.sort as string) || 'latest';
  }

  const fallbackLocations: LocationOption[] = [
    { id: 0, name: 'Global', slug: 'global' },
    { id: 0, name: 'Malaysia', slug: 'malaysia' },
    { id: 0, name: 'Singapore', slug: 'singapore' }
  ];

  $: subcategoryOptions = (categories.find(c => c.slug === selectedCategory)?.subcategories) || [];
  $: {
    const source = (locations?.length ? locations : fallbackLocations).slice();
    locationOptions = source
      .filter(loc => loc?.is_active ?? true)
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0) || a.name.localeCompare(b.name));
  }

  function buildUrl() {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
    if (location && location !== 'all') params.set('location', location);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ''}`;
  }

  function applyFilters() {
    goto(buildUrl(), { replaceState: true, keepFocus: true, noScroll: true });
  }

  function setCategory(slug: string) {
    selectedCategory = slug;
    selectedSubcategory = '';
    goto(buildUrl(), { replaceState: true, keepFocus: true, noScroll: true });
  }

  function setSubcategory(slug: string) {
    selectedSubcategory = slug;
    goto(buildUrl(), { replaceState: true, keepFocus: true, noScroll: true });
  }

  function setLocation(loc: string) {
    location = loc;
    goto(buildUrl(), { replaceState: true, keepFocus: true, noScroll: true });
  }

  function resetFilters() {
    goto('/perks', { replaceState: true, keepFocus: true, noScroll: true });
  }
</script>

<div class="rounded-2xl bg-gray-50 p-4 space-y-6">
  <div>
    <p class="text-xs font-semibold uppercase tracking-wide text-brand-slateGray">Categories</p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <button class="px-3 py-1 rounded-full border text-sm"
        class:bg-brand-darkGreen={selectedCategory === ''}
        class:text-white={selectedCategory === ''}
        class:border-brand-darkGreen={selectedCategory === ''}
        class:hover\:bg-gray-100={selectedCategory !== ''}
        on:click={() => setCategory('')}>
        All
      </button>
      {#each categories as c}
        <button class="px-3 py-1 rounded-full border text-sm"
          aria-pressed={selectedCategory === c.slug}
          class:bg-brand-darkGreen={selectedCategory === c.slug}
          class:text-white={selectedCategory === c.slug}
          class:border-brand-darkGreen={selectedCategory === c.slug}
          class:hover\:bg-gray-100={selectedCategory !== c.slug}
          on:click={() => setCategory(c.slug)}>
          {c.name}
        </button>
      {/each}
    </div>
  </div>

  {#if selectedCategory}
    <div>
      <p class="text-xs font-semibold uppercase tracking-wide text-brand-slateGray">Subcategories</p>
      {#if subcategoryOptions.length}
        <div class="mt-2 flex flex-wrap items-center gap-2">
          <button class="px-3 py-1 rounded-full border text-sm"
            class:bg-brand-darkGreen={selectedSubcategory === ''}
            class:text-white={selectedSubcategory === ''}
            class:border-brand-darkGreen={selectedSubcategory === ''}
            class:hover\:bg-gray-100={selectedSubcategory !== ''}
            on:click={() => setSubcategory('')}>
            All
          </button>
          {#each subcategoryOptions as sub}
            <button class="px-3 py-1 rounded-full border text-sm"
              aria-pressed={selectedSubcategory === sub.slug}
              class:bg-brand-darkGreen={selectedSubcategory === sub.slug}
              class:text-white={selectedSubcategory === sub.slug}
              class:border-brand-darkGreen={selectedSubcategory === sub.slug}
              class:hover\:bg-gray-100={selectedSubcategory !== sub.slug}
              on:click={() => setSubcategory(sub.slug)}>
              {sub.name}
            </button>
          {/each}
        </div>
      {:else}
        <p class="mt-2 text-sm text-brand-slateGray">No subcategories available for this category.</p>
      {/if}
    </div>
  {/if}

  <div>
    <p class="text-xs font-semibold uppercase tracking-wide text-brand-slateGray">Location</p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      {#each [{ name: 'All', slug: 'all' }, ...locationOptions] as loc (loc.slug)}
        <button class="px-3 py-1 rounded-full border text-sm"
          aria-pressed={location === loc.slug}
          class:bg-brand-darkGreen={location === loc.slug}
          class:text-white={location === loc.slug}
          class:border-brand-darkGreen={location === loc.slug}
          class:hover\:bg-gray-100={location !== loc.slug}
          on:click={() => setLocation(loc.slug)}>
          {loc.name}
        </button>
      {/each}
    </div>
  </div>
</div>
