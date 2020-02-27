import { baseUrl, wsUrl } from './constants.js'
const numberToFetch = 100

export const getMessagesStream = accessToken =>
  new WebSocket(
    `${wsUrl}/api/v1/streaming?access_token=${accessToken}&stream=public`
  )

export const getInitialMessages = fetch =>
  getMessagesAndReplies(
    `${baseUrl}/api/v1/timelines/public?limit=${numberToFetch}`,
    fetch
  )

export const getMessagesOlderThanId = (id, fetch) =>
  getMessagesAndReplies(
    `${baseUrl}/api/v1/timelines/public?limit=${numberToFetch}&max_id=${id}`,
    fetch
  )

const getMessagesAndReplies = async (url, fetch) =>
  await Promise.all(
    (await getMessages(url, fetch)).map(async message => ({
      ...message,
      replies: await getReplies(message.id, fetch)
    }))
  )

const getMessages = async (url, fetch) =>
  (await (await fetch(url)).json())
    .map(stripExcessData)
    .filter(message => message.in_reply_to_id === null)
    .filter(message => message.tag)

const getReplies = async (messageId, fetch) =>
  (
    await (
      await fetch(`${baseUrl}/api/v1/statuses/${messageId}/context`)
    ).json()
  ).descendants.map(stripExcessData)

export const stripExcessData = message => ({
  id: message.id,
  created_at: message.created_at,
  in_reply_to_id: message.in_reply_to_id,
  visibility: message.visibility,
  content: sanitizeContent(message.content),
  name: message.account.username,
  media_attachments: message.media_attachments,
  tag: message.tags[0] ? message.tags[0].name : null
})

const hashtagRegex = /<[^>]*>#.*?<[^>]*>/gm //match hashtag links only
const sanitizeContent = content => content.replace(hashtagRegex, '')
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
