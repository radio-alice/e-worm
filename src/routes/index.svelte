<svelte:head>
  <title>e-worm club</title>
</svelte:head>
<svelte:window on:keydown="{handleKeyDown}" on:keyup="{handleKeyUp}" />
<script>
  import { onMount } from 'svelte'
  import Shortcuts from '../components/Shortcuts.svelte'
  import Message from '../components/Message.svelte'
  import Compose from '../components/Compose.svelte'
  import { messages } from './_messages'
  import { startDate } from '../constants'
  import { getMessagesStream } from '../client_side_api'

  export let user
  export let initialMessages
  export let access_token
  let shortcutsActive = false
  let loadedAllMessages = false

  const isCtrlKey = e => e.key === 'Control'
  const handleKeyDown = e => {
    if (isCtrlKey(e)) shortcutsActive = true
  }
  const handleKeyUp = e => {
    if (isCtrlKey(e)) shortcutsActive = false
  }

  $: lastMessage = $messages[$messages.length - 1]
  async function loadMore() {
    await messages.loadMore(lastMessage.id)
    loadedAllMessages = new Date(lastMessage.created_at) <= startDate
  }
  onMount(() => {
    messages.seed(initialMessages)
    if (access_token) {
      const messagesStream = getMessagesStream(access_token)
      messagesStream.onmessage = message => {
        if (!message.data) return
        const data = JSON.parse(message.data)
        if (data.event !== 'update') return
        const payload = JSON.parse(data.payload)
        if (payload.in_reply_to_id === null) {
          messages.addOne(payload)
        } else {
          messages.addReply(payload.in_reply_to_id, payload)
        }
      }
    }

    if (window.innerWidth > 600)
      document.querySelector('#ctrl').style.display = 'inline'
  })
</script>
<script context="module">
  import { baseUrl } from '../constants'
  import { getInitialMessages } from '../client_side_api'

  export async function preload(page, { token }) {
    const user = token ? true : false
    const initialMessages = await getInitialMessages(this.fetch)
    return { user, initialMessages, access_token: token.access_token }
  }
</script>
<style>
  .main {
    width: 100%;
    margin: var(--s0);
    align-items: center;
  }
  header {
    flex-direction: row;
    width: 100%;
    padding: var(--s-2) calc(5vw - var(--s-1)) 0 calc(5vw - var(--s-1));
    background-color: var(--peri);
    box-shadow: 0 0 var(--s0) var(--s0) var(--peri);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap-reverse;
    font-size: calc(var(--s-1) + 0.5vw);
    margin-bottom: var(--s1);
  }
  header a {
    font-size: calc(var(--s0) + 0.5vw);
  }
  header * {
    max-width: 100%;
  }
  .misc > * + * {
    margin-top: var(--s-1);
  }
  .misc > * + * {
    margin-left: calc(var(--s1) + 2vw);
  }
  .misc {
    flex-basis: 15rem;
    flex-grow: 1;
    text-align: right;
  }
  .compose {
    flex-grow: 999;
    flex-basis: 15rem;
    display: flex;
    justify-content: center;
  }
  #ctrl {
    display: none;
  }
  .load-more {
    margin: var(--s1) 0;
  }
  .load-more.loadedAllMessages {
    display: none;
  }
</style>
<header>
  <div class="compose">
    {#if user}
    <Compose></Compose>
    {:else}
    <a href="/login">login</a>
    {/if}
  </div>
  <div class="misc cluster">
    <div>
      {#if user}
      <a href="/logout">logout</a>
      <a href="/change-pw">change password</a>
      {/if}
      <p id="ctrl">ctrl = view shortcuts</p>
    </div>
  </div>
</header>
<div class="centerh">
  <main class="stack main">
    {#each $messages as message (message.id)}
    <Message {...message}>
      {#if user}
      <Compose replyID="{message.id}" tag="{message.tag}"></Compose>
      {/if}
    </Message>
    {:else}
    <p>loading #content...</p>
    {/each}
    <button class="load-more" on:click="{loadMore}" class:loadedAllMessages>
      load more
    </button>
  </main>
</div>
<Shortcuts visible="{shortcutsActive}"></Shortcuts>
