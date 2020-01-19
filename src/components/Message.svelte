<style>
  fieldset {
    width: 100%;
    padding: 0;
  }
  fieldset > * {
    margin-left: var(--s0);
  }
</style>
<script>
  export let content, tag, replies, name
  const regex = /<[^>]*>#.*?<[^>]*>/gm //match hashtag links only
</script>
<fieldset class="stack">
  {#if tag}
  <legend>
    {tag.name}
  </legend>
  {/if}
  <p>{name}: {@html content.replace(regex, '')}</p>
  <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
  <ul class="bullets stack">
    {#each replies as reply}
    <li>{reply.account.username}: {@html reply.content.replace(regex, '')}</li>
    {/each}
  </ul>
  <slot></slot>
</fieldset>
