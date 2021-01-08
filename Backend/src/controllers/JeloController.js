import JeloDataAccess from '../data/JeloDataAccess.js'
import MeniDataAccess from '../data/MeniDataAccess.js'


const dobaviJela = async (req, res, next) => {
    try {
        let jela = await JeloDataAccess.dobaviJela();
        res.end(JSON.stringify(jela));
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const dodajJelo = async (req, res, next) => {
    try {
        let rezultat = await JeloDataAccess.dodajJelo(req.body)
        res.end(rezultat);
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const dobaviJelaZaRestoran =  async (req, res) => {
    try{
        let restoranId = req.query.restoranId;
        let jelaIds = await MeniDataAccess.dobaviJelaZaRestoran(restoranId);
        let jela =  [];
        jelaIds.forEach(element => {
            console.log(element);
        });

        for (const j of jelaIds) {
            let jelo = await JeloDataAccess.dohvatiJelo(j);
            jela.push(jelo);
        }

        res.end(JSON.stringify(jela));
    }
    catch (error){
        res.statusCode = 500;
        res.end();
        throw error;
    }   
}

const obrisiJelo =async (req, res) => {
    try {
        let jeloId= req.params.jeloId
        await JeloDataAccess.obrisiJelo(jeloId);
        res.end();
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const JeloController = {
    dobaviJela,
    dodajJelo,
    dobaviJelaZaRestoran,
    obrisiJelo
}

export default JeloController