import { baseUrl } from './constants.js'

export async function getMessages(accessToken, fetch) {
  return await (
    await fetch(`${baseUrl}/api/v1/timelines/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  ).json()
}

export async function getPublicMessages(fetch) {
  return await (await fetch(`${baseUrl}/api/v1/timelines/public`)).json()
}

export async function sendMessage(content, accessToken) {
  const body = new FormData()
  body.append('status', content)
  body.append('visibility', 'private')
  console.log('here: ', body)
  return await fetch(`${baseUrl}/api/v1/statuses`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
