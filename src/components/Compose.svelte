<script>
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  export let replyID = false
  export let tag = ''
  let access_token
  let content = ''
  let jsEnabled = false
  session.subscribe(({ token }) => (access_token = token.access_token))

  $: disableSend = !(content && content.length <= 500)
  $: contentTooLong = content.length > 500

  async function handleAddPost() {
    const message = content
    tag = tag || 'untitled'
    content = ''
    if (message) {
      await sendMessage(message, tag, replyID, access_token)
      location.reload()
    }
  }

  const isCmdEnter = e => e.keyCode == 13 && e.metaKey
</script>
<style>
  .stack {
    width: 100%;
    margin-bottom: 0;
  }
  .expandingArea {
    flex: 5;
    max-width: 80%;
    position: relative;
  }
  .contentTooLong::before {
    content: 'hoo boy I can only handle 500 characters at a time now';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--pink);
    z-index: 10;
    font-style: italic;
    padding: var(--s0);
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
  .tag {
    font-family: 'Autopia Bold', 'Bagnard';
    text-shadow: 0 0 var(--s-4) var(--gold);
    text-align: center;
    background-color: var(--transcream);
    max-width: 80%;
    margin-bottom: var(--s-3);
  }
  input[type='submit'] {
    font-family: 'CSTM';
    flex: 1;
    box-shadow: none;
  }
  .main input[type='submit']:disabled {
    border: dotted var(--darkblue) var(--s-5);
  }
  .main {
    margin-top: 0;
    height: min-content;
  }
  .main .expandingArea {
    min-height: var(--s3);
  }
</style>
<form
  on:submit|preventDefault="{handleAddPost}"
  class="stack"
  on:keydown="{e => isCmdEnter(e) ? handleAddPost() : null}"
>
  {#if !replyID}
  <input
    class="tag"
    type="text"
    bind:value="{tag}"
    placeholder="subject (e.g. music, Pete, etc.)"
  />
  {/if}
  <div class="row {replyID ? 'reply' : 'main'}">
    <div class="expandingArea active" class:contentTooLong>
      <pre><span>{content}</span><br /></pre>
      <textarea
        bind:value="{content}"
        placeholder="give us your sweet thoughts..."
      ></textarea>
    </div>
    <input type="submit" disabled="{disableSend}" value="⇈" />
  </div>
</form>
