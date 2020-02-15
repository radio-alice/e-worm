<script>
  import { onMount } from 'svelte'
  import { baseUrl } from '../constants'
  export let content,
    tag,
    name,
    replies = []

  let leaf = Math.ceil(Math.random() * 10)
  if (leaf === 10) leaf = 'q'

  const focus = ({ target }) =>
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })

  // remove links back to original frontend + target="_blank" others
  const domParser = new DOMParser()
  const scrubLinks = content => {
    const parsedContent = domParser.parseFromString(content, 'text/html')
    const links = parsedContent.querySelectorAll('a')
    links.forEach(link => {
      if (link.attributes.href) {
        if (link.attributes.href.value.startsWith(baseUrl)) {
          link.removeAttribute('href')
        } else if (link.hostname !== location.hostname) {
          link.setAttribute('target', '_blank')
        }
      }
    })
    return parsedContent.activeElement.innerHTML
  }

  const scrubbedReplies = replies.map(message => ({
    ...message,
    content: scrubLinks(message.content)
  }))
  const scrubbedContent = scrubLinks(content)
</script>
<style>
  .message {
    padding: var(--s0);
    width: 100%;
    max-width: var(--text-width);
  }
  .message:focus {
    box-shadow: 0 0 var(--s3) var(--pink);
    outline: none;
  }
  .tag {
    font-family: 'Autopia Bold', monospace;
    font-size: var(--s1);
    text-shadow: 0 0 var(--s-1) var(--gold);
  }
  hr {
    border: none;
    border-bottom: var(--s-5) dashed var(--darkgreen);
    flex: 1;
    position: relative;
    bottom: calc(var(--s1) * 0.5);
  }
  .herbier {
    position: relative;
    top: var(--s-3);
    color: var(--darkgreen);
  }
  .name {
    font-style: italic;
  }
  .row * + * {
    margin-left: var(--s-1);
  }
</style>
<div class="message stack" tabindex="0" on:focus="{focus}">
  <div class="row">
    <span class="herbier">{leaf}</span>
    {#if tag}
    <p class="tag">{tag}</p>
    {/if}
    <hr />
  </div>
  <div class="stack">
    <p><span class="name">{name} </span>: {@html scrubbedContent}</p>
    <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
    {#if (replies && replies.length)}
    <ul class="bullets stack">
      {#each scrubbedReplies as reply}
      <li><span class="name">{reply.name} </span>: {@html reply.content}</li>
      {/each}
    </ul>
    {/if}
  </div>
  <slot></slot>
</div>
