<script>
  import { onMount } from 'svelte'

  // has to happen client-side to establish session
  onMount(async () => {
    await fetch(`/api/code/${window.location.search}`)
    window.location = '/'
  })
</script>

<p>ok fine...</p>
