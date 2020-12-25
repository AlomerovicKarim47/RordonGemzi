import express from 'express'
import load from './loaders/index'

const startServer = async()=>{
    const app = express()

    await load({expressApp:app})

    app.listen(7000)
}

startServer()