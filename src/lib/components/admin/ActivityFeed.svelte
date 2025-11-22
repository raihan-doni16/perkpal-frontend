<script lang="ts">
  export let items: Array<{ id: number; lead_type?: string; name?: string; email?: string; perk_title?: string; created_at?: string }> = [];
  const fmt = (s?: string) => (s ? new Date(s).toLocaleString() : '');
  const label = (t?: string) => (t ? t.replace(/_/g, ' ') : 'activity');
</script>

<ul class="space-y-3 text-sm text-admin-muted">
  {#if items.length === 0}
    <li>No recent activity</li>
  {:else}
    {#each items as it}
      <li class="rounded-lg border border-admin-border/70 bg-admin-bg px-3 py-2">
        <div class="text-admin-text capitalize font-medium">{label(it.lead_type)}</div>
        <div>
          {#if it.name}{it.name}{/if}
          {#if it.perk_title}
            <span class="text-admin-muted"> • </span>
            <span class="text-admin-text">{it.perk_title}</span>
          {/if}
        </div>
        <span class="block text-xs text-admin-muted mt-1">{fmt(it.created_at)}</span>
      </li>
    {/each}
  {/if}
</ul>
