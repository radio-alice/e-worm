import { writable } from 'svelte/store'

function createMessages() {
  const { subscribe, set, update } = writable(0)

  return {
    subscribe,
    seed: messages => set(messages),
    append: message => update(messages => [...messages, message])
  }
}

export const messages = createMessages()
