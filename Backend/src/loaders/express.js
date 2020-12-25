import { json, urlencoded } from "body-parser"

import apiRouter from '../api/api'

const loadExpress = async ({app}) => {
    app.use(json())
    app.use(urlencoded({extended:false}))
    app.use(apiRouter)
    return {app}
}

export default loadExpress