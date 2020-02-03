<script context="module">
  export async function preload() {
    await this.fetch('/api/logout')
  }
</script>
<script>
  import { onMount } from 'svelte'
  onMount(() => (location.href = '/'))
</script>
<p>beeep boop good bye my love...</p>
