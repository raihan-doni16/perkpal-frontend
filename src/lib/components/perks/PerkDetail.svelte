<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import ClaimForm from '$lib/components/forms/ClaimForm.svelte';
  import ShareButtons from './ShareButtons.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import { toastStore } from '$lib/stores/toast';
  import { PERK_PLACEHOLDER } from '$lib/config';
  export let perk: any;
  let openClaim = false;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Reactive fallback untuk banner image
  $: bannerImage = (perk?.media?.banner && typeof perk.media.banner === 'string' && perk.media.banner.trim().length > 0)
    ? perk.media.banner
    : PERK_PLACEHOLDER;

  // Handle error loading image
  function handleImageError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img.src !== PERK_PLACEHOLDER) {
      img.src = PERK_PLACEHOLDER;
    }
  }

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      toastStore.push('Coupon code copied!', 'success');
    } catch (e) {
      try {
        const el = document.createElement('textarea');
        el.value = code;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        toastStore.push('Coupon code copied!', 'success');
      } catch {
        toastStore.push('Failed to copy code', 'error');
      }
    }
  }
</script>

<article class="bg-white rounded-xl shadow-card overflow-hidden">
  <div class="relative w-full h-56 bg-gray-100">
    <img
      src={bannerImage}
      alt={perk?.title || 'Perk'}
      class="w-full h-full object-cover"
      loading="lazy"
      on:error={handleImageError}
    />
  </div>
  <div class="p-6">
    <div class="flex items-center gap-2 text-sm text-gray-500">
      {#if perk?.partner_logo || perk?.media?.logo}
        <img
          src={perk?.partner_logo || perk?.media?.logo}
          alt={`${perk.partner_name} logo`}
          class="w-8 h-8 rounded-full object-cover border border-gray-200"
          loading="lazy"
        />
      {:else}
        <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
          {perk?.partner_name?.charAt(0)?.toUpperCase() || '?'}
        </div>
      {/if}
      <span>{perk.partner_name} • {perk.location_label ?? perk.location}</span>
    </div>
    <h1 class="mt-2 text-3xl font-bold text-brand-richBlack">{perk.title}</h1>
    {#if perk.short_description}
      <p class="mt-2 text-brand-slateGray">{perk.short_description}</p>
    {/if}

    <div class="mt-6 prose max-w-none" >
      {@html perk.description}
    </div>

    <div class="mt-6 bg-brand-offWhite rounded-xl p-4">
      <div class="font-semibold text-brand-richBlack">Redeem</div>
      {#if perk.redeem_type === 'coupon_code' && perk.coupon_code}
        <div class="mt-2 flex items-center gap-3">
          <div class="px-3 py-2 bg-white border rounded">{perk.coupon_code}</div>
          <Button variant="secondary" on:click={() => copyCode(perk.coupon_code)}>Copy Code</Button>
        </div>
      {:else if perk.redeem_type === 'external_link' && perk.partner_url}
        <div class="mt-2">
          <Button href={perk.partner_url} variant="primary">Go to Partner</Button>
        </div>
      {:else}
        <div class="mt-2 text-sm text-brand-slateGray">Fill in the claim form to proceed.</div>
        <div class="mt-3">
          <Button on:click={() => (openClaim = true)} variant="secondary">Open Claim Form</Button>
        </div>
      {/if}
    </div>
  </div>
  <div class="px-6 pb-6">
    <div class="mt-6">
      <div class="text-sm text-brand-slateGray mb-2">Share</div>
      <ShareButtons url={pageUrl} title={perk?.title} variant="single" label="Share Perk" />
    </div>
  </div>
</article>

<Modal bind:open={openClaim} title="Claim Perk" on:close={() => (openClaim = false)}>
  <ClaimForm perkId={perk.id} />
</Modal>
