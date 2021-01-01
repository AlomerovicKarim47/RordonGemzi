import RezervacijaDataAccess from '../data/RezervacijaDataAccess'
import jwt from 'jsonwebtoken'

//testni endpoint, moze se brisat
const dobaviRezervacije = async (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403)
        }
        else
        {
            res.end("Dobavljene rezervacije.")
        }
    })
}

const RezervacijaController = {
    dobaviRezervacije
}

export default RezervacijaController