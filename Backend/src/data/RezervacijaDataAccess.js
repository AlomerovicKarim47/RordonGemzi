import KorisnikDataAccess from "./KorisnikDataAccess"

let database = null

class RezervacijaDataAccess{
    static setDatabase(db){
        database = db
    }

    static async prebrojiRezervacije(){
        try {
            let rezervacije = await database.Rezervacija.findAndCountAll()
            return rezervacije.count
        } catch (error) {
            throw error
        }
    }

    static async dobaviRezervacije(){
        try {
            let rezervacijeRez = await database.Rezervacija.findAll()
            let rezervacije = []

            for (const r of rezervacijeRez) {
                let user = await KorisnikDataAccess.nadjiKorisnikaPoIdu(r.userId);
                r = r.toJSON(); 
                r.user = user.ime + ' '+ user.prezime;
                rezervacije.push(r);
            }            
            return rezervacije;
    
        } catch (error) {
            throw error
        }
    }

    static async dodajRezervaciju(rezervacija){
        try {
            let restoran = await database.Restoran.findOne({where:{id:rezervacija.restoranId}})

            if (restoran && restoran.brojDostupnihMjesta >= rezervacija.brojOsoba) { //Postoji li restoran i da li ima dovoljno mjesta
                await database.Rezervacija.create(rezervacija);
                let trenutnoDosupnihMjesta = restoran.brojDostupnihMjesta
                restoran.brojDostupnihMjesta = trenutnoDosupnihMjesta - rezervacija.brojOsoba;
                await restoran.save();
                return "Rezervacija je dodana";
            }  
            else {
                return "Rezervacija ne moze biti dodana";
            }                           
        } catch (error) {
            throw error
        }
    }

    static async obrisiRezervaciju({rezervacijaId}){      
        try {
            let rezervacija = await database.Rezervacija.findOne({where:{id:rezervacijaId}});
            if(rezervacija){
                let restoran = await database.Restoran.findOne({where:{id:rezervacija.restoranId}});
                restoran.brojDostupnihMjesta = restoran.brojDostupnihMjesta + rezervacija.brojOsoba;
                await restoran.save();  
            }
            await database.Rezervacija.destroy({where:{id: rezervacijaId}})
            return;
        } catch (error) {
            throw error
        }
    }

}


export default RezervacijaDataAccess