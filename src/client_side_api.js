import { baseUrl } from './constants.js'

export async function getPrivateMessages(accessToken, fetch) {
  return await (
    await fetch(`${baseUrl}/api/v1/timelines/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  ).json()
}

export const getPublicMessages = async fetch =>
  await (await fetch(`${baseUrl}/api/v1/timelines/public`)).json()

export const getReplies = async (messageId, fetch) =>
  (
    await (
      await fetch(`${baseUrl}/api/v1/statuses/${messageId}/context`)
    ).json()
  ).descendants

export const sendMessage = async (content, tag, replyID, accessToken) => {
  const body = new FormData()
  if (tag) content = `${content} #${tag.replace(' ', '_')}`
  body.append('status', content)
  body.append('visibility', 'public')
  if (replyID) body.append('in_reply_to_id', replyID)
  return await fetch(`${baseUrl}/api/v1/statuses`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const changePassword = async (password, newPassword, accessToken) => {
  const body = new FormData()
  body.append('password', password)
  body.append('new_password', newPassword)
  body.append('new_password_confirmation', newPassword)

  return await (
    await fetch(`${baseUrl}/api/pleroma/change_password`, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  ).json()
}
