let database = null

class KorisnikDataAccess{
    static setDatabase(db){
        database = db
    }

    static async dodajKorisnika(podaci){
        try{
            await database.Korisnik.create(podaci)
        }
        catch(err){
            throw err
        }
    }

    static async nadjiKorisnika(podaci){
        try {
            let korisnik = await database.Korisnik.findOne({where:{username:podaci.username}})
            if (korisnik)
                return korisnik.dataValues
            return null
        } catch (error) {
            throw(error)
        }
    }

    static async izmjeniUloguKorisnika(podaci){
        try {
            let korisnik = await database.Korisnik.findOne({where:{username:podaci.username}})
            if (!korisnik)
                return null
            korisnik.role = podaci.role
            await korisnik.save()
            return korisnik
        } catch (error) {
            throw error
        }
    }

    static async prebrojiKorisnike(){
        try {
            let korisnici = await database.Korisnik.findAndCountAll()
            return korisnici.count
        } catch (error) {
            throw error
        }
    }

    static async dobaviKorisnike(){
        try {
            let korisniciRez = await database.Korisnik.findAll()
            let korisnici = []
            korisniciRez.forEach(element => {
                delete element.dataValues.password
                korisnici.push(element.dataValues)
            });
            return korisnici

        } catch (error) {
            throw error
        }
    }
}
export default KorisnikDataAccess