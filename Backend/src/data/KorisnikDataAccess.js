import md5 from 'md5'

let database = null

class KorisnikDataAccess {
    static setDatabase(db) {
        database = db
    }

    static async dodajKorisnika(u) {
        function encrypt(ur, pw) {
            let n = ur.length
            return md5(ur.substring(Math.floor(n / 2), n) + md5(pw) + ur.substring(0, Math.floor(n / 2)))
        }

        try {
            let korisnik = {
                ime: u.ime,
                prezime: u.prezime,
                userSecret: u.username,
                username: md5(u.username),
                password: encrypt(u.username, u.password),
                email: u.email,
                role: "user"
            }
            await database.Korisnik.create(korisnik)
        }
        catch (err) {
            throw err
        }
    }

    static async nadjiKorisnika(podaci) {
        try {
            let korisnik = await database.Korisnik.findOne({ where: { username: podaci.username } })
            if (korisnik) return korisnik.dataValues
            return null
        } catch (error) {
            throw (error)
        }
    }

    static async nadjiKorisnikaPoIdu(userId) {
        try {
            let korisnik = await database.Korisnik.findOne({ where: { id: userId } })
            if (korisnik)
                return korisnik.dataValues
            return null
        } catch (error) {
            throw (error)
        }
    }

    static async izmjeniUloguKorisnika(podaci) {
        try {
            let korisnik = await database.Korisnik.findOne({ where: { username: podaci.username } })
            if (!korisnik)
                return null
            korisnik.role = podaci.role
            await korisnik.save()
            return korisnik
        } catch (error) {
            throw error
        }
    }

    static async prebrojiKorisnike() {
        try {
            let korisnici = await database.Korisnik.findAndCountAll()
            return korisnici.count
        } catch (error) {
            throw error
        }
    }

    static async dobaviKorisnike() {
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
