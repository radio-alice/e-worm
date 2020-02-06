<script>
  import { onMount } from 'svelte'
  import { goto, stores } from '@sapper/app'
  const { session } = stores()

  // has to happen client-side to establish session
  onMount(async () => {
    const res = await (
      await fetch(`/api/code/${window.location.search}`)
    ).json()
    if (res.token) {
      $session.token = res.token
      goto('/')
    }
  })
</script>

<p>ok fine...</p>
