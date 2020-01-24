<script>
  export let content, tag, replies, name
  const regex = /<[^>]*>#.*?<[^>]*>/gm //match hashtag links only
  let leaf = Math.ceil(Math.random() * 10)
  if (leaf === 10) leaf = 'q'
</script>
<style>
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
  .message {
    padding: var(--s0);
    width: 100%;
    max-width: var(--text-width);
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
<div class="message stack">
  <div class="row">
    <span class="herbier">{leaf}</span>
    {#if tag}
    <p class="tag">{tag.name}</p>
    {/if}
    <hr />
  </div>
  <div class="stack">
    <p><span class="name">{name} </span>: {@html content.replace(regex, '')}</p>
    <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
    {#if (replies && replies.length)}
    <ul class="bullets stack">
      {#each replies as reply}
      <li>
        <span class="name">{reply.account.username} </span>: {@html
        reply.content.replace(regex, '')}
      </li>
      {/each}
    </ul>
    {/if}
  </div>
  <slot></slot>
</div>
