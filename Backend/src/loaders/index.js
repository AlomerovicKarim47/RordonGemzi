import loadExpress from './express'
import loadSequelize from './sequelize'
import KorisnikDataAccess from '../data/KorisnikDataAccess'
import RestoranDataAccess from '../data/RestoranDataAccess'
import RezervacijaDataAccess from '../data/RezervacijaDataAccess'
import MeniDataAccess from '../data/MeniDataAccess'
import JeloDataAccess from '../data/JeloDataAccess'
import passwordHash from 'password-hash'

const load = async ({expressApp})=>{
    const app = await loadExpress({app: expressApp})
    console.log("--Express app loaded.--")
    const database = await loadSequelize()
    KorisnikDataAccess.setDatabase(database)
    RestoranDataAccess.setDatabase(database)
    RezervacijaDataAccess.setDatabase(database)
    MeniDataAccess.setDatabase(database)
    JeloDataAccess.setDatabase(database)

    try{
        let brojKorisnika = await KorisnikDataAccess.prebrojiKorisnike()
        if (brojKorisnika == 0)
        {
            let admin = {
                ime: "Karim",
                prezime : "Alomerovic",
                username : "dddd2",
                password : passwordHash.generate("12345"),
                email : "kalomerovic@mail.com",
                datumRodjenja : "16.12.1997.",
                role:"admin"
            }
            await KorisnikDataAccess.dodajKorisnika(admin)
            
        }

        console.log("--Sequelize loaded.--")
        return{app}
    }
    catch(error){
        throw error
    }
}

export default load