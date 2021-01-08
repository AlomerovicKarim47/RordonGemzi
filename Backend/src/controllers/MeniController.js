import MeniDataAccess from '../data/MeniDataAccess.js'



const obrisiJeloIzRestorana = async (req, res) => {
    try {
        let restoranId = req.params.restoranId;
        let jeloId = req.params.jeloId;

        await MeniDataAccess.obrisiJeloIzRestorana(restoranId, jeloId);
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const dodajJeloZaRestoran = async (req, res) => {
    try {
        let restoranId = req.params.restoranId;
        let jeloId = req.params.jeloId;
        let meni = {
            restoranId: restoranId,
            jeloId: jeloId
        }
        await MeniDataAccess.dodajMeni(meni);
        res.end();
        
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const MeniController = {
    obrisiJeloIzRestorana,
    dodajJeloZaRestoran
}

export default MeniController