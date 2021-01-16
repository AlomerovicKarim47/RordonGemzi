import KorisnikDataAccess from '../data/KorisnikDataAccess.js'
import jwt from 'jsonwebtoken'
import md5 from 'md5'

const registrujKorisnika = async (req, res, next) => {
    try {
        let role = "user"
        await KorisnikDataAccess.dodajKorisnika({ ...req.body, role: role })
        res.end()
    }
    catch (err) {
        res.statusCode = 500
        res.end()
        throw err
    }
}

const login = async (req, res, next) => {
    function encrypt(ur, pw) {
        let n = ur.length
        return md5(ur.substring(Math.floor(n / 2), n) + md5(pw) + ur.substring(0, Math.floor(n / 2)))
    }

    let korisnik = await KorisnikDataAccess.nadjiKorisnika(req.body)
    if (!korisnik || !(encrypt(korisnik.userSecret, req.body.password) === korisnik.password)) {
        res.statusCode = 401
        res.end()
        return
    }

    delete korisnik.password
    jwt.sign({ korisnik }, '123se14c88retkey420'/*, {expiresIn: '1800s'}*/, (err, token) => {
        res.json({
            token,
            korisnik
        })
    })
    return
}

const izmjeniUlogu = async (req, res, next) => {
    try {
        let podaci = req.body
        let korisnik = await KorisnikDataAccess.izmjeniUloguKorisnika(podaci)
        if (!korisnik)
            res.statusCode = 404
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const dobaviKorisnike = async (req, res, next) => {
    try {
        let korisnici = await KorisnikDataAccess.dobaviKorisnike();
        res.end(JSON.stringify(korisnici))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const KorisnikController = {
    registrujKorisnika,
    login,
    izmjeniUlogu,
    dobaviKorisnike
}

export default KorisnikController
