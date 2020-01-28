import { logout } from '../../server_side_api'
export async function get(req, res, next) {
  let response = ''
  if (req.session.token) {
    response = await logout(req.session.token.access_token)
    req.session.token = false
  }
  res.end(JSON.stringify(response))
}
