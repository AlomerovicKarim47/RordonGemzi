import KorisnikDataAccess from '../data/KorisnikDataAccess'
import jwt from 'jsonwebtoken'

const registrujKorisnika = async(req, res, next) => {
    try
    {
        await KorisnikDataAccess.dodajKorisnika({...req.body, role: "user"})
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
    
    delete korisnik.password
    jwt.sign({korisnik}, 'secretkey'/*, {expiresIn: '1800s'}*/, (err, token) => {
        res.json({
            token
        })
    }) 
    return 
}

const izmjeniUlogu = async (req, res, next) => {
    try {
        let podaci = req.body
        await KorisnikDataAccess.izmjeniUloguKorisnika(podaci)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const KorisnikController={
    registrujKorisnika,
    login,
    izmjeniUlogu
}

export default KorisnikController