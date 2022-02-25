<script>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import '$styles/tailwind.css';
  import '$styles/custom.css';
</script>

<svelte:head>
  <title>Custom URL Shortener</title>
</svelte:head>

<SvelteToast />

<slot />
