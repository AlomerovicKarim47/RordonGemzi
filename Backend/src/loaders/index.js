import loadExpress from './express.js'
import loadSequelize from './sequelize.js'
import loadRateLimiting from './rateLimiter.js'
import KorisnikDataAccess from '../data/KorisnikDataAccess.js'
import RestoranDataAccess from '../data/RestoranDataAccess.js'
import RezervacijaDataAccess from '../data/RezervacijaDataAccess.js'
import MeniDataAccess from '../data/MeniDataAccess.js'
import JeloDataAccess from '../data/JeloDataAccess.js'
import md5 from 'md5'

const load = async ({expressApp})=>{
    loadRateLimiting({app:expressApp})
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
                password : md5("ergje14gfieg8fgh8dfgjibmn42bb0p6g9pxx"), 
                email : "kalomerovic@mail.com",
                datumRodjenja : "16/12/1997",
                role:"admin"
            }
            await KorisnikDataAccess.dodajKorisnika(admin)
            let user = {
                ime: "Mujo",
                prezime : "Hadzic",
                username : "m2",
                password : md5("12345"),
                email : "mujo@mail.com",
                datumRodjenja : "01/10/1997",
                role:"user"
            }
            await KorisnikDataAccess.dodajKorisnika(user)
        }

        let brojRestorana =  await RestoranDataAccess.prebrojiRestorane()
        if(brojRestorana == 0){
            let restoran = {
                naziv: "Restoran1",
                adresa: "Ismeta Mujezinovica",
                brojMjesta: 35,
                brojDostupnihMjesta: 35
            }
            await RestoranDataAccess.dodajRestoran(restoran); 
        }

        let brojRezevracija = await RezervacijaDataAccess.prebrojiRezervacije()
        if(brojRezevracija == 0){
            let dodajRezervaciju = {
                restoranId: 1,
                brojOsoba: 5,
                datum: "21/1/2021",
                vrijeme: "17:00",
                userId: 1
            }

            await RezervacijaDataAccess.dodajRezervaciju(dodajRezervaciju)
        }
        
        let brojJela = await JeloDataAccess.prebrojiJela();
        if(brojJela == 0){
            let dodajJelo = {
                    naziv: "Piletina",
                    opis :  "Sarajevska piletina",
                    cijena: "5.00"
                }
            
                await JeloDataAccess.dodajJelo(dodajJelo);
        }


        let brojMenija =  await MeniDataAccess.prebrojiMenije();
        if(brojMenija == 0){
            let meni = {
                restoranId: 1,
                jeloId: 1
            }

            await MeniDataAccess.dodajMeni(meni);
        }


        console.log("--Sequelize loaded.--")

        return{app}
    }
    catch(error){
        throw error
    }
}

export default load
