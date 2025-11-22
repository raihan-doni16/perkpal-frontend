<script lang="ts">
  import { SITE_NAME, TWITTER_URL, LINKEDIN_URL } from '$lib/config';
  const siteName = SITE_NAME;
  const twitter = TWITTER_URL;
  const linkedin = LINKEDIN_URL;
</script>

<footer class="bg-brand-darkGreen mt-16">
  <div class="container-w flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 text-sm text-white/80">
    <nav class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <a href="/about" class="hover:text-white">About</a>
      <a href="/contact" class="hover:text-white">Contact</a>
      <a href="/terms" class="hover:text-white">Terms of Service</a>
      <a href="/privacy" class="hover:text-white">Privacy Policy</a>
    </nav>
    <div class="ml-auto">&copy; {new Date().getFullYear()} PerkPal. All rights reserved.</div>
  </div>
</footer>
