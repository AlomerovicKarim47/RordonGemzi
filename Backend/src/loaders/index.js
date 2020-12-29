import loadExpress from './express'
import loadSequelize from './sequelize'
import KorisnikDataAccess from '../data/KorisnikDataAccess'
import RestoranDataAccess from '../data/RestoranDataAccess'
import RezervacijaDataAccess from '../data/RezervacijaDataAccess'
import MeniDataAccess from '../data/MeniDataAccess'
import JeloDataAccess from '../data/JeloDataAccess'
import Jelo from '../models/Jelo'

const load = async ({expressApp})=>{
    const app = await loadExpress({app: expressApp})
    console.log("--Express app loaded.--")
    const database = await loadSequelize()
    KorisnikDataAccess.setDatabase(database)
    RestoranDataAccess.setDatabase(database)
    RezervacijaDataAccess.setDatabase(database)
    MeniDataAccess.setDatabase(database)
    JeloDataAccess.setDatabase(database)
    console.log("--Sequelize loaded.--")
    return{app}
}

export default load