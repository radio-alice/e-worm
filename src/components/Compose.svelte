<script>
  import { baseUrl } from '../constants'
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  const tagOptions = ['talkin_shit', 'makin_plans', 'apolitical']

  export let replyID = false
  export let tag = 'apolitical'
  let access_token
  let content = ''
  session.subscribe(({ token }) => {
    access_token = token.access_token
  })

  const handleAddPost = async () => {
    console.log(content)
    if (content) await sendMessage(content, tag, replyID, access_token)
    content = ''
  }
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
  }
  .reply {
    height: var(--s1);
    box-shadow: 0 var(--s-thin) var(--s-1) var(--gold);
  }
  .reply textarea {
    font-family: 'Bagnard';
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
  label {
    margin-right: var(--s2);
    font-family: 'Autopia Bold', monospace;
    text-shadow: 0 0 var(--s-4) var(--gold);
  }
  input[type='radio'] {
    margin-right: var(--s-1);
  }
  input[type='submit'] {
    font-family: 'CSTM';
    flex: 1;
    background-color: var(--gold);
  }
  .main input[type='submit'] {
    font-size: var(--s1);
  }
</style>
<form on:submit="{handleAddPost}" class="stack">
  {#if !replyID}
  <div class="row">
    {#each tagOptions as tagOption}
    <label
      ><input
        type="radio"
        bind:group="{tag}"
        value="{tagOption}"
      />{tagOption}</label
    >
    {/each}
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
