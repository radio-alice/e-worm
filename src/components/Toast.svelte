<script>
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing'
  import { toast, close } from './toast.js'

  let visible, error, message
  const unsubscribe = toast.subscribe(values => {
    ;({ visible, error, message } = values)
  })
</script>
<style>
  .error {
    background-color: var(--pink) !important;
  }
  .toast {
    margin-top: var(--s0);
    background-color: var(--transperi);
    align-items: center;
    width: calc(var(--text-width) / 2);
    padding: var(--s0);
    font-size: var(--s0);
    margin: 0 auto;
    z-index: 10;
  }
  button {
    position: relative;
    bottom: var(--s-1);
    left: var(--s-1);
    font-size: var(--s0);
    flex: 0;
    padding: 0 var(--s-4);
  }
  p {
    flex: 1;
  }
</style>
{#if visible} <div class="toast row" class:error role="dialog" in:fly="{{delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut
}}" out:fade={{duration:300, opacity: 0}}>
  <p>{message}</p>
  <button on:click="{close}">ˣ</button>
</div>
{/if}
