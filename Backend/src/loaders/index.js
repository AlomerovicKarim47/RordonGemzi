import loadExpress from './express'
import loadSequelize from './sequelize'
import loadRateLimiting from './rateLimiter'
import KorisnikDataAccess from '../data/KorisnikDataAccess'
import RestoranDataAccess from '../data/RestoranDataAccess'
import RezervacijaDataAccess from '../data/RezervacijaDataAccess'
import MeniDataAccess from '../data/MeniDataAccess'
import JeloDataAccess from '../data/JeloDataAccess'
import passwordHash from 'password-hash'

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
                password : passwordHash.generate("12345"),
                email : "kalomerovic@mail.com",
                datumRodjenja : "16.12.1997.",
                role:"admin"
            }
            await KorisnikDataAccess.dodajKorisnika(admin)
            
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
                datum: "21.1.2021",
                vrijeme: "17:00"
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