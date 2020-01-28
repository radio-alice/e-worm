const fetch = require('node-fetch')
const FormData = require('form-data')

require('dotenv').config()
const { clientSecret, clientId, redirectUri } = process.env
import { baseUrl } from './constants'

const getClientToken = async () =>
  await (
    await fetch(`${baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'client_credentials'
      }
    })
  ).json()

export const getTokenWithCode = async code => {
  const body = new FormData()
  body.append('client_id', clientId)
  body.append('client_secret', clientSecret)
  body.append('redirect_uri', redirectUri)
  body.append('grant_type', 'authorization_code')
  body.append('scope', 'read write push')
  body.append('code', code)

  return await (
    await fetch(`${baseUrl}/oauth/token`, {
      method: 'POST',
      body
    })
  ).json()
}

export const logout = async token => {
  const body = new FormData()
  body.append('client_id', clientId)
  body.append('client_secret', clientSecret)
  body.append('token', token)

  return await (
    await fetch(`${baseUrl}/oauth/revoke`, {
      method: 'POST',
      body
    })
  ).json()
}
