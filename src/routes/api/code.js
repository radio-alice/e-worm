import { getTokenWithCode } from '../../server_side_api'

export async function get(req, res, next) {
  if (req.query.code) {
    const token = await getTokenWithCode(req.query.code)
    req.session.token = token
    res.end()
  }
}
