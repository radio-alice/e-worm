<script>
  import { baseUrl } from '../constants'
  import { sendMessage } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  let access_token
  let content = ''
  session.subscribe(({ token }) => {
    access_token = token.access_token
  })

  const handleAddPost = async () => {
    content ? await sendMessage(content, access_token) : null
    content = ''
  }
</script>

<form on:submit|preventDefault="{handleAddPost}">
  <textarea
    bind:value="{content}"
    placeholder="give me your sweet thoughts"
  ></textarea>
  <input type="submit" disabled="{!(content)}" value="send it" />
</form>
