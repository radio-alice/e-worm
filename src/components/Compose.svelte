<script>
  import { tagOptions } from '../constants'
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  export let replyID = false
  export let tag = tagOptions[0]
  let access_token
  let content = ''
  let jsEnabled = false
  session.subscribe(({ token }) => (access_token = token.access_token))

  async function handleAddPost() {
    if (content) await sendMessage(content, tag, replyID, access_token)
    content = ''
    location.reload()
  }

  function resizeCompose(e) {}

  const isCmdEnter = e => e.keyCode == 13 && e.metaKey
</script>
<style>
  .stack {
    width: 100%;
    margin-bottom: 0;
  }
  .expandingArea {
    position: relative;
    flex: 5;
    max-width: 80%;
  }
  .expandingArea > pre,
  textarea {
    outline: var(--gold);
    font-size: var(--s0);
    text-shadow: 0 0 var(--s-thin) var(--peri);
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .expandingArea textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .expandingArea.active > textarea {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    resize: none;
  }
  .expandingArea > pre {
    display: none;
  }
  .expandingArea.active > pre {
    display: block;
    /* Hide the text; just using it for sizing */
    visibility: hidden;
  }
  .reply {
    box-shadow: 0 var(--s-thin) var(--s-1) var(--gold);
  }
  .row {
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
    box-shadow: none;
  }
  .main {
    margin-top: 0;
    min-height: var(--s3);
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
    <div class="expandingArea active">
      <pre><span>{content}</span><br /></pre>
      <textarea
        bind:value="{content}"
        on:input="{resizeCompose}"
        placeholder="give us your sweet thoughts..."
        rows="{replyID ? '1' : '2'}"
      ></textarea>
    </div>
    <input type="submit" disabled="{!(content)}" value="⇈" />
  </div>
</form>
