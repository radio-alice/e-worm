<style>
  fieldset {
    width: 100%;
  }
</style>
<script>
  export let content, tag, replies, name
  const regex = /<[^>]*>#.*?<[^>]*>/gm //match hashtag links only
</script>
<fieldset>
  {#if tag}
  <legend>
    {tag.name}
  </legend>
  {/if}
  <p>{name}: {@html content.replace(regex, '')}</p>
  <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
  {#each replies as reply}
  <ul>
    <li>{reply.account.username}: {@html reply.content.replace(regex, '')}</li>
  </ul>
  {/each}
  <slot></slot>
</fieldset>
