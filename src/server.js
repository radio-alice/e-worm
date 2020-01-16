import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import session from 'express-session'
const MemoryStore = require('memorystore')(session)

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
  .use(
    session({
      secret: 'im chungeez',
      store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      resave: false,
      rolling: true,
      saveUninitialized: false
    })
  )
  .use((req, res, next) => {
    if (typeof req.session.token === 'undefined') req.session.token = false
    next()
  })
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => ({
        token: req.session.token
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
