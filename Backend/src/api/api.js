import {Router} from 'express'
import {
    helloWorldController
} from '../controllers/controllers'

const apiRouter = Router()

apiRouter.get("/", helloWorldController)

export default apiRouter