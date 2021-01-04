import RezervacijaDataAccess from '../data/RezervacijaDataAccess'
import jwt from 'jsonwebtoken'

const dobaviRezervacije = async (req, res, next) => {
    try{
        let rezervacije = await RezervacijaDataAccess.dobaviRezervacije();
        res.end(JSON.stringify(rezervacije))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }   
}

const dodajRezervaciju = async (req, res, next) => {
    try {
        let rezultat = await RezervacijaDataAccess.dodajRezervaciju(req.body)
        res.end(rezultat);
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const obrisiRezervaciju = async (req, res) => {
    try {
        let rezervacijaId= req.params.rezervacijaId
        await RezervacijaDataAccess.obrisiRezervaciju({rezervacijaId})
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const RezervacijaController = {
    dobaviRezervacije,
    dodajRezervaciju,
    obrisiRezervaciju
}

export default RezervacijaController