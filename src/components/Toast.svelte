<script>
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { backOut } from 'svelte/easing'
  import { toast } from './toast.js'

  let visible, error, message
  const unsubscribe = toast.subscribe(values => {
    ;({ visible, error, message } = values)
  })
</script>
<style>
  .error {
    background-color: var(--pink) !important;
    box-shadow: 0 0 var(--s0) var(--s0) var(--pink) !important;
  }
  .toast {
    margin-top: var(--s0);
    background-color: var(--transperi);
    box-shadow: 0 0 var(--s0) var(--s0) var(--transperi);
    align-items: center;
    width: calc(var(--text-width) / 2);
    font-size: var(--s0);
    margin: 0 auto;
    z-index: 10;
    position: relative;
  }
  button {
    cursor: pointer;
    position: absolute;
    right: 0;
    font-size: var(--s0);
    flex: 0;
    padding: 0 var(--s-4);
    color: var(--pink);
    background-color: var(--darkblue);
  }
  p {
    flex: 1;
  }
</style>
{#if visible} <div class="toast row" class:error role="dialog" in:fly="{{delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut
}}" out:fade={{duration:300, opacity: 0}}>
  <p>{message}</p>
  <button on:click="{toast.close}">ˣ</button>
</div>
{/if}
