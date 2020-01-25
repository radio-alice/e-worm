require('dotenv').config()
const { clientId, redirectUri } = process.env
import { baseUrl } from '../../constants'

export async function get(req, res, next) {
  res.end(
    `${baseUrl}/oauth/authorize?client_id=${clientId}&scope=read+write+follow+push&redirect_uri=${redirectUri}&response_type=code`
  )
}
