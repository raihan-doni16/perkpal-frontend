<script lang="ts">
  import { SITE_NAME, CTA_BROWSE_LABEL } from '$lib/config';
  import { page } from '$app/stores';
  let mobileOpen = false;
  let pathname = '';
  let prevPathname = '';
  const siteName = SITE_NAME;
  const ctaLabel = CTA_BROWSE_LABEL;

  $: pathname = $page.url.pathname;

  // Close mobile menu when navigating to a new route
  $: if (pathname !== prevPathname) {
    if (mobileOpen) mobileOpen = false;
    prevPathname = pathname;
  }
  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');
</script>

<header class="bg-brand-darkGreen text-white">
  <div class="container-w flex items-center justify-between h-16">
    <a href="/" class="flex items-center gap-2 font-bold text-lg tracking-tight">
      <img src="/logo.svg" alt={siteName} class="h-8 w-auto" height="32" />
      <span>{siteName}</span>
    </a>

    <nav class="hidden md:flex items-center gap-6">
      <a href="/perks" class="hover:text-brand-yellow" aria-current={isActive('/perks') ? 'page' : undefined} class:text-brand-yellow={isActive('/perks')}>Perks</a>
      <a href="/journal" class="hover:text-brand-yellow" aria-current={isActive('/journal') ? 'page' : undefined} class:text-brand-yellow={isActive('/journal')}>Journal</a>
      <a href="/partner" class="hover:text-brand-yellow" aria-current={isActive('/partner') ? 'page' : undefined} class:text-brand-yellow={isActive('/partner')}>Partner</a>
      <a href="/about" class="hover:text-brand-yellow" aria-current={isActive('/about') ? 'page' : undefined} class:text-brand-yellow={isActive('/about')}>About</a>
      <a href="/contact" class="hover:text-brand-yellow" aria-current={isActive('/contact') ? 'page' : undefined} class:text-brand-yellow={isActive('/contact')}>Contact</a>
    </nav>

    <a href="/perks" class="hidden md:inline-flex bg-brand-yellow text-brand-richBlack font-semibold px-4 py-2 rounded-full shadow hover:opacity-90">{ctaLabel}</a>

    <button
      class="md:hidden"
      type="button"
      aria-label="Toggle menu"
      aria-expanded={mobileOpen}
      aria-controls="mobile-menu"
      on:click={() => (mobileOpen = !mobileOpen)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  </div>

  {#if mobileOpen}
    <div id="mobile-menu" class="md:hidden border-t border-white/10">
      <div class="container-w py-3 space-y-3">
        <a href="/perks" class="block" aria-current={isActive('/perks') ? 'page' : undefined} class:text-brand-yellow={isActive('/perks')}>Perks</a>
        <a href="/journal" class="block" aria-current={isActive('/journal') ? 'page' : undefined} class:text-brand-yellow={isActive('/journal')}>Journal</a>
        <a href="/partner" class="block" aria-current={isActive('/partner') ? 'page' : undefined} class:text-brand-yellow={isActive('/partner')}>Partner</a>
        <a href="/about" class="block" aria-current={isActive('/about') ? 'page' : undefined} class:text-brand-yellow={isActive('/about')}>About</a>
        <a href="/contact" class="block" aria-current={isActive('/contact') ? 'page' : undefined} class:text-brand-yellow={isActive('/contact')}>Contact</a>
        <a href="/perks" class="inline-flex bg-brand-yellow text-brand-richBlack font-semibold px-4 py-2 rounded-full">{ctaLabel}</a>
      </div>
    </div>
  {/if}
</header>
