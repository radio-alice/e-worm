<script>
  export let visible
</script>
<style>
  .visible {
    display: flex !important;
    background-color: var(--transperi);
    color: var(--darkgreen);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .stack > * + * {
    margin-top: var(--s3);
  }
  .stack {
    justify-content: center;
    align-items: center;
    font-size: var(--s1);
  }
  .key {
    background-color: var(--transpink);
    padding: var(--s0);
  }
  div {
    display: none;
  }
</style>
<div class="stack" class:visible>
  <p><span class="key">Tab / Shift + Tab</span> - navigate through feed</p>
  <p><span class="key">Cmd + ⮐</span> - send finished post / reply</p>
</div>
