<svelte:head>
  <title>e-worm club</title>
</svelte:head>
<style>
  .main {
    width: 100%;
    margin: var(--s0);
    align-items: center;
    margin-bottom: calc(var(--s5) + 0.5vw);
  }
  footer {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0 calc(5vw - var(--s-1)) var(--s-2) calc(5vw - var(--s-1));
    background-color: var(--peri);
    box-shadow: 0 0 var(--s0) var(--s0) var(--peri);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    font-size: calc(var(--s-1) + 0.5vw);
  }
  footer a {
    font-size: calc(var(--s0) + 0.5vw);
  }
  footer * {
    max-width: 100%;
  }
  .misc > * {
    margin-top: var(--s-1);
  }
  .misc > * + * {
    margin-left: calc(var(--s1) + 2vw);
  }
  .misc {
    flex-basis: 15rem;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    max-width: max-content;
  }
  .compose {
    flex-grow: 999;
    flex-basis: 0;
    display: flex;
    justify-content: center;
  }
  #cmd {
    display: none;
  }
</style>
<script>
  import { onMount } from 'svelte'
  import Shortcuts from '../components/Shortcuts.svelte'
  import Message from '../components/Message.svelte'
  import Compose from '../components/Compose.svelte'

  let shortcutsActive = false
  const isCmdKey = e => e.keyCode === 224
  onMount(() => {
    window.onkeydown = e => {
      if (isCmdKey(e)) shortcutsActive = true
    }
    window.onkeyup = e => {
      if (isCmdKey(e)) shortcutsActive = false
    }
    if (window.innerWidth > 600)
      document.querySelector('#cmd').style.display = 'inline'
  })
</script>
<script context="module">
  import { baseUrl } from '../constants'
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
  <main class="stack main">
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
<footer class="flexi">
  <div class="compose">
    {#if user}
    <Compose></Compose>
    {:else}
    <a href="/login">login</a>
    {/if}
  </div>
  <div class="misc">
    {#if user}
    <a href="/logout">logout</a>
    <a href="/change-pw">change password</a>
    {/if}
    <p id="cmd">cmd = view shortcuts</p>
  </div>
</footer>
<Shortcuts visible="{shortcutsActive}"></Shortcuts>
