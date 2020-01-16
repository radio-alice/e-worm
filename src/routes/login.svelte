<script context="module">
  import { baseUrl, redirectUri, clientId } from '../constants'

  export async function preload() {
    return this.redirect(
      302,
      `${baseUrl}/oauth/authorize?client_id=${clientId}&scope=read+write+follow+push&redirect_uri=${redirectUri}&response_type=code`
    )
  }
</script>
