import { writable } from 'svelte/store'

export const toast = writable({ visible: false, error: false, message: '' })
export const close = () =>
  toast.update(toastVars => ({ ...toastVars, visible: false }))

export const triggerToast = (message, error) => {
  toast.update(values => ({
    message,
    error,
    visible: true
  }))
  setTimeout(() => {
    close()
  }, 3500)
}
