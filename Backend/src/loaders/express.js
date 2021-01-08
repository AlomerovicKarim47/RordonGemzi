import { json, urlencoded } from "body-parser"
import helmet from 'helmet'
import cors from 'cors'

import apiRouter from '../api/api.js'

const loadExpress = async ({app}) => {
    app.use(cors())
    app.use(json())
    app.use(urlencoded({extended:false}))
    app.use(apiRouter)
    app.use(helmet())
    return {app}
}

export default loadExpress