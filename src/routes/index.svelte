<svelte:head>
  <title>e-worm club</title>
</svelte:head>
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
    flex-wrap: wrap;
    font-size: calc(var(--s-1) + 0.5vw);
  }
  header a {
    font-size: calc(var(--s0) + 0.5vw);
  }
  header * {
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
  #ctrl {
    display: none;
  }
  .load-more {
    margin: var(--s1) 0;
  }
</style>
<svelte:window on:keydown="{handleKeyDown}" on:keyup="{handleKeyUp}" />
<script>
  import { onMount } from 'svelte'
  import Shortcuts from '../components/Shortcuts.svelte'
  import Message from '../components/Message.svelte'
  import Compose from '../components/Compose.svelte'
  import { messages } from './_messages'

  export let user
  export let initialMessages
  let shortcutsActive = false

  const isCtrlKey = e => e.key === 'Control'
  const handleKeyDown = e => {
    if (isCtrlKey(e)) shortcutsActive = true
  }
  const handleKeyUp = e => {
    if (isCtrlKey(e)) shortcutsActive = false
  }
  onMount(() => {
    messages.seed(initialMessages)

    if (window.innerWidth > 600)
      document.querySelector('#ctrl').style.display = 'inline'

    // remove links back to original frontend + target="_blank" others
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      if (link.attributes.href) {
        if (link.attributes.href.value.startsWith(baseUrl)) {
          link.removeAttribute('href')
        } else if (link.hostname !== location.hostname) {
          link.setAttribute('target', '_blank')
        }
      }
    })
  })
</script>
<script context="module">
  import { baseUrl } from '../constants'
  import { getInitialMessages } from '../client_side_api'

  export async function preload(page, { token }) {
    const user = token ? true : false
    const initialMessages = await getInitialMessages(this.fetch)
    return { user, initialMessages }
  }
</script>
<header class="flexi">
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
    <p id="ctrl">ctrl = view shortcuts</p>
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
    <button class="load-more">load more</button>
  </main>
</div>
<Shortcuts visible="{shortcutsActive}"></Shortcuts>
