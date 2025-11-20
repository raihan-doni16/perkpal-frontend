<script>
  import { enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import PerkFormFields from '$lib/components/admin/PerkFormFields.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  export let data;
  const categories = data.categories ?? [];
  const subcategories = data.subcategories ?? [];
  const locations = data.locations ?? [];
  const formError = data?.form?.error;

  let isFormValid = false;
  let successModalOpen = false;
  let successTitle = '';
  let successDescription = '';
  let successStatus = 'created';

  const successCopy = {
    save: {
      title: 'Perk saved successfully',
      description: 'Your perk has been saved. You can continue editing later from the listing page.'
    },
    publish: {
      title: 'Perk published successfully',
      description: 'Your perk is now live. You can review it any time from the listing page.'
    }
  };

  const handleSuccessRedirect = async () => {
    successModalOpen = false;
    await goto(`/admin/perks?status=${successStatus}&refresh=${Date.now()}`, { replaceState: true });
  };

  const enhancePerkForm = ({ formData }) => {
    const intent = String(formData.get('intent') || 'save') === 'publish' ? 'publish' : 'save';
    return async ({ result, update }) => {
      await update();
      if (result.type === 'success') {
        successTitle = successCopy[intent].title;
        successDescription = successCopy[intent].description;
        successStatus = intent === 'publish' ? 'published' : 'created';
        successModalOpen = true;
        await invalidateAll();
      }
    };
  };
</script>

<div class="space-y-6">
  <section class="rounded-2xl border border-admin-border bg-white p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-admin-muted">Admin CMS</p>
    <h1 class="mt-2 text-2xl font-semibold text-brand-richBlack">Create new perk</h1>
    <p class="text-sm text-admin-muted">Fill out the fields below to match the database schema and keep the CMS in sync with your perks catalog.</p>
  </section>

  {#if formError}
    <div class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {formError}
    </div>
  {/if}

  <form method="POST" enctype="multipart/form-data" use:enhance={enhancePerkForm} class="space-y-6 rounded-2xl border border-admin-border bg-white p-6">
    <PerkFormFields {categories} {subcategories} {locations} bind:isFormValid />
    <div class="flex flex-wrap justify-end gap-3">
      <a href="/admin/perks" class="rounded-lg border border-admin-border px-5 py-2 text-sm font-semibold text-admin-muted">
        Cancel
      </a>
      <button
        type="submit"
        name="intent"
        value="save"
        disabled={!isFormValid}
        class="rounded-lg bg-admin-blue px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
        Save
      </button>
    </div>
  </form>
</div>

<Modal bind:open={successModalOpen} title={successTitle || 'Perk saved'} size="sm" on:close={handleSuccessRedirect}>
  <div class="flex items-start gap-3">
    <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <p class="text-sm text-brand-slateGray">{successDescription || 'We saved your changes successfully.'}</p>
  </div>
  <div class="mt-6 flex justify-end">
    <button
      type="button"
      class="rounded-lg bg-admin-blue px-4 py-2 text-sm font-semibold text-white"
      on:click={handleSuccessRedirect}>
      Back to listing
    </button>
  </div>
</Modal>
