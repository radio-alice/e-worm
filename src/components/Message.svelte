<script>
  export let content, tag, replies, name
  const regex = /<[^>]*>#.*?<[^>]*>/gm //match hashtag links only
</script>
<style>
  fieldset {
    width: 100%;
    background-color: var(--lightgrey);
    border: var(--s-5) solid var(--darkgrey);
    box-shadow: var(--s-2) var(--s-2) var(--blue);
  }
  fieldset:active {
    box-shadow: none;
    transform: translate(var(--s-2), var(--s-2));
  }
  .content {
    padding: 0 var(--s0) var(--s-1) var(--s0);
  }
  legend {
    background-color: var(--darkgrey);
    color: var(--blue);
    padding: var(--s-4) var(--s0);
    font-family: 'rumeur', monospace;
    margin-left: var(--s0);
  }
  hr {
    border: none;
    border-bottom: var(--s-5) dashed var(--darkgrey);
  }
</style>
<fieldset>
  {#if tag}
  <legend>{tag.name}</legend>
  {/if}
  <div class="content stack">
    <p>{name}: {@html content.replace(regex, '')}</p>
    <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
    {#if (replies && replies.length)}
    <hr />
    <ul class="bullets stack">
      {#each replies as reply}
      <li>
        {reply.account.username}: {@html reply.content.replace(regex, '')}
      </li>
      {/each}
    </ul>
    {/if}
  </div>
  <slot></slot>
</fieldset>
