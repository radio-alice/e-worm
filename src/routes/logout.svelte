<script context="module">
  export async function preload() {
    await this.fetch('/api/logout')
  }
</script>
<script>
  import { goto } from '@sapper/app'
  import { onMount } from 'svelte'
  onMount(() => goto('/'))
</script>
<p>beeep boop good bye my love...</p>
