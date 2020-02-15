<script>
  import { stores, goto } from '@sapper/app'
  import { changePassword } from '../client_side_api'
  import { toast } from '../components/toast.js'
  import Toast from '../components/Toast.svelte'

  const { session } = stores()
  let oldPW, newPW, accessToken
  session.subscribe(({ token }) => (accessToken = token.access_token))

  const handleSubmit = async () => {
    if (!accessToken) {
      toast.trigger('you were never logged in!', true)
      setTimeout(() => {
        goto('/login')
      }, 2000)
    } else {
      const response = await changePassword(oldPW, newPW, accessToken)
      if (response.error) {
        toast.trigger(`error: ${response.error}`, true)
        return
      }
      toast.trigger(
        "password successfully changed– you'll have to log in again",
        false
      )
      setTimeout(() => {
        goto('/logout')
      }, 2000)
    }
  }
</script>
<style>
  .centerh {
    margin-top: var(--s1);
  }
  input[type='submit'] {
    margin: var(--s3) var(--s1);
  }
  input[type='password'] {
    flex: 5;
    font-size: var(--s0);
    border: none;
    text-shadow: 0 0 var(--s-5) var(--peri);
  }
  input[type='password'] {
    outline: var(--gold);
  }
</style>
<div class="centerh">
  <form on:submit|preventDefault="{handleSubmit}" class="stack">
    <input
      type="password"
      placeholder="old password"
      bind:value="{oldPW}"
      required
    />
    <input
      type="password"
      placeholder="new password"
      bind:value="{newPW}"
      required
    />
    <input
      type="submit"
      value="change password"
      disabled="{(!oldPW || !newPW)}"
    />
  </form>
</div>
<Toast></Toast>
