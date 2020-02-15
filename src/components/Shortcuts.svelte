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
    background-color: var(--pink);
    padding: var(--s0);
  }
  .value {
    background-color: var(--peri);
    padding: var(--s-1);
  }
  div {
    display: none;
  }
</style>
<div class="stack" class:visible>
  <p>
    <span class="key">Tab / Shift + Tab</span> -
    <span class="value">navigate through feed</span>
  </p>
  <p>
    <span class="key">Cmd + ⮐</span> -
    <span class="value">send finished post / reply</span>
  </p>
</div>
