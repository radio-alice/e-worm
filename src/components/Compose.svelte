<script>
  import { tagOptions } from '../constants'
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()

  export let replyID = false
  export let tag = tagOptions[0]
  let access_token
  let content = ''
  session.subscribe(({ token }) => (access_token = token.access_token))

  const handleAddPost = async () => {
    if (content) await sendMessage(content, tag, replyID, access_token)
    content = ''
    location.reload()
  }

  const isCmdEnter = e => e.keyCode == 13 && e.metaKey
</script>
<style>
  .stack {
    width: 100%;
    margin-bottom: 0;
  }
  textarea {
    flex: 5;
    font-size: var(--s0);
    border: none;
    text-shadow: 0 0 var(--s-5) var(--peri);
    max-width: 80%;
  }
  textarea:focus {
    outline: var(--gold);
  }
  .reply {
    height: var(--s1);
    box-shadow: 0 var(--s-thin) var(--s-1) var(--gold);
  }
  .reply textarea {
    font-size: var(--s-1);
  }
  .reply input[type='submit'] {
    font-size: var(--s0);
    padding: 0;
  }
  .row {
    align-items: stretch;
    width: 100%;
  }
  option,
  select {
    font-family: 'Autopia Bold', 'Bagnard';
    text-shadow: 0 0 var(--s-4) var(--gold);
    font-size: var(--s-1);
    text-align: center;
    background-color: var(--transparent);
  }
  select {
    display: block;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    flex: 12;
  }
  .select-wrapper {
    background-color: var(--transcream);
    border-bottom: var(--s-5) solid var(--peri);
  }
  .select-wrapper::after {
    content: '▼';
    flex: 0;
    position: relative;
    right: var(--s-1);
    pointer-events: none;
    align-items: center;
  }
  input[type='submit'] {
    font-family: 'CSTM';
    flex: 1;
    background-color: var(--gold);
  }
  .main {
    margin-top: 0;
  }
  .main input[type='submit'] {
    font-size: var(--s1);
  }
</style>
<form
  on:submit|preventDefault="{handleAddPost}"
  class="stack"
  on:keydown="{e => isCmdEnter(e) ? handleAddPost() : null}"
>
  {#if !replyID}
  <div class="select-wrapper row">
    <select bind:value="{tag}">
      {#each tagOptions as tagOption}
      <option value="{tagOption}">{tagOption}</option>
      {/each}
    </select>
  </div>
  {/if}
  <div class="row {replyID ? 'reply' : 'main'}">
    <textarea
      bind:value="{content}"
      placeholder="give us your sweet thoughts..."
      rows="{replyID ? '1' : '2'}"
    ></textarea>
    <input type="submit" disabled="{!(content)}" value="⇈" />
  </div>
</form>
