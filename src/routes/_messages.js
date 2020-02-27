import { writable } from 'svelte/store'
import { getMessagesOlderThanId, stripExcessData } from '../client_side_api'

function createMessages() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    seed: messages => set(messages),
    loadMore: async id => {
      const newMessages = await getMessagesOlderThanId(id, fetch)
      update(messages => messages.concat(newMessages))
    },
    addOne: newMessage =>
      update(messages => [stripExcessData(newMessage), ...messages]),
    addReply: (inReplyToId, newMessage) =>
      update(messages =>
        messages.map(message =>
          message.id === inReplyToId
            ? {
                ...message,
                replies: [...message.replies, stripExcessData(newMessage)]
              }
            : message
        )
      )
  }
}

export const messages = createMessages()
