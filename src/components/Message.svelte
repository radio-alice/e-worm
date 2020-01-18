<script>
  export let content, tag, replies, name
  const regex = /<[^>]*>#.*?<[^>]*>/gm
</script>
<div>
  {#if tag}
  <p>
    #{tag.name}
  </p>
  {/if}
  <p>{name}: {@html content.replace(regex, '')}</p>
  {#each replies as reply}
  <ul>
    <li>{reply.account.username}: {@html reply.content.replace(regex, '')}</li>
  </ul>
  {/each}
  <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
</div>
