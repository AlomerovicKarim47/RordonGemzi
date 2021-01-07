import express from 'express'
import load from './loaders/index'
const https = require('https')
const path = require('path')
const fs = require('fs')
const app = express()
load({expressApp:app})
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'server.cert')),
  },
  app
)

sslServer.listen(7000, () => console.log('Secure server started on port 7000'))