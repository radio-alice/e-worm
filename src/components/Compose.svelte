<script>
  import { baseUrl } from '../constants'
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  const tagOptions = ['talkin shit', 'makin plans', 'apolitical']

  export let replyID = false
  export let tag = 'apolitical'
  let access_token
  let content = ''
  session.subscribe(({ token }) => {
    access_token = token.access_token
  })

  const handleAddPost = async () => {
    if (content) await sendMessage(content, tag, replyID, access_token)
    content = ''
  }
</script>
<style>
  .stack {
    width: 100%;
  }
  textarea {
    flex: 1;
  }
  .row {
    align-items: stretch;
    width: 100%;
  }
  label {
    margin-right: var(--s1);
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
  <div class="row">
    <textarea
      bind:value="{content}"
      placeholder="give me your sweet thoughts"
    ></textarea>
    <input type="submit" disabled="{!(content)}" value="send it" />
  </div>
</form>
