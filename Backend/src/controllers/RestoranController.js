import RestoranDataAccess from '../data/RestoranDataAccess'

const dobaviRestorane = async (req, res, next) => {
    try {
        let restorani = await RestoranDataAccess.dobaviRestorane()
        res.end(JSON.stringify(restorani))
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const obrisiRestoran = async (req, res, next) => {
    try {
        let restoranId= req.params.restoranId
        await RestoranDataAccess.obrisiRestoran({restoranId})
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const dodajRestoran = async (req, res, next) => {
    try {
        await RestoranDataAccess.dodajRestoran(req.body)
        res.end()
    } catch (error) {
        res.statusCode = 500
        res.end()
        throw error
    }
}

const RestoranController = {
    dobaviRestorane,
    obrisiRestoran,
    dodajRestoran
}

export default RestoranController