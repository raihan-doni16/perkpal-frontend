<script>
  export let data;
  const journal = data?.journal || [];
  const latestPerks = data?.latestPerks || [];
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import PerkCard from '$lib/components/perks/PerkCard.svelte';
  import { HERO_IMAGE, SITE_NAME, PERK_PLACEHOLDER } from '$lib/config';
  const hero = HERO_IMAGE;
  const subtitle = "Exclusive perks for Malaysia & Singapore's top founders, freelancers, solopreneurs, and remote workers. Save big on tools that grow your business.";
</script>

<SEOHead title={`${SITE_NAME} — Exclusive Perks`} description={subtitle} />

<!-- Hero: split layout with circle image and floating chips -->
<section class="bg-[#F1F4E9]">
  <div class="container-w py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div>
      <h1 class="text-5xl sm:text-6xl font-extrabold leading-tight text-brand-richBlack">
        Supercharge Your
        <br />
        Hustle.
      </h1>
      <p class="mt-4 max-w-xl text-brand-slateGray">{subtitle}</p>
      <div class="mt-8 flex gap-3">
        <a href="/perks" class="inline-flex px-5 py-3 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold text-brand-richBlack">Explore All Perks</a>
        <a href="/partner" class="inline-flex px-5 py-3 rounded-md bg-brand-darkGreen text-white hover:brightness-110">List Your Perks</a>
      </div>
    </div>
    <div class="relative flex justify-center">
      <div class="w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden ring-8 ring-white/60 shadow-card">
        <img src={hero} alt="Hero" class="w-full h-full object-cover" loading="lazy" />
      </div>
      <!-- floating chips -->
      <div class="hidden sm:block absolute -top-3 left-6 bg-white rounded-xl shadow-card px-3 py-2 text-xs">
        <div class="font-semibold">Zoom</div>
        <div class="text-gray-500">30% Off</div>
      </div>
      <div class="hidden sm:block absolute top-8 -right-3 bg-white rounded-xl shadow-card px-3 py-2 text-xs">
        <div class="font-semibold">Slack</div>
        <div class="text-gray-500">25% Off</div>
      </div>
      <div class="hidden sm:block absolute -bottom-4 left-10 bg-white rounded-xl shadow-card px-3 py-2 text-xs">
        <div class="font-semibold">Figma</div>
        <div class="text-gray-500">Free Pro Plan</div>
      </div>
    </div>
  </div>
  <div class="sr-only" aria-hidden="true"></div>
</section>

<!-- How It Works -->
<section class="container-w py-16">
  <h2 class="text-3xl font-bold text-center text-brand-richBlack">How It Works</h2>
  <p class="mt-2 text-center text-brand-slateGray">It's as easy as 1, 2, 3.</p>
  <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div class="text-center bg-white rounded-xl shadow-card p-6">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">🔎</div>
      <div class="mt-3 font-semibold">1. Browse Perks</div>
      <p class="mt-1 text-sm text-brand-slateGray">Explore our curated marketplace of exclusive deals.</p>
    </div>
    <div class="text-center bg-white rounded-xl shadow-card p-6">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">✨</div>
      <div class="mt-3 font-semibold">2. Select a Deal</div>
      <p class="mt-1 text-sm text-brand-slateGray">Choose the offer that best fits your needs.</p>
    </div>
    <div class="text-center bg-white rounded-xl shadow-card p-6">
      <div class="mx-auto w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">🎟️</div>
      <div class="mt-3 font-semibold">3. Redeem & Save</div>
      <p class="mt-1 text-sm text-brand-slateGray">Follow the link to the partner’s site and enjoy.</p>
    </div>
  </div>
</section>

<!-- Latest Perks -->
<section class="container-w py-12">
  <div class="text-center">
    <h2 class="text-3xl font-bold text-brand-richBlack">Latest Perks</h2>
    <p class="mt-1 text-brand-slateGray">Fresh deals added every week.</p>
   
  </div>
  <div class="text-end">
     <a href="/perks" class="inline-block mt-2 me-2 text-brand-darkGreen hover:underline">See all</a>
  </div>
  <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#if latestPerks.length}
      {#each latestPerks as p}
        <PerkCard
          title={p.title}
          partner={p.partner_name}
          location={p.location}
          href={`/perks/${p.slug}`}
          image={p.media?.banner}
          logo={p.partner_logo}
          description={p.short_description}
          cta={p.redeem_type === 'external_link' ? 'Secure my spot' : 'Claim this perk'}
        />
      {/each}
    {:else}
      <div class="col-span-full text-center text-brand-slateGray">No perks yet.</div>
    {/if}
  </div>
</section>

<!-- Journal -->
<section class="container-w py-12">
  <div class="text-center">
    <h2 class="text-3xl font-bold text-brand-richBlack">From The Journal</h2>
    <p class="mt-1 text-brand-slateGray">Insights and stories for the modern professional.</p>
  </div>
  <div class="text-end">
    <a href="/journal" class="inline-block mt-2 me-2 text-brand-darkGreen hover:underline">See all</a>
  </div>
  <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    {#if journal.length}
      {#each journal as p}
        <article class="bg-white rounded-xl shadow-card overflow-hidden">
          <a href={`/journal/${p.slug}`} class="block">
            <div class="relative aspect-[16/10] bg-gray-100">
              <img src={p.og_image || PERK_PLACEHOLDER} alt={p.title} class="w-full h-full object-cover" loading="lazy" />
              {#if p.category || p.category_data}
                <div class="absolute top-3 left-3 inline-flex px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                  {p.category || p.category_data?.name}
                </div>
              {/if}
            </div>
            <div class="p-6">
              <h3 class="font-semibold text-brand-richBlack text-lg">{p.title}</h3>
              <div class="mt-1 text-xs text-gray-500">{p.created_at?.slice(0,10)} • {p.reading_time || 5} min read</div>
              {#if p.excerpt}
                <p class="mt-2 text-sm text-brand-slateGray">{p.excerpt}</p>
              {/if}
              <div class="mt-3 text-yellow-700 font-semibold">Read More →</div>
            </div>
          </a>
        </article>
      {/each}
    {:else}
      <div class="col-span-full text-center text-brand-slateGray">No articles yet.</div>
    {/if}
  </div>
</section>
