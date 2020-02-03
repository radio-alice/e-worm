<script>
  import { changePassword } from '../client_side_api'
  import { stores } from '@sapper/app'
  const { session } = stores()
  let oldPW, newPW, accessToken

  session.subscribe(({ token }) => (accessToken = token.access_token))

  const handleSubmit = async () => {
    if (!accessToken) {
      window.alert('you were never logged in')
      location.href = '/login'
    }
    const response = await changePassword(oldPW, newPW, accessToken)
    if (response.error) {
      window.alert(response.error)
      return
    }

    location.href = '/logout'
  }
</script>
<style>
  .centerh {
    margin-top: var(--s1);
  }
  input[type='submit'] {
    margin-top: var(--s3);
    font-family: 'CSTM';
    flex: 1;
    background-color: var(--gold);
    font-size: var(--s1);
    box-shadow: 0 0 var(--s0) var(--s-1) var(--gold);
  }
  input[type='submit']:disabled {
    background-color: var(--peri);
    box-shadow: 0 0 var(--s0) var(--s0) var(--peri);
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
