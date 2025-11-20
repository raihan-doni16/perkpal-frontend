<script lang="ts">
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import PerkDetail from '$lib/components/perks/PerkDetail.svelte';
  import { PERK_PLACEHOLDER } from '$lib/config';
  export let data: any;
  const p = data.perk;

  // Handle image error untuk related perks
  function handleImageError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img.src !== PERK_PLACEHOLDER) {
      img.src = PERK_PLACEHOLDER;
    }
  }

  // Get banner image dengan fallback ke placeholder
  function getBannerImage(perk: any): string {
    const banner = perk?.media?.banner;
    return (banner && typeof banner === 'string' && banner.trim().length > 0)
      ? banner
      : PERK_PLACEHOLDER;
  }
</script>

<SEOHead
  title={p?.meta?.meta_title || p?.title || 'Perk'}
  description={p?.meta?.meta_description || p?.short_description || ''}
  url={p?.meta?.canonical_url}
  image={p?.meta?.og_image || p?.media?.banner}
/>

<section class="container-w py-8">
  <PerkDetail perk={p} />
  {#if data.related && data.related.length}
    <div class="mt-10">
      <div class="text-2xl font-bold text-brand-richBlack mb-4">Related Perks</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.related as r}
          <a href={`/perks/${r.slug}`} class="block bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition">
            <div class="relative aspect-[16/9] bg-gray-100">
              <img
                src={getBannerImage(r)}
                alt={r.title || 'Related Perk'}
                class="w-full h-full object-cover"
                loading="lazy"
                on:error={handleImageError}
              />
            </div>
            <div class="p-4">
              <div class="text-sm text-gray-500 uppercase tracking-wide">{r.partner_name} • {r.location_label ?? r.location}</div>
              <div class="mt-1 font-semibold text-brand-richBlack">{r.title}</div>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</section>
