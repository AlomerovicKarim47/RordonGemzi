import express from 'express'
import load from './loaders/index.js'
const https = require('https')
const path = require('path')
const fs = require('fs')
const startServer = async()=>{
  const app = express()

  await load({expressApp:app})

  console.log("RORDON GEMZI RUNNING ON PORT 7000.")
  app.listen(7000)
}

startServer() 