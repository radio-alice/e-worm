import { writable } from 'svelte/store'
import { getMessagesOlderThanId } from '../client_side_api'

function createMessages() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    seed: messages => set(messages),
    loadMore: async id => {
      const newMessages = await getMessagesOlderThanId(id, fetch)
      update(messages => messages.concat(newMessages))
    }
  }
}

export const messages = createMessages()
