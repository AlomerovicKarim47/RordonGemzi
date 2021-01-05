import KorisnikDataAccess from '../data/KorisnikDataAccess'
import jwt from 'jsonwebtoken'
import passwordHash from 'password-hash'
import { validationResult } from 'express-validator'

const registrujKorisnika = async(req, res, next) => {
    try
    {
        let role = "user"
        req.body.password = passwordHash.generate(req.body.password)
        await KorisnikDataAccess.dodajKorisnika({...req.body, role: role})
        res.end()
    }
    catch(err){
        res.statusCode = 500
        res.end()
        throw err
    }
}

const login = async(req, res, next) => {
    let korisnik = await KorisnikDataAccess.nadjiKorisnika(req.body)
    if (!korisnik || !passwordHash.verify(req.body.password, korisnik.password))
    {
        res.statusCode = 401
        res.end()
        return
    }
    
    delete korisnik.password
    jwt.sign({korisnik}, '123se14c88retkey420'/*, {expiresIn: '1800s'}*/, (err, token) => {
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

const KorisnikController={
    registrujKorisnika,
    login,
    izmjeniUlogu,
    dobaviKorisnike
}

export default KorisnikController