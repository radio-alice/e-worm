<style></style>

<svelte:head>
  <title>e-worm club</title>
</svelte:head>

<script context="module">
  import { baseUrl } from '../constants'
  import Message from '../components/Message.svelte'
  import { getPublicMessages, getMessages } from '../client_side_api'
  let messages = []

  export async function preload(page, { token }) {
    try {
      if (token) {
        messages = await getMessages(token.access_token, this.fetch)
      } else {
        messages = await getPublicMessages(this.fetch)
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div>
  <a href="/login">LOGIN</a>
  {#each messages as message}
  <Message
    content="{message.content}"
    time="{message.created_at}"
    media="{message.media_attachments}"
    name="{message.account.display_name}"
  />
  {:else}
  <p>loading #content...</p>
  {/each}
</div>
