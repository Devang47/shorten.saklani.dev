<script lang="ts">
  import { goto } from '$app/navigation';

  import { page } from '$app/stores';
  import { redirectToURL } from '$utils/methods/redirect';
  import { onMount } from 'svelte';

  const id = $page.params.id;
  let data: string;

  onMount(async () => {
    const response = await redirectToURL(id);
    if (response.error) return (data = 'Not found!!');
    goto(response.result);
  });
</script>

<div class="response">
  {#if !data}
    redirecting ...
  {:else}
    {data}
  {/if}
</div>

<style lang="postcss">
  .response {
    @apply text-white font-mono;
  }
</style>
