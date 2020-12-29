import express from 'express'
import load from './loaders/index'

const startServer = async()=>{
    const app = express()

    await load({expressApp:app})

    console.log("RORDON GEMZI RUNNING ON PORT 7000.")
    app.listen(7000)
}

startServer()