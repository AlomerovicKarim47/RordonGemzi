import express from 'express'
import load from './loaders/index.js'
const https = require('https')
const path = require('path')
const fs = require('fs')
var httpProxy = require('http-proxy');
const app = express()
load({expressApp:app})
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'server.cert')),
  },
  app
)

sslServer.listen(9000, () => console.log('Secure server started on port 9000'))