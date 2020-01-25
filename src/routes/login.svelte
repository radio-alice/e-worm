<script context="module">
  export async function preload() {
    const loginUrl = await (await this.fetch('/api/login')).text()
    return this.redirect(302, loginUrl)
  }
</script>
