<script>
  import { baseUrl } from '../constants'
  let content = ''
  const handleAddPost = () => {
    fetch(`${baseUrl}/api/v1/status`, {
      method: 'POST',
      body: {
        content
      }
    })
  }
</script>

<form>
  <textarea
    bind:value="{content}"
    placeholder="give me your sweet thoughts"
  ></textarea>
  <input on:click="{handleAddPost}" value="send" />
</form>
