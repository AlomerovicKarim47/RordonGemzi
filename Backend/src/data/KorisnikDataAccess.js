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
            let korisnik = await database.Korisnik.findOne({where:{username:podaci.username, password:podaci.password}})
            if (korisnik)
                return korisnik.dataValues
            return null
        } catch (error) {
            throw(error)
        }
    }
}
export default KorisnikDataAccess