<script>
  import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';

  export let categories = [];
  export let post = null;
  const tagsValue = post?.tags ? post.tags.join(', ') : '';
  const publishedAtValue = post?.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '';

  let title = post?.title ?? '';
  let slug = post?.slug ?? '';
  let isSlugManuallyEdited = !!post?.slug;
  let coverImageFileName = '';
  let authorAvatarFileName = '';

  function generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  function handleTitleInput(e) {
    title = e.target.value;
    if (!isSlugManuallyEdited) {
      slug = generateSlug(title);
    }
  }

  function handleSlugInput(e) {
    slug = e.target.value;
    isSlugManuallyEdited = true;
  }

  function handleCoverImageChange(e) {
    const file = e.target.files?.[0];
    coverImageFileName = file ? file.name : '';
  }

  function handleAuthorAvatarChange(e) {
    const file = e.target.files?.[0];
    authorAvatarFileName = file ? file.name : '';
  }
</script>

<div class="space-y-6">
  <!-- Method spoofing for Laravel PUT with FormData -->
  {#if post}
    <input type="hidden" name="_method" value="PUT" />
  {/if}

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div>
      <label class="block text-sm text-admin-muted" for="title">Title</label>
      <input id="title" name="title" type="text" required bind:value={title} on:input={handleTitleInput}
             class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
    </div>
    <div>
      <label class="block text-sm text-admin-muted" for="slug">Slug <span class="text-xs font-normal">(auto-generated from title)</span></label>
      <input id="slug" name="slug" type="text" required bind:value={slug} on:input={handleSlugInput}
             class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
    </div>
    <div>
      <label class="block text-sm text-admin-muted" for="category_id">Category</label>
      <select id="category_id" name="category_id"
              class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue">
        <option value="">No category</option>
        {#each categories as cat}
          <option
            value={cat.id}
            selected={String(cat.id) === String(post?.category_id ?? post?.category_data?.id)}>
            {cat.name}
          </option>
        {/each}
      </select>
    </div>
    <div>
      <label class="block text-sm text-admin-muted" for="tags">Tags</label>
      <input id="tags" name="tags" value={tagsValue}
             placeholder="comma separated"
             class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
    </div>
  </div>

  <div>
    <label class="block text-sm text-admin-muted" for="excerpt">Excerpt</label>
    <textarea id="excerpt" name="excerpt" rows="2"
              class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue">{post?.excerpt ?? ''}</textarea>
  </div>

  <div>
    <label class="block text-sm text-admin-muted mb-2" for="content-editor">Content</label>
    <RichTextEditor id="content-editor" name="content" value={post?.content ?? ''} />
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div>
      <label class="block text-sm text-admin-muted mb-1" for="cover_image">Cover Image</label>
      <div class="relative flex items-center gap-4 rounded-lg border border-admin-border bg-white px-4 py-3 text-sm text-admin-muted">
        <label for="cover_image" class="cursor-pointer rounded-full bg-admin-blue px-3 py-1 text-white hover:bg-admin-blue/90">
          Choose File
        </label>
        <input id="cover_image" type="file" name="cover_image" accept="image/*" class="hidden" on:change={handleCoverImageChange} />
        <span class="text-admin-muted text-xs">
          {#if coverImageFileName}
            {coverImageFileName}
          {:else if post?.cover_image}
            Current: {post.cover_image.split('/').pop()}
          {:else}
            No file chosen
          {/if}
        </span>
      </div>
      {#if post?.cover_image}
        <img src={post.cover_image} alt="Cover" class="mt-2 max-h-28 w-full rounded-xl border border-admin-border object-cover" />
      {/if}
    </div>

    <div>
      <label class="block text-sm text-admin-muted" for="author_name">Author Name</label>
      <input id="author_name" name="author_name" value={post?.author?.name ?? post?.author_name ?? ''}
             class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div>
      <label class="block text-sm text-admin-muted mb-1" for="author_avatar">Author Avatar</label>
      <div class="relative flex items-center gap-4 rounded-lg border border-admin-border bg-white px-4 py-3 text-sm text-admin-muted">
        <label for="author_avatar" class="cursor-pointer rounded-full bg-admin-blue px-3 py-1 text-white hover:bg-admin-blue/90">
          Choose File
        </label>
        <input id="author_avatar" type="file" name="author_avatar" accept="image/*" class="hidden" on:change={handleAuthorAvatarChange} />
        <span class="text-admin-muted text-xs">
          {#if authorAvatarFileName}
            {authorAvatarFileName}
          {:else if post?.author?.avatar ?? post?.author_avatar}
            Current: {(post.author?.avatar ?? post.author_avatar).split('/').pop()}
          {:else}
            No file chosen
          {/if}
        </span>
      </div>
      {#if post?.author?.avatar ?? post?.author_avatar}
        <img src={post.author?.avatar ?? post.author_avatar} alt="Author Avatar" class="mt-2 h-16 w-16 rounded-full border border-admin-border object-cover" />
      {/if}
    </div>
    <div class="flex items-center gap-4 text-sm">
      <label class="inline-flex items-center gap-2">
        <input type="hidden" name="is_published" value="0" />
        <input type="checkbox" name="is_published" value="1" checked={post ? !!post.is_published : true}
               class="h-4 w-4 rounded border-gray-300 text-admin-blue focus:ring-admin-blue" />
        Published
      </label>
    </div>
  </div>

  <div>
    <label class="block text-sm text-admin-muted" for="published_at">Published At</label>
    <input id="published_at" name="published_at" type="datetime-local" value={publishedAtValue}
           class="mt-1 w-full rounded-lg border border-admin-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-admin-blue" />
  </div>
</div>
