let database = null

class RestoranDataAccess{
    static setDatabase(db){
        database = db
    }

    static async prebrojiRestorane(){
        try {
            let restorani = await database.Restoran.findAndCountAll()
            return restorani.count
        } catch (error) {
            throw error
        }
    }

    static async dobaviRestorane(){
        try {
            let restoraniRez = await database.Restoran.findAll()
            let restorani = []
            restoraniRez.forEach(element => {
                restorani.push(element.dataValues)
            });
            return restorani
        } catch (error) {
            throw error
        }
    }

    static async obrisiRestoran({restoranId}){
        try {
            await database.Restoran.destroy({where:{id: restoranId}});
            await database.Rezervacija.destroy({where:{restoranId: restoranId}});
            return
        } catch (error) {
            throw error
        }
    }

    static async dodajRestoran(restoran){
        try {
            await database.Restoran.create(restoran)
            return
        } catch (error) {
            throw error
        }
    }
}
export default RestoranDataAccess