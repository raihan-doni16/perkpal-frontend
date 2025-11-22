<script>
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import PartnerOfferModal from '$lib/components/forms/PartnerOfferModal.svelte';
  import { SITE_NAME, HERO_IMAGE } from '$lib/config';
  let open = false;
</script>

<SEOHead title={`Partner With Us | ${SITE_NAME}`} description="Submit your offer and partner with our community." />

<!-- Hero -->
<section class="relative text-white overflow-hidden">
  <div class="absolute inset-0 bg-center bg-cover" style={`background-image:url('${HERO_IMAGE}')`} aria-hidden="true"></div>
  <div class="absolute inset-0 bg-brand-darkGreen/80"></div>
  <div class="container-w py-20 relative">
    <h1 class="text-4xl sm:text-5xl font-extrabold">Reach your ideal customers</h1>
    <p class="mt-3 max-w-2xl text-white/85">Connect with a highly engaged community of founders, freelancers, solopreneurs, and remote workers in Malaysia and Singapore.</p>
    <button class="mt-6 inline-flex px-5 py-3 rounded-md bg-yellow-400 text-brand-richBlack font-semibold hover:bg-yellow-500" on:click={() => (open = true)}>Get started</button>
  </div>
</section>

<!-- Why partner -->
<section class="container-w py-16">
  <h2 class="text-3xl font-bold text-center text-brand-richBlack">Why partner with us?</h2>
  <p class="mt-2 text-center text-brand-slateGray">Join our network of leading brands and gain access to a thriving community of professionals.</p>
  <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="rounded-2xl bg-pink-100 p-6 shadow-card">
      <div class="text-3xl" aria-hidden="true">👥</div>
      <div class="mt-3 font-semibold text-brand-richBlack">Reach your ideal customers</div>
      <p class="mt-1 text-sm text-brand-slateGray">Connect with a highly engaged community in MY & SG.</p>
    </div>
    <div class="rounded-2xl bg-yellow-100 p-6 shadow-card">
      <div class="text-3xl" aria-hidden="true">👁️</div>
      <div class="mt-3 font-semibold text-brand-richBlack">Boost your brand visibility</div>
      <p class="mt-1 text-sm text-brand-slateGray">Increase awareness and reach a wider audience.</p>
    </div>
    <div class="rounded-2xl bg-violet-100 p-6 shadow-card">
      <div class="text-3xl" aria-hidden="true">🎯</div>
      <div class="mt-3 font-semibold text-brand-richBlack">Generate high-quality leads</div>
      <p class="mt-1 text-sm text-brand-slateGray">Drive conversions with targeted promotions.</p>
    </div>
  </div>
</section>

<!-- How it works -->
<section class="container-w py-12">
  <h2 class="text-3xl font-bold text-center text-brand-richBlack">How it works</h2>
  <div class="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-card p-6 text-center">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl" aria-hidden="true">📝</div>
      <div class="mt-3 font-semibold">Submit your offer</div>
      <p class="mt-1 text-sm text-brand-slateGray">Share your exclusive offer with our community.</p>
    </div>
    <div class="bg-white rounded-xl shadow-card p-6 text-center">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl" aria-hidden="true">🔎</div>
      <div class="mt-3 font-semibold">We review and approve</div>
      <p class="mt-1 text-sm text-brand-slateGray">Our team ensures it meets our quality standards.</p>
    </div>
    <div class="bg-white rounded-xl shadow-card p-6 text-center">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-xl" aria-hidden="true">🚀</div>
      <div class="mt-3 font-semibold">Go live and start generating leads</div>
      <p class="mt-1 text-sm text-brand-slateGray">Your offer goes live and starts driving results.</p>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="bg-yellow-50 py-12">
  <div class="container-w max-w-3xl">
    <h2 class="text-3xl font-bold text-center text-brand-richBlack">Frequently Asked Questions</h2>
    <div class="mt-6 divide-y bg-white rounded-xl shadow-card">
      {#each [
        {q:'What kind of businesses can partner with you?',a:'SaaS, AI tools, B2B services, and lifestyle brands serving MY & SG.'},
        {q:'Is there a cost to list our perks?',a:'Listing is free. Some promotional placements may be paid.'},
        {q:'What kind of perks perform best?',a:'Clear value, simple redemption, and regional availability.'},
        {q:'How do I track the performance of my offer?',a:'We can share clicks and claim metrics upon request.'}
      ] as item}
        <details class="group p-4 open:bg-gray-50">
          <summary class="flex items-center justify-between cursor-pointer list-none">
            <span class="font-medium text-brand-richBlack">{item.q}</span>
            <span class="ml-4 text-brand-richBlack group-open:rotate-45 transition-transform" aria-hidden="true" role="presentation">+</span>
          </summary>
          <p class="mt-2 text-sm text-brand-slateGray">{item.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>

<!-- Final CTA -->
<section class="container-w py-16 text-center">
  <h2 class="text-3xl font-bold text-brand-richBlack">Ready to get started?</h2>
  <p class="mt-2 text-brand-slateGray max-w-xl mx-auto">Join our network of leading brands and gain access to a thriving community of professionals.</p>
  <button class="mt-6 inline-flex px-5 py-3 rounded-md bg-yellow-400 text-brand-richBlack font-semibold hover:bg-yellow-500" on:click={() => (open = true)}>Submit your offer</button>
</section>

<Modal bind:open title={null} size="lg" on:close={() => (open = false)}>
  <PartnerOfferModal on:close={() => (open = false)} onSuccess={() => (open = false)} />
</Modal>
