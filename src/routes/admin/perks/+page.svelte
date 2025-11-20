<script>
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Modal from '$lib/components/ui/Modal.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  export let data;
  $: items = data.items || [];
  const norm = (r) => (r || '').toLowerCase().replace(/\s+/g, '').replace(/-/g, '').replace(/_/g, '');
  $: isSuper = norm($page.data?.user?.role) === 'superadmin';

  const flashMessages = {
    created: 'Perk created successfully.',
    published: 'Perk published successfully.',
    updated: 'Perk updated successfully.',
    deleted: 'Perk deleted successfully.'
  };

  let successAlert = '';
  if (data?.flash?.type && flashMessages[data.flash.type]) {
    successAlert = flashMessages[data.flash.type];
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.has('status') || url.searchParams.has('refresh')) {
      url.searchParams.delete('status');
      url.searchParams.delete('refresh');
      history.replaceState({}, '', url);
    }
  });

  let deleteModalOpen = false;
  let deleteTarget = null;
  let deleteLoading = false;
  let deleteError = '';

  function openDeleteModal(perk) {
    deleteTarget = perk;
    deleteModalOpen = true;
    deleteError = '';
  }

  const deleteEnhance = () => {
    deleteLoading = true;

    return async ({ result, update }) => {
      deleteLoading = false;
      try {
        await update({ reset: false, invalidateAll: false });
      } catch (err) {
        deleteError = err?.message || 'Failed to delete perk.';
        return;
      }

      if (result.type === 'success') {
        deleteModalOpen = false;
        successAlert = flashMessages.deleted;
        await invalidateAll();
      } else if (result.type === 'failure') {
        deleteError = result.data?.error || 'Failed to delete perk.';
      } else {
        deleteError = result.error?.message || 'Failed to delete perk.';
      }
    };
  };
</script>

<!-- Header row with search and create button -->
<div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
  <h1 class="text-xl font-semibold text-brand-richBlack">Perks</h1>
  <div class="flex items-center gap-3 w-full md:w-auto">
    <form method="GET" class="flex-1 md:w-80">
      <label class="relative block">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-3 mt-3 my-auto text-gray-400">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
        </span>
        <input name="search" placeholder="Search by title or partner" value={data?.query?.search}
               class="w-full pl-10 pr-3 py-2 rounded-lg border border-admin-border bg-white focus:outline-none focus:ring-2 focus:ring-admin-blue" />
      </label>
    </form>
    <a href="/admin/perks/new" class="px-4 py-2 rounded-lg bg-admin-blue text-white text-center">Create Perk</a>
  </div>
</div>

{#if successAlert}
  <div class="mb-4 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
    <div class="flex items-center gap-2">
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span>{successAlert}</span>
    </div>
    <button type="button" class="text-green-700 hover:text-green-900" on:click={() => (successAlert = '')} aria-label="Close">
      &times;
    </button>
  </div>
{/if}

  <div class="bg-white rounded-2xl shadow-card border border-admin-border overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
      <thead class="bg-admin-sidebar/80 text-admin-muted uppercase text-xs">
        <tr>
          <th class="text-left px-4 py-3">Name</th>
          <th class="text-left px-4 py-3">Partner</th>
          <th class="text-left px-4 py-3">Location</th>
          <th class="text-left px-4 py-3">Status</th>
          <th class="text-right px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each items as it}
          <tr class="border-t border-admin-border hover:bg-admin-sidebar/50">
            <td class="px-4 py-3 text-brand-richBlack font-medium">{it.title}</td>
            <td class="px-4 py-3">{it.partner_name}</td>
            <td class="px-4 py-3 capitalize">{it.location_label ?? it.location}</td>
            <td class="px-4 py-3">
              {#if it.status === 'published'}
                <span class="inline-flex items-center gap-1 text-green-700 font-medium">Published</span>
              {:else if it.status === 'archived'}
                <span class="inline-flex items-center gap-1 text-orange-700 font-medium">Archived</span>
              {:else}
                <span class="inline-flex items-center gap-1 text-admin-muted">Draft</span>
              {/if}
            </td>
            <td class="px-4 py-3 text-right whitespace-nowrap">
              <a href={`/admin/perks/${it.id}`} class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-admin-border bg-white hover:bg-gray-50 mr-1" title="Edit">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
              </a>
              {#if isSuper}
                <button
                  type="button"
                  class="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-admin-border bg-white text-red-600 hover:bg-red-50"
                  title="Delete"
                  on:click={() => openDeleteModal(it)}>
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
<div class="mt-4">
  <Pagination meta={data.meta} current={data.query} basePath="/admin/perks" />
</div>

<Modal bind:open={deleteModalOpen} title="Delete perk" size="sm" on:close={() => (deleteModalOpen = false)}>
  {#if deleteTarget}
    <form method="POST" action="?/delete" use:enhance={deleteEnhance} class="space-y-4">
      <input type="hidden" name="id" value={deleteTarget.id} />
      <p class="text-sm text-brand-slateGray">This will permanently remove <span class="font-semibold text-brand-richBlack">{deleteTarget.title}</span>. This action cannot be undone. Are you sure?</p>

      {#if deleteError}
        <div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{deleteError}</div>
      {/if}

      <div class="flex justify-end gap-2">
        <button type="button" class="rounded-lg border border-admin-border px-4 py-2 text-sm" on:click={() => (deleteModalOpen = false)} disabled={deleteLoading}>Cancel</button>
        <button type="submit" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60" disabled={deleteLoading}>
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </form>
  {/if}
</Modal>
