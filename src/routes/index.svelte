<svelte:head>
  <title>e-worm club</title>
</svelte:head>

<script context="module">
  import { baseUrl } from '../constants'
  import Message from '../components/Message.svelte'
  import Compose from '../components/Compose.svelte'
  import { getPublicMessages, getReplies } from '../client_side_api'
  let messages = []
  let user = false

  export async function preload(page, { token }) {
    if (token) user = true
    try {
      messages = await getPublicMessages(this.fetch)
      messages = await Promise.all(messages.map(
        async message => ({
          ...message,
          replies: await getReplies(message.id, this.fetch)
        })
      ))
    } catch (error) {
      console.error(error)
    }
  }
</script>

<div>
  {#if user}
  <Compose/>
  {:else}
  <a href="/login">LOGIN</a>
  {/if}
  {#each messages as message (message.id)}
    {#if (message.in_reply_to_id === null)}
    <Message
      content={message.content}
      tag={message.tags[0]}
      replies={message.replies}
      name={message.account.username}
    />
      {#if user}
      <Compose replyID={message.id} tag={message.tags[0]}/>
  {/if} {/if} {:else}
  <p>loading #content...</p>
  {/each}
</div>
