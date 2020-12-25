import loadExpress from './express'

const load = async ({expressApp})=>{
    const app = await loadExpress({app: expressApp})
    console.log("Express app loaded")
    return{app}
}

export default load