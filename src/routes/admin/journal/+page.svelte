<script>
  import Modal from '$lib/components/ui/Modal.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  import { invalidateAll } from '$app/navigation';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  export let data;
  $: items = data.items || [];
  const norm = (r) => (r || '').toLowerCase().replace(/\s+/g, '').replace(/-/g, '').replace(/_/g, '');
  $: isSuper = norm($page.data?.user?.role) === 'superadmin';
  let showDeleteConfirm = false;
  let deleteTarget = null;
  let deleteError = '';
  let successModalOpen = false;
  let successMessage = '';

  function promptDelete(item) {
    deleteTarget = item;
    deleteError = '';
    showDeleteConfirm = true;
  }

  const deleteEnhance = () => {
    return async ({ result, update }) => {
      await update();
      if (result.type === 'success') {
        showDeleteConfirm = false;
        deleteTarget = null;
        successMessage = 'Journal post has been deleted successfully.';
        successModalOpen = true;
        await invalidateAll();
      } else if (result.type === 'failure') {
        deleteError = result.data?.error || 'Failed to delete journal post';
      }
    };
  };
</script>

<div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
  <h1 class="text-xl font-semibold text-brand-richBlack">Journal</h1>
  <div class="flex items-center gap-3 w-full md:w-auto">
    <form method="GET" class="flex-1 md:w-80">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span class="absolute mt-3 inset-y-0 left-3 my-auto text-gray-400">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        </span>
        <input name="search" placeholder="Search journal posts" value={data?.query?.search}
               class="w-full pl-10 pr-3 py-2 rounded-lg border border-admin-border bg-white focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </label>
    </form>
    <a href="/admin/journal/new" class="px-4 py-2 rounded-lg bg-admin-blue text-white text-center">Create Post</a>
  </div>
</div>


<div class="space-y-6 bg-white rounded-2xl shadow-card border border-admin-border">
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-admin-sidebar/80 text-admin-muted uppercase text-xs">
        <tr>
          <th class="text-left px-4 py-3">Title</th>
          <th class="text-left px-4 py-3">Category</th>
          <th class="text-left px-4 py-3">Status</th>
          <th class="text-left px-4 py-3">Published</th>
          <th class="text-left px-4 py-3">Tags</th>
          <th class="text-right px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item}
          <tr class="border-t border-admin-border hover:bg-admin-sidebar/50">
            <td class="px-4 py-3 text-brand-richBlack font-medium">{item.title}</td>
            <td class="px-4 py-3">{item.category || item.category_data?.name || 'Uncategorized'}</td>
            <td class="px-4 py-3">
              {#if item.is_published}
                <span class="inline-flex items-center gap-1 text-green-700 font-medium">Published</span>
              {:else}
                <span class="inline-flex items-center gap-1 text-admin-muted">Draft</span>
              {/if}
            </td>
            <td class="px-4 py-3">{item.published_at ? new Date(item.published_at).toLocaleDateString() : '—'}</td>
            <td class="px-4 py-3">{(item.tags || []).join(', ')}</td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <a href={`/admin/journal/${item.id}`} class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-admin-border bg-white hover:bg-gray-50 mr-1" title="Edit">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </a>
              {#if isSuper}
                <button type="button" class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-admin-border bg-white text-red-600 hover:bg-red-50" title="Delete" on:click={() => promptDelete(item)}>
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                </button>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<Pagination meta={data.meta} current={data.query} basePath="/admin/journal" />

<Modal bind:open={showDeleteConfirm} title="Delete Journal Post" on:close={() => (showDeleteConfirm = false)}>
  <form method="POST" action="?/delete" use:enhance={deleteEnhance}>
    <input type="hidden" name="id" value={deleteTarget?.id} />
    <p class="text-sm text-admin-muted">
      Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This action cannot be undone.
    </p>
    {#if deleteError}
      <div class="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{deleteError}</div>
    {/if}
    <div class="mt-4 flex justify-end gap-2">
      <button type="button" class="px-4 py-2 rounded-lg border border-admin-border" on:click={() => (showDeleteConfirm = false)}>Cancel</button>
      <button type="submit" class="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
    </div>
  </form>
</Modal>

<Modal bind:open={successModalOpen} title="Success" on:close={() => (successModalOpen = false)}>
  <p class="text-sm text-admin-muted">{successMessage}</p>
  <div class="mt-6 flex justify-end">
    <button type="button" class="rounded-lg bg-admin-blue px-4 py-2 text-sm font-semibold text-white" on:click={() => (successModalOpen = false)}>
      OK
    </button>
  </div>
</Modal>
