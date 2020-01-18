const fetch = require('node-fetch')
const FormData = require('form-data')

require('dotenv').config()
const { clientSecret } = process.env
import { clientId, baseUrl, redirectUri } from './constants.js'

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
