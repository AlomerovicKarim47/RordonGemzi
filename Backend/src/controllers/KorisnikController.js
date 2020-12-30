import KorisnikDataAccess from '../data/KorisnikDataAccess'
import jwt from 'jsonwebtoken'

const registrujKorisnika = async(req, res, next) => {
    try
    {
        await KorisnikDataAccess.dodajKorisnika(req.body)
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
    if (!korisnik)
    {
        res.statusCode = 401
        res.end()
        return
    }
    
    jwt.sign({korisnik}, 'secretkey', {expiresIn: '1800s'}, (err, token) => {
        res.json({
            token
        })
    }) 
    return 
}

const KorisnikController={
    registrujKorisnika,
    login
}

export default KorisnikController