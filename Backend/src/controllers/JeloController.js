import JeloDataAccess from '../data/JeloDataAccess'
import MeniDataAccess from '../data/MeniDataAccess'


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

const JeloController = {
    dobaviJela,
    dodajJelo,
    dobaviJelaZaRestoran
}

export default JeloController