import { writable } from 'svelte/store'

function createToast() {
  const { subscribe, set, update } = writable([])

  return {
    subscribe,
    trigger: (message, error) => {
      set({
        message,
        error,
        visible: true
      })
      setTimeout(() => {
        update(toastVars => ({ ...toastVars, visible: false }))
      }, 3500)
    },
    close: () => update(toastVars => ({ ...toastVars, visible: false }))
  }
}

export const toast = createToast()
