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
            let restoran1 = {
                naziv: "Restoran1",
                adresa: "Ismeta Mujezinovica",
                brojMjesta: 35,
                brojDostupnihMjesta: 35
            }
            let restoran2 = {                
                naziv: "Restoran2",
                adresa: "Brace Begic",
                brojMjesta: 20,
                brojDostupnihMjesta: 20
            }            
            let restoran3 = {                
                naziv: "Restoran3",
                adresa: "Marka Marulica",
                brojMjesta: 10,
                brojDostupnihMjesta: 10
            }
            await RestoranDataAccess.dodajRestoran(restoran1); 
            await RestoranDataAccess.dodajRestoran(restoran2);
            await RestoranDataAccess.dodajRestoran(restoran3);  
        }

        let brojRezevracija = await RezervacijaDataAccess.prebrojiRezervacije()
        if(brojRezevracija == 0){
            let dodajRezervaciju1 = {
                restoranId: 1,
                brojOsoba: 5,
                datum: "21/1/2021",
                vrijeme: "17:00",
                userId: 1
            }
            let dodajRezervaciju2 = {
                restoranId: 1,
                brojOsoba: 7,
                datum: "23/1/2021",
                vrijeme: "13:00",
                userId: 1
            }
            let dodajRezervaciju3 = {
                restoranId: 1,
                brojOsoba: 2,
                datum: "1/2/2021",
                vrijeme: "18:00",
                userId: 1
            }

            await RezervacijaDataAccess.dodajRezervaciju(dodajRezervaciju1);
            await RezervacijaDataAccess.dodajRezervaciju(dodajRezervaciju2);
            await RezervacijaDataAccess.dodajRezervaciju(dodajRezervaciju3);

        }
        
        let brojJela = await JeloDataAccess.prebrojiJela();
        if(brojJela == 0){
            let dodajJelo1 = {
                    naziv: "Piletina",
                    opis :  "Sarajevska piletina",
                    cijena: "5.00"
                }
            let dodajJelo2 = {
                naziv: "Hamburger",
                opis :  "Sarajevski hamburger",
                cijena: "3.00"
            }
            let dodajJelo3 = {                
                naziv: "Pomfrit",
                opis :  "Mali pomfrit",
                cijena: "2.00"
            }
            let dodajJelo4 = {                
                naziv: "Salata",
                opis :  "Sezonska salata",
                cijena: "3.00"
            }
            
            await JeloDataAccess.dodajJelo(dodajJelo1);
            await JeloDataAccess.dodajJelo(dodajJelo2);
            await JeloDataAccess.dodajJelo(dodajJelo3);
            await JeloDataAccess.dodajJelo(dodajJelo4);
        }


        let brojMenija =  await MeniDataAccess.prebrojiMenije();
        if(brojMenija == 0){
            let meni11 = {
                restoranId: 1,
                jeloId: 1
            }
            let meni12 = {
                restoranId: 1,
                jeloId: 2
            }
            let meni13 = {
                restoranId: 1,
                jeloId: 3
            }
            let meni21 = {
                restoranId: 2,
                jeloId: 1
            }
            let meni24 = {
                restoranId: 2,
                jeloId: 4
            }
            let meni31 = {
                restoranId: 3,
                jeloId: 1
            }
            let meni34 = {
                restoranId: 3,
                jeloId: 4
            }
            let meni32 = {
                restoranId: 3,
                jeloId: 2
            }

            await MeniDataAccess.dodajMeni(meni11);
            await MeniDataAccess.dodajMeni(meni12);
            await MeniDataAccess.dodajMeni(meni13);
            await MeniDataAccess.dodajMeni(meni21);
            await MeniDataAccess.dodajMeni(meni24);
            await MeniDataAccess.dodajMeni(meni31);
            await MeniDataAccess.dodajMeni(meni34);
            await MeniDataAccess.dodajMeni(meni32);
        }


        console.log("--Sequelize loaded.--")

        return{app}
    }
    catch(error){
        throw error
    }
}

export default load
