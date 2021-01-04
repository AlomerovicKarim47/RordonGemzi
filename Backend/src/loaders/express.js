import { json, urlencoded } from "body-parser"
import helmet from 'helmet'

import apiRouter from '../api/api'

const loadExpress = async ({app}) => {
    app.use(json())
    app.use(urlencoded({extended:false}))
    app.use(apiRouter)
    app.use(helmet())
    return {app}
}

export default loadExpress