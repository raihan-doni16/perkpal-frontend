<script lang="ts">
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import { SITE_NAME, HERO_IMAGE } from '$lib/config';
  const title = `About ${SITE_NAME}`;
  const description = "We're on a mission to empower founders, freelancers, and remote workers in Southeast Asia with the best perks and tools to succeed.";
</script>

<SEOHead title={`About | ${SITE_NAME}`} description={description} />

<!-- Hero -->
<section class="relative">
  <div class="absolute inset-0 bg-cover bg-center" style={`background-image:url('${HERO_IMAGE}')`} aria-hidden="true"></div>
  <div class="absolute inset-0 bg-brand-darkGreen/80"></div>
  <div class="relative container-w py-24 text-white">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Empowering the Independent Workforce</h1>
    <p class="mt-4 max-w-3xl text-white/85">{description}</p>
  </div>
  <div class="sr-only" aria-hidden="true"></div>
  
</section>

<!-- What We Do -->
<section class="container-w py-16">
  <h2 class="text-2xl sm:text-3xl font-bold text-center text-brand-richBlack">What We Do</h2>
  <p class="mt-3 max-w-2xl mx-auto text-center text-brand-slateGray">PerkPal is your unfair advantage. We curate exclusive deals and build a supportive community to help you thrive in your independent career.</p>

  <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="rounded-xl bg-pink-50 p-6 shadow-card">
      <div class="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack font-semibold" aria-hidden="true">%</div>
      <div class="mt-4 font-semibold text-brand-richBlack">Exclusive Perks</div>
      <p class="mt-1 text-sm text-brand-slateGray">Access unbeatable discounts on software, co‑working spaces, lifestyle brands, and more — handpicked for your needs.</p>
    </div>
    <div class="rounded-xl bg-yellow-50 p-6 shadow-card">
      <div class="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack font-semibold" aria-hidden="true">👥</div>
      <div class="mt-4 font-semibold text-brand-richBlack">Community & Events</div>
      <p class="mt-1 text-sm text-brand-slateGray">Connect with founders and builders, share knowledge, and grow your network through exclusive events and our online platform.</p>
    </div>
    <div class="rounded-xl bg-violet-50 p-6 shadow-card">
      <div class="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack font-semibold" aria-hidden="true">💡</div>
      <div class="mt-4 font-semibold text-brand-richBlack">Valuable Resources</div>
      <p class="mt-1 text-sm text-brand-slateGray">Gain insights from industry experts, access helpful guides, and get the support you need to navigate your journey.</p>
    </div>
  </div>
</section>

<!-- Who We Serve -->
<section class="py-16 bg-gray-50">
  <div class="container-w">
    <h2 class="text-2xl sm:text-3xl font-bold text-center text-brand-richBlack">Who We Serve</h2>
    <p class="mt-3 max-w-3xl mx-auto text-center text-brand-slateGray">We cater to the ambitious and the self‑driven in Malaysia and Singapore. Our platform is built for:</p>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-card text-center">
        <div class="mx-auto w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack" aria-hidden="true">🚀</div>
        <div class="mt-3 font-semibold text-brand-richBlack">Founders & Startups</div>
        <p class="mt-1 text-sm text-brand-slateGray">Get the resources you need to scale your business without breaking the bank.</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-card text-center">
        <div class="mx-auto w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack" aria-hidden="true">✍️</div>
        <div class="mt-3 font-semibold text-brand-richBlack">Freelancers & Solopreneurs</div>
        <p class="mt-1 text-sm text-brand-slateGray">Access perks that are usually reserved for large corporations.</p>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-card text-center">
        <div class="mx-auto w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-brand-richBlack" aria-hidden="true">📶</div>
        <div class="mt-3 font-semibold text-brand-richBlack">Remote Workers</div>
        <p class="mt-1 text-sm text-brand-slateGray">Enhance your work‑from‑anywhere lifestyle with curated benefits.</p>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="container-w py-16">
  <h2 class="text-2xl sm:text-3xl font-bold text-center text-brand-richBlack">Frequently Asked Questions</h2>
  <p class="mt-3 max-w-2xl mx-auto text-center text-brand-slateGray">Have questions? We’ve got answers. Here are some of the most common questions we get.</p>

  <div class="mt-8 divide-y rounded-xl bg-white shadow-card">
    {#each [
      { q: 'Who is eligible to join PerkPal?', a: 'PerkPal is open to founders, freelancers, and remote workers in Southeast Asia.' },
      { q: 'Is PerkPal free to use?', a: 'Yes — browsing perks is free. Some partner offers may have eligibility or spending requirements.' },
      { q: 'How are the perks selected?', a: 'We curate offers based on relevance, quality, and value to our community.' },
      { q: 'Can I suggest a perk?', a: 'Absolutely. Use the “Submit a Perk” button in the header or contact us.' },
      { q: 'How is PerkPal different from other deal sites?', a: 'We focus on vetted, high‑value perks tailored to builders, not generic coupons.' },
      { q: 'Do you offer support if I have an issue with a perk?', a: 'Yes. Reach out via our contact page and we’ll help resolve it with the partner.' }
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
</section>
