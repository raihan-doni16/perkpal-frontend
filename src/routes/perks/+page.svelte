<script lang="ts">
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
  import StructuredData from '$lib/components/seo/StructuredData.svelte';
  import PerkGrid from '$lib/components/perks/PerkGrid.svelte';
  import PerkFilters from '$lib/components/perks/PerkFilters.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  export let data: any;
  import { SITE_NAME } from '$lib/config';
  const pageTitle = `Perks | ${SITE_NAME}`;
  const pageDesc = 'Browse and claim exclusive perks curated for startups and builders.';
</script>

<SEOHead title={pageTitle} description={pageDesc} />
<StructuredData schema={{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Perks', item: '/perks' }
  ]
}} />

<section class="container-w py-8">
  <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Perks' }]} />
  <h1 class="mt-2 text-3xl font-bold text-brand-richBlack">Perks</h1>
  <p class="text-sm text-brand-slateGray mt-1">Find and redeem the best perks for your needs.</p>

  <div class="mt-6">
    <PerkFilters categories={data.categories} locations={data.locations} current={data.current} />
  </div>

  {#if data.perks && data.perks.length}
    <div class="mt-6">
      <PerkGrid items={data.perks} />
    </div>
  {:else}
    <div class="mt-6 bg-white rounded-xl shadow-card p-10 text-center">
      <div class="text-xl font-semibold text-brand-richBlack">No perks found</div>
      <p class="mt-2 text-sm text-brand-slateGray">Try adjusting your filters or search query.</p>
      <a href="/perks" class="inline-flex mt-4 px-4 py-2 rounded-full bg-gray-100 text-brand-richBlack">Reset Filters</a>
    </div>
  {/if}

  <Pagination meta={data.meta} current={data.current} basePath={'/perks'} />
</section>
