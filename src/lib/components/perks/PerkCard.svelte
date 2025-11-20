<script lang="ts">
  export let title = 'Sample Perk';
  export let partner = 'Partner';
  export let location = 'global';
  export let href = '#';
  export let image = '';
  export let logo: string | undefined = undefined;
  export let description: string = '';
  export let cta: string = 'Claim this perk';
  import { PERK_PLACEHOLDER } from '$lib/config';

  function partnerInitial(name: string) {
    const n = (name || '').trim();
    return n ? n.charAt(0).toUpperCase() : '?';
  }

  // Fallback image jika tidak ada atau kosong
  $: bannerImage = (image && typeof image === 'string' && image.trim().length > 0) ? image : PERK_PLACEHOLDER;

  // Handle error loading image
  function handleImageError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img.src !== PERK_PLACEHOLDER) {
      img.src = PERK_PLACEHOLDER;
    }
  }
</script>

<article class="bg-white rounded-2xl shadow-card overflow-hidden ring-1 ring-gray-100 hover:shadow-lg transition" data-location={location}>
  <a href={href} class="block focus:outline-none focus:ring-2 focus:ring-brand-darkGreen">
    <div class="relative aspect-[16/9] bg-gray-100">
      <img
        src={bannerImage}
        alt={title}
        class="w-full h-full object-cover"
        loading="lazy"
        on:error={handleImageError}
      />
      <div class="absolute top-2 left-2 flex items-center gap-2">
        {#if logo}
          <div class="w-9 h-9 rounded-full bg-white ring-2 ring-white overflow-hidden flex items-center justify-center">
            <img src={logo} alt={`${partner} logo`} class="w-8 h-8 object-cover rounded-full" loading="lazy" />
          </div>
        {:else}
          <div class="w-9 h-9 rounded-full bg-white/90 ring-2 ring-white flex items-center justify-center text-sm font-semibold text-brand-richBlack">
            {partnerInitial(partner)}
          </div>
        {/if}
        <span class="px-2 py-1 rounded-full bg-black/40 text-white text-xs backdrop-blur-sm">
          {partner}
        </span>
      </div>
    </div>
    <div class="p-5">
      <h3 class="text-lg font-semibold text-brand-richBlack">{title}</h3>
      {#if description}
        <p class="mt-2 text-sm text-brand-slateGray">{description}</p>
      {/if}
    </div>
  </a>
  <div class="px-5 pb-5">
    <a href={href} class="block text-center w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 text-brand-richBlack font-semibold py-2 transition" aria-label={cta}>{cta}</a>
  </div>
</article>
