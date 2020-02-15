<script>
  import { goto, stores } from '@sapper/app'
  import { onMount } from 'svelte'
  const { session } = stores()

  onMount(async () => {
    await fetch('/api/logout')
    $session.token = false
    goto('/')
  })
</script>
<p>beeep boop good bye my love...</p>
