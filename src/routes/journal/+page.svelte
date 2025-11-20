<script>
  import SEOHead from '$lib/components/seo/SEOHead.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  import { SITE_NAME, PERK_PLACEHOLDER } from '$lib/config';
  export let data;
  const posts = data.posts || [];
  const meta = data.meta || null;
  const categories = data.categories || [];
  const current = data.current || { category: '' };
  $: currentCategory = current?.category ?? '';

  function setCategory(c) {
    const qs = new URLSearchParams();
    if (c) qs.set('category', c);
    const q = qs.toString();
    window.location.href = `/journal${q ? `?${q}` : ''}`;
  }
</script>

<SEOHead title={`Journal | ${SITE_NAME}`} description="Insights, news, and tips for founders and remote workers in MY & SG." />

<!-- Hero banner -->
<section class="bg-pink-100">
  <div class="container-w py-16 text-center">
    <h1 class="text-5xl font-extrabold text-brand-richBlack">Journal</h1>
    <p class="mt-3 max-w-2xl mx-auto text-brand-slateGray">Stay up-to-date with the latest news, tips and insights for founders, freelancers, solopreneurs and remote workers in Malaysia and Singapore.</p>
  </div>
</section>

<!-- Filters -->
<section class="container-w pt-10">
  <div class="flex flex-wrap gap-2 justify-center">
    <button class="px-4 py-2 rounded-full border text-sm"
      class:bg-brand-darkGreen={currentCategory === ''}
      class:text-white={currentCategory === ''}
      class:border-brand-darkGreen={currentCategory === ''}
      on:click={() => setCategory('')}>All</button>
    {#each categories as c}
      <button class="px-4 py-2 rounded-full border text-sm"
        aria-pressed={currentCategory === c.slug}
        class:bg-brand-darkGreen={currentCategory === c.slug}
        class:text-white={currentCategory === c.slug}
        class:border-brand-darkGreen={currentCategory === c.slug}
        class:hover\:bg-gray-100={currentCategory !== c.slug}
        on:click={() => setCategory(c.slug)}>{c.name}</button>
    {/each}
  </div>
</section>

<!-- Featured + grid -->
<section class="container-w py-12">
  {#if posts.length}
    <div class="max-w-none">
      <div class="text-xs text-gray-500 mb-2">Featured Article</div>
      <article class="bg-pink-50 rounded-2xl shadow-card overflow-hidden">
        <a class="block" href={`/journal/${posts[0].slug}`}>
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="relative bg-gray-100 h-56 md:h-80 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none">
              <img src={posts[0].og_image || PERK_PLACEHOLDER} alt={posts[0].title} class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="p-6 md:p-8 flex flex-col justify-center">
              <div class="inline-flex px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold w-max">Featured</div>
              <h2 class="mt-2 text-2xl md:text-4xl font-extrabold text-brand-richBlack leading-tight">{posts[0].title}</h2>
              <div class="mt-2 text-sm text-gray-500">{posts[0].created_at?.slice(0,10)} • {posts[0].reading_time || 5} min read</div>
              {#if posts[0].excerpt}
                <p class="mt-4 text-brand-slateGray">{posts[0].excerpt}</p>
              {/if}
            </div>
          </div>
        </a>
      </article>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each posts.slice(1) as p}
        <article class="bg-white rounded-2xl shadow-card overflow-hidden">
          <a href={`/journal/${p.slug}`} class="block">
            <div class="relative aspect-[16/10] bg-gray-100">
              <img src={p.og_image || PERK_PLACEHOLDER} alt={p.title} class="w-full h-full object-cover" loading="lazy" />
              <div class="absolute top-3 left-3 inline-flex px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Article</div>
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
    </div>

    <!-- Pagination -->
    <div class="mt-8">
      <Pagination {meta} current={{ category: currentCategory }} basePath={'/journal'} />
    </div>
  {:else}
    <div class="text-center text-brand-slateGray">No posts yet.</div>
  {/if}
</section>
