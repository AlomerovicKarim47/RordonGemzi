let database = null

class MeniDataAccess{
    static setDatabase(db){
        database = db
    }

    static async prebrojiMenije(){
        try {
            let meni = await database.Meni.findAndCountAll()
            return meni.count
        } catch (error) {
            throw error
        }
    }

    static async dobaviJelaZaRestoran(restoranID){
        try {
            let meniRez = await database.Meni.findAll({where:{restoranId: restoranID}})
            let jela = []
            meniRez.forEach(element => {
                jela.push(element.dataValues.jeloId);
            });
            return jela;
        } catch (error) {
            throw error
        }
    }
   

    static async dodajMeni(meni){
        try {            
            let imaMeni = await database.Meni.findOne({where:{restoranId: meni.restoranId, jeloId: meni.jeloId }});
            if(!imaMeni){
                await database.Meni.create(meni);
            }
            return
        } catch (error) {
            throw error
        }
    }

    static async obrisiJeloIzRestorana(restoranId, jeloId){
        try {
            await database.Meni.destroy({where:{restoranId: restoranId, jeloId: jeloId}})
            return
        } catch (error) {
            throw error
        }
    }
}
export default MeniDataAccess