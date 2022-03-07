<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import { getFullURL } from '$utils/methods/server';

  const id = $page.params.id;
  let data: string;

  onMount(async () => {
    const response = await getFullURL(id);
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
    @apply text-black font-mono;
  }
</style>
