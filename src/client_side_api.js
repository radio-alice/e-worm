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
