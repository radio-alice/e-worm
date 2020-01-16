<style></style>

<svelte:head>
  <title>e-worm club</title>
</svelte:head>

<script context="module">
  import { baseUrl } from '../constants'
  import Message from '../components/Message.svelte'
  import Compose from '../components/Compose.svelte'
  import { getPublicMessages, getMessages } from '../client_side_api'

  let messages = []
  let user = false

  export async function preload(page, { token }) {
    if (token) user = true
    try {
      token
        ? (messages = await getMessages(token.access_token, this.fetch))
        : (messages = await getPublicMessages(this.fetch))
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div>
  <a href="/login">LOGIN</a>
  {#if user}
  <Compose/>
  {/if}
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
