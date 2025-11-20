<script>
  import { enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import JournalFormFields from '$lib/components/admin/JournalFormFields.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  export let data;
  const categories = data.categories ?? [];
  let error = '';
  let successModalOpen = false;

  const createEnhance = () => {
    return async ({ result, update }) => {
      if (result.type === 'failure') {
        await update();
        error = result.data?.error || 'An error occurred';
        return;
      }
      if (result.type === 'success') {
        await update();
        successModalOpen = true;
        await invalidateAll();
        return;
      }
      if (result.type === 'redirect') {
        successModalOpen = true;
        await invalidateAll();
        return () => {};
      }
    };
  };

  function handleSuccessRedirect() {
    goto('/admin/journal');
  }
</script>

<div class="space-y-6">
  <section class="rounded-2xl border border-admin-border bg-white p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-admin-muted">Admin CMS</p>
    <h1 class="mt-2 text-2xl font-semibold text-brand-richBlack">Create journal post</h1>
    <p class="text-sm text-admin-muted">Use the form below to create a journal entry that matches the database fields.</p>
  </section>

  <form method="POST" enctype="multipart/form-data" use:enhance={createEnhance} class="space-y-6 rounded-2xl border border-admin-border bg-white p-6">
    {#if error}
      <div class="rounded-lg bg-red-50 border border-red-200 p-4">
        <p class="text-sm text-red-800">{error}</p>
      </div>
    {/if}
    <JournalFormFields {categories} />
    <div class="flex justify-end gap-3">
      <a href="/admin/journal" class="px-4 py-2 rounded-lg border border-admin-border text-sm font-semibold text-admin-muted">Back</a>
      <button type="submit" class="px-5 py-2 rounded-lg bg-admin-blue text-sm font-semibold text-white">Create</button>
    </div>
  </form>
</div>

<Modal bind:open={successModalOpen} title="Success" on:close={handleSuccessRedirect}>
  <p class="text-sm text-admin-muted">Journal post has been created successfully.</p>
  <div class="mt-6 flex justify-end">
    <button type="button" class="rounded-lg bg-admin-blue px-4 py-2 text-sm font-semibold text-white" on:click={handleSuccessRedirect}>
      Back to listing
    </button>
  </div>
</Modal>
