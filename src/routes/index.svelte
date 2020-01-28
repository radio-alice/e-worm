<svelte:head>
  <title>e-worm club</title>
</svelte:head>
<style>
  .stack {
    width: 100%;
    margin: var(--s0);
    align-items: center;
    margin-bottom: calc(var(--s5) + 0.5vw);
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 var(--s-1) var(--s-1) var(--s-1);
    background-color: var(--peri);
    box-shadow: 0 0 var(--s0) var(--s0) var(--peri);
  }
  footer a {
    font-size: var(--s1);
  }
  #logout {
    position: absolute;
    top: var(--s0);
    right: var(--s0);
  }
</style>
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
      messages = await Promise.all(
        messages.map(async message => ({
          ...message,
          replies: await getReplies(message.id, this.fetch)
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }
</script>
<div class="centerh">
  <main class="stack">
    {#each messages as message (message.id)} {#if (message.in_reply_to_id ===
    null)}
    <Message
      content="{message.content}"
      tag="{message.tags[0]}"
      replies="{message.replies}"
      name="{message.account.username}"
    >
      {#if user}
      <Compose replyID="{message.id}" tag="{message.tags[0].name}"></Compose>
      {/if}
    </Message>
    {/if} {:else}
    <p>loading #content...</p>
    {/each}
  </main>
</div>
<footer>
  {#if user}
  <Compose></Compose>
  {:else}
  <a href="/login">login</a>
  {/if}
</footer>
{#if user}
<a id="logout" href="/logout">logout</a>
{/if}
