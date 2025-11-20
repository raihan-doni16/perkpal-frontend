<script lang="ts">
  import { onMount } from 'svelte';
  import type { LocationOption } from '$lib/types/location';

  interface Category {
    id: number;
    name: string;
    slug: string;
  }

  interface Subcategory {
    id: number;
    name: string;
    slug: string;
    category_id?: number;
    category?: Category;
  }

  interface PerkMeta {
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    og_image?: string;
    og_title?: string;
    og_description?: string;
    twitter_title?: string;
    twitter_description?: string;
    keywords?: string;
  }

  interface PerkMedia {
    logo?: string;
    banner?: string;
    gallery?: string[];
  }

  interface Perk {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    short_description?: string;
    partner_name?: string;
    partner_logo?: string;
    redeem_type?: string;
    coupon_code?: string;
    external_url?: string;
    location?: string;
    valid_from?: string;
    valid_until?: string;
    is_active?: boolean;
    is_featured?: boolean;
    status?: string;
    category_id?: number;
    category?: Category;
    subcategory_id?: number;
    subcategory?: Subcategory;
    media?: PerkMedia;
    meta?: PerkMeta;
    published_at?: string;
  }

  export let perk: Perk | null = null;
  export let categories: Category[] = [];
  export let subcategories: Subcategory[] = [];
  export let locations: LocationOption[] = [];
  export let isFormValid = false;

  const fallbackLocations: LocationOption[] = [
    { id: 0, name: 'Malaysia', slug: 'malaysia' },
    { id: 0, name: 'Singapore', slug: 'singapore' },
    { id: 0, name: 'Global', slug: 'global' }
  ];

  const redemptionOptions = [
    { label: 'Affiliate link', value: 'external_link' },
    { label: 'Coupon code', value: 'coupon_code' },
    { label: 'Form submission', value: 'lead_form' }
  ];

  let location = perk?.location ?? 'global';
  let redeemType = perk?.redeem_type ?? 'external_link';
  let selectedCategory = '';
  let selectedSubcategory = '';
  let isActive = perk?.is_active ?? true;
  let isFeatured = perk?.is_featured ?? false;
  let status = perk?.status ?? 'draft';
  let isInitialLoad = true;
  let mounted = false;

  // Initialize category and subcategory on mount
  $: if (perk) {
    selectedCategory = perk?.category?.id ? String(perk.category.id) : (perk?.category_id ? String(perk.category_id) : '');
    selectedSubcategory = perk?.subcategory?.id ? String(perk.subcategory.id) : (perk?.subcategory_id ? String(perk.subcategory_id) : '');
  }

  // Form fields for validation
  let title = perk?.title ?? '';
  let slug = perk?.slug ?? '';
  let description = perk?.description ?? '';
  let partnerName = perk?.partner_name ?? '';

  // File upload states
  let selectedLogoFile: string | null = null;
  let selectedBannerFile: string | null = null;
  let selectedOgImageFile: string | null = null;

  // Auto-generate slug from title
  function generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  $: if (title && !perk) {
    slug = generateSlug(title);
  }

  // Validate form
  $: isFormValid =
    title.trim() !== '' &&
    slug.trim() !== '' &&
    description.trim() !== '' &&
    partnerName.trim() !== '' &&
    selectedCategory !== '';

  // Handle file input changes
  function handleLogoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    selectedLogoFile = file ? file.name : null;
  }

  function handleBannerChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    selectedBannerFile = file ? file.name : null;
  }

  function handleOgImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    selectedOgImageFile = file ? file.name : null;
  }

  $: filteredSubcategories = subcategories.filter((sub) => {
    const catId = sub.category_id ?? sub.category?.id;
    return selectedCategory ? String(catId) === String(selectedCategory) : false;
  });

  let locationOptions: LocationOption[] = [];
  $: {
    const source = (locations?.length ? locations : fallbackLocations).slice();
    locationOptions = source
      .filter((loc) => loc?.is_active ?? true)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Only reset subcategory after component is mounted and category changes
  $: if (mounted && !isInitialLoad && selectedCategory && !filteredSubcategories.some((sub) => String(sub.id) === selectedSubcategory)) {
    selectedSubcategory = '';
  }
  $: if (mounted && !isInitialLoad && !selectedCategory) {
    selectedSubcategory = '';
  }

  // Mark as loaded after first render
  onMount(() => {
    mounted = true;
    // Give enough time for the component to render with initial values
    setTimeout(() => {
      isInitialLoad = false;
    }, 200);
  });
</script>

<div class="space-y-8">
  <!-- General details -->
  <section class="space-y-6 rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
    <header>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-admin-muted">Perk Details</p>
      <h2 class="mt-2 text-lg font-semibold text-brand-richBlack">General information</h2>
      <p class="text-sm text-admin-muted">Match the values to the database fields so listing stays consistent.</p>
    </header>

    <!-- Method spoofing for Laravel PUT with FormData -->
    {#if perk}
      <input type="hidden" name="_method" value="PUT" />
    {/if}

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="perk_title">Title <span class="text-red-500">*</span></label>
        <input id="perk_title" name="title" bind:value={title} required
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="perk_slug">Slug <span class="text-red-500">*</span></label>
        <input id="perk_slug" name="slug" bind:value={slug} required
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div class="lg:col-span-2">
        <label class="text-sm font-medium text-admin-muted" for="short_description">Short Description</label>
        <textarea id="short_description" name="short_description" rows="3" value={perk?.short_description ?? ''} class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue"></textarea>
      </div>
      <div class="lg:col-span-2">
        <label class="text-sm font-medium text-admin-muted" for="description">Description <span class="text-red-500">*</span></label>
        <textarea id="description" name="description" rows="5" bind:value={description} required class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue"></textarea>
      </div>
      <div class="lg:col-span-2">
        <label class="text-sm font-medium text-admin-muted" for="partner_name">Vendor / Brand Name <span class="text-red-500">*</span></label>
        <input id="partner_name" name="partner_name" bind:value={partnerName} required
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>

      <div>
        <label class="text-sm font-medium text-admin-muted" for="category_id">Category <span class="text-red-500">*</span></label>
        <select id="category_id" name="category_id" bind:value={selectedCategory} required
                class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue">
          <option value="">Select category</option>
          {#each categories as category}
            <option value={String(category.id)}>{category.name}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="subcategory_id">Subcategory</label>
        <select id="subcategory_id" name="subcategory_id" bind:value={selectedSubcategory}
                class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue"
                disabled={!selectedCategory || filteredSubcategories.length === 0}>
          <option value="">{selectedCategory ? 'Choose subcategory' : 'Select a category first'}</option>
          {#if selectedCategory && filteredSubcategories.length}
            {#each filteredSubcategories as subcategory}
              <option value={String(subcategory.id)}>{subcategory.name}</option>
            {/each}
          {/if}
        </select>
      </div>

      <div class="lg:col-span-2 space-y-3">
        <p class="text-sm font-medium text-admin-muted">Logo Upload</p>
        <label class="relative flex cursor-pointer items-center gap-4 rounded-lg border border-admin-border bg-admin-white px-4 py-3 text-sm text-admin-muted hover:border-admin-blue transition">
          <input type="file" name="partner_logo" accept="image/*" class="hidden" on:change={handleLogoChange} />
          <span class="rounded-full bg-admin-blue px-3 py-1 text-white">Choose File</span>
          <span>{selectedLogoFile || (perk?.partner_logo || perk?.media?.logo ? 'Logo will be replaced on save' : 'No file chosen')}</span>
        </label>
        {#if perk?.partner_logo || perk?.media?.logo}
          <div class="mt-2">
            <p class="text-xs text-admin-muted">Current logo</p>
            <img src={perk?.partner_logo || perk?.media?.logo} alt="Perk logo" class="mt-2 max-h-14 w-auto rounded-lg border border-admin-border object-contain" />
          </div>
        {/if}
      </div>
      <div class="lg:col-span-2 space-y-3">
        <p class="text-sm font-medium text-admin-muted">Banner Pic Upload</p>
        <label class="relative flex cursor-pointer items-center gap-4 rounded-lg border border-admin-border bg-admin-white px-4 py-3 text-sm text-admin-muted hover:border-admin-blue transition">
          <input type="file" name="media_banner" accept="image/*" class="hidden" on:change={handleBannerChange} />
          <span class="rounded-full bg-admin-blue px-3 py-1 text-white">Choose File</span>
          <span>{selectedBannerFile || (perk?.media?.banner ? 'Banner will be replaced on save' : 'No file chosen')}</span>
        </label>
        {#if perk?.media?.banner}
          <div class="mt-2">
            <p class="text-xs text-admin-muted">Current banner</p>
            <img src={perk.media.banner} alt="Perk banner" class="mt-2 max-h-32 w-full rounded-2xl border border-admin-border object-cover" />
          </div>
        {/if}
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <input type="hidden" name="is_active" value={isActive ? '1' : '0'} />
      <label class="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" bind:checked={isActive} class="h-4 w-4 rounded border-gray-300 text-admin-blue focus:ring-admin-blue" />
        Active
      </label>
      <input type="hidden" name="is_featured" value={isFeatured ? '1' : '0'} />
      <label class="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" bind:checked={isFeatured} class="h-4 w-4 rounded border-gray-300 text-admin-blue focus:ring-admin-blue" />
        Featured
      </label>
    </div>
  </section>

  <!-- Location & Redemption -->
  <section class="space-y-6 rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-admin-muted">Location & Validity</p>
      <h3 class="mt-2 text-base font-semibold text-brand-richBlack">Location</h3>
    </div>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {#each locationOptions as option (option.slug)}
        <label
          class={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition ${location === option.slug ? 'border-admin-blue bg-admin-blue/10 text-brand-richBlack' : 'border-admin-border bg-white text-admin-muted'}`}>
          <input type="radio" name="location" class="sr-only" bind:group={location} value={option.slug} />
          {option.name}
        </label>
      {/each}
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="valid_from">Valid From</label>
        <input id="valid_from" name="valid_from" type="date" value={perk?.valid_from ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="valid_until">Valid Until</label>
        <input id="valid_until" name="valid_until" type="date" value={perk?.valid_until ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
    </div>

    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-admin-muted">Redemption</p>
      <div class="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {#each redemptionOptions as option}
          <label
            class={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition ${redeemType === option.value ? 'border-admin-blue bg-admin-blue/10 text-brand-richBlack' : 'border-admin-border bg-white text-admin-muted'}`}>
            <input type="radio" name="redeem_type" class="sr-only" bind:group={redeemType} value={option.value} />
            {option.label}
          </label>
        {/each}
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {#if redeemType === 'coupon_code'}
        <div>
          <label class="text-sm font-medium text-admin-muted" for="coupon_code">Coupon Code</label>
          <input id="coupon_code" name="coupon_code" value={perk?.coupon_code ?? ''}
                 class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
        </div>
      {/if}
      {#if redeemType !== 'coupon_code'}
        <div>
          <label class="text-sm font-medium text-admin-muted" for="external_url">{redeemType === 'lead_form' ? 'Form submission URL' : 'Affiliate Link'}</label>
          <input id="external_url" name="external_url" type="url" value={perk?.external_url ?? ''}
                 class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
        </div>
      {/if}
    </div>
  </section>

  <!-- Tags & SEO -->
  <section class="space-y-6 rounded-2xl border border-admin-border bg-white p-6 shadow-sm">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-admin-muted">Tags & SEO</p>
      <h3 class="mt-2 text-base font-semibold text-brand-richBlack">Visibility</h3>
    </div>
    <div class="space-y-4">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="keywords">Tags / Keywords</label>
        <input id="keywords" name="keywords" value={perk?.meta?.keywords ?? ''}
               placeholder="Enter tags, comma separated"
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="status">Status</label>
        <select id="status" name="status" bind:value={status}
                class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="meta_title">SEO Title</label>
        <input id="meta_title" name="meta_title" value={perk?.meta?.meta_title ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="canonical_url">Canonical URL</label>
        <input id="canonical_url" name="canonical_url" type="url" value={perk?.meta?.canonical_url ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div class="lg:col-span-2">
        <label class="text-sm font-medium text-admin-muted" for="meta_description">Meta Description</label>
        <textarea id="meta_description" name="meta_description" rows="3"
                  class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue">{perk?.meta?.meta_description ?? ''}</textarea>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="og_title">Open Graph Title</label>
        <input id="og_title" name="og_title" value={perk?.meta?.og_title ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="og_description">Open Graph Description</label>
        <input id="og_description" name="og_description" value={perk?.meta?.og_description ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div class="lg:col-span-2 space-y-3">
        <p class="text-sm font-medium text-admin-muted">Open Graph Image</p>
        <label class="relative flex cursor-pointer items-center gap-4 rounded-lg border border-admin-border bg-admin-white px-4 py-3 text-sm text-admin-muted hover:border-admin-blue transition">
          <input type="file" name="og_image" accept="image/*" class="hidden" on:change={handleOgImageChange} />
          <span class="rounded-full bg-admin-blue px-3 py-1 text-white">Choose File</span>
          <span>{selectedOgImageFile || (perk?.meta?.og_image ? 'Image will be replaced' : 'No file chosen')}</span>
        </label>
        {#if perk?.meta?.og_image}
          <div class="mt-2">
            <p class="text-xs text-admin-muted">Current OG image</p>
            <img src={perk?.meta?.og_image} alt="Open Graph preview" class="mt-2 max-h-40 w-full rounded-2xl border border-admin-border object-cover" />
          </div>
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <label class="text-sm font-medium text-admin-muted" for="twitter_title">Twitter Title</label>
        <input id="twitter_title" name="twitter_title" value={perk?.meta?.twitter_title ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
      <div>
        <label class="text-sm font-medium text-admin-muted" for="twitter_description">Twitter Description</label>
        <input id="twitter_description" name="twitter_description" value={perk?.meta?.twitter_description ?? ''}
               class="mt-1 w-full rounded-lg border border-admin-border bg-admin-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </div>
    </div>
  </section>
</div>
