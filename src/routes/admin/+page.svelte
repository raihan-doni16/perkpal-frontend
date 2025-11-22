<script>
  import ActivityFeed from '$lib/components/admin/ActivityFeed.svelte';

  export let data;
  const stats = data?.stats || {};
  const activities = data?.recent_leads || [];

  const getStat = (...keys) => {
    for (const key of keys) {
      const val = stats?.[key];
      if (typeof val === 'number' && !Number.isNaN(val)) return val;
      if (val !== undefined && val !== null) return val;
    }
    return 0;
  };

  const summaryCards = [
    { label: 'Total Deals', value: getStat('total_deals', 'deals_count', 'total_perks') },
    { label: 'Total Perks', value: getStat('total_perks', 'perks_count') },
    { label: 'Total Categories', value: getStat('total_categories', 'categories_count') },
    { label: 'Total Subcategories', value: getStat('total_subcategories', 'subcategories_count', 'subcategory_count') }
  ];

  const quickActions = [
    { label: 'Add New Perk', href: '/admin/perks/new' },
    { label: 'Add New Category', href: '/admin/categories' },
    { label: 'Add New Subcategory', href: '/admin/subcategories' }
  ];
</script>

<section class="space-y-6">
  <div class="bg-admin-surface rounded-2xl border border-admin-border p-6 shadow-sm">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-admin-text">Dashboard</h1>
        <p class="text-sm text-admin-muted mt-1">Quick overview of your CMS.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {#each summaryCards as card}
        <div class="bg-white rounded-xl border border-admin-border shadow-card p-5">
          <div class="text-sm text-admin-muted">{card.label}</div>
          <div class="mt-2 text-3xl font-semibold text-admin-text">{card.value}</div>
        </div>
      {/each}
    </div>

    <div class="mt-6">
      <h2 class="text-lg font-semibold text-admin-text">Recent Activities</h2>
      <div class="mt-3 bg-white rounded-xl border border-admin-border shadow-card p-4">
        <ActivityFeed items={activities} />
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-lg font-semibold text-admin-text">Quick Actions</h2>
      <div class="mt-3 flex flex-wrap gap-3">
        {#each quickActions as action, i}
          <a
            href={action.href}
            class={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-sm shadow-sm border border-admin-border
              bg-brand-darkGreen text-white hover:brightness-110`}
          >
            {action.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>
