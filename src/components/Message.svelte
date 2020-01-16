<script>
  export let name, time, content, media
</script>

<div>
  <div>
    <h3>{name}</h3>
    <span>{time}</span>
  </div>
  <p>{content}</p>
  <!-- {#if media}
  <svelte:component this={media.component} />
  {/if} -->
</div>
