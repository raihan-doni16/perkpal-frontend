<script lang="ts">
  import { page } from '$app/stores';
  export let user: { role?: string; name?: string } | undefined;
  $: path = $page.url.pathname;
  const active = (p: string) => path === p || path.startsWith(p + '/');
  const norm = (r?: string) => (r || '').toLowerCase().replace(/\s+/g, '').replace(/-/g, '').replace(/_/g, '');
  const isSuper = ['superadmin'].includes(norm(user?.role));
  const isContentEditor = ['contenteditor'].includes(norm(user?.role));
  const initial = (n?: string) => (n || '?').trim().charAt(0).toUpperCase();
</script>

<aside class="bg-admin-sidebar h-full w-64 border-r border-admin-border">
  <div class="h-16 flex items-center justify-between px-4">
    <a href="/admin" class="inline-flex items-center gap-2 font-semibold text-admin-text">
      <img src="/logo.svg" alt="PerkPal" class="h-6 w-6" />
      <span>PerkPal CMS</span>
    </a>
  </div>
  <nav class="px-3 pt-3 pb-6 text-sm">
    <div class="text-xs uppercase tracking-wide text-admin-muted px-2 mb-2">Menu</div>

    <!-- Dashboard - Available to all -->
    <a href="/admin" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin')} class:text-admin-text={active('/admin')}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
      <span>Dashboard</span>
    </a>

    <!-- Content Pages - Only for Content Editor -->
    {#if isContentEditor}
    <div class="text-xs uppercase tracking-wide text-admin-muted px-2 mt-4 mb-2">Content Pages</div>

    <a href="/admin/content?page=homepage" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'homepage'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'homepage'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>
      <span>Homepage</span>
    </a>

    <a href="/admin/content?page=perks" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'perks'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'perks'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-8.5L2 8h7l3-7z"/></svg>
      <span>Perks Page</span>
    </a>

    <a href="/admin/content?page=journal" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'journal'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'journal'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <span>Journal Page</span>
    </a>

    <a href="/admin/content?page=partner" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'partner'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'partner'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6"/><path d="M23 11h-6"/></svg>
      <span>Partner Page</span>
    </a>

    <a href="/admin/content?page=about" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'about'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'about'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      <span>About Page</span>
    </a>

    <a href="/admin/content?page=contact" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'contact'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'contact'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span>Contact Page</span>
    </a>

    <a href="/admin/content?page=terms" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'terms'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'terms'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
      <span>Terms of Service</span>
    </a>

    <a href="/admin/content?page=privacy" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'privacy'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'privacy'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>Privacy Policy</span>
    </a>

    <a href="/admin/content?page=topbar" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
       class:bg-white={active('/admin/content') && $page.url.searchParams.get('page') === 'topbar'}
       class:text-admin-text={active('/admin/content') && $page.url.searchParams.get('page') === 'topbar'}>
      <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/></svg>
      <span>Top Bar</span>
    </a>
    {/if}

    <!-- Admin-only menus (Super Admin) -->
    {#if isSuper}
      <div class="text-xs uppercase tracking-wide text-admin-muted px-2 mt-4 mb-2">Admin</div>
      <a href="/admin/perks" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/perks')} class:text-admin-text={active('/admin/perks')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-8.5L2 8h7l3-7z"/></svg>
        <span>Perks</span>
      </a>
      <a href="/admin/categories" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/categories')} class:text-admin-text={active('/admin/categories')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h10M4 18h7"/></svg>
        <span>Categories</span>
      </a>
      <a href="/admin/locations" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/locations')} class:text-admin-text={active('/admin/locations')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21s6-5.373 6-10a6 6 0 0 0-12 0c0 4.627 6 10 6 10z"/>
          <circle cx="12" cy="11" r="2.5"/>
        </svg>
        <span>Locations</span>
      </a>
      <a href="/admin/subcategories" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/subcategories')} class:text-admin-text={active('/admin/subcategories')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 13h12M4 20h8"/></svg>
        <span>Subcategories</span>
      </a>
      <a href="/admin/journal" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/journal')} class:text-admin-text={active('/admin/journal')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v4H4zM4 12h16v4H4zM4 18h16v2H4z"/></svg>
        <span>Journal</span>
      </a>
      <a href="/admin/leads" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/leads')} class:text-admin-text={active('/admin/leads')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>
        <span>Leads</span>
      </a>
      <a href="/admin/contacts" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/contacts')} class:text-admin-text={active('/admin/contacts')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Inbox</span>
      </a>
      <a href="/admin/users" class="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/users')} class:text-admin-text={active('/admin/users')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v4"/><path d="M18 4v4"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>
        <span>Users</span>
      </a>

      <div class="text-xs uppercase tracking-wide text-admin-muted px-2 mt-5 mb-2">Settings</div>
      <a href="/admin/settings" class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/80"
         class:bg-white={active('/admin/settings')} class:text-admin-text={active('/admin/settings')}>
        <svg class="w-4 h-4 text-admin-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.21 19.9l.06-.06A1.65 1.65 0 0 0 4.6 18.02 1.65 1.65 0 0 0 3.09 17H3a2 2 0 1 1 0-4h.09c.7 0 1.32-.41 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 7.19l.06.06c.48.48 1.18.63 1.82.33.59-.19 1-.81 1-1.51V6a2 2 0 1 1 4 0v.09c0 .7.41 1.32 1 1.51.64.3 1.34.15 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.48.48-.63 1.18-.33 1.82.19.59.81 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.7 0-1.32.41-1.51 1z"/></svg>
        <span>Settings</span>
      </a>
    {/if}

    <a href="/admin/logout" class="mt-8 flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-white/60">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
      <span>Log out</span>
    </a>
  </nav>
</aside>
