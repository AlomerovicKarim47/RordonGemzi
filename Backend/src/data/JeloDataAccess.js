let database = null

class JeloDataAccess{
    static setDatabase(db){
        database = db
    }

    static async prebrojiJela(){
        try {
            let jela = await database.Jelo.findAndCountAll();
            return jela.count;
        } catch (error) {
            throw error
        }
    }

    static async dobaviJela(){
        try {
            let jelaRez = await database.Jelo.findAll();           
            let jela = []
            jelaRez.forEach(element => {
                jela.push(element.dataValues);
            });
            return jela;

        } catch (error) {
            throw error;
        }
    }


    static async dodajJelo(jelo){
        try {
            await database.Jelo.create(jelo);
            return;                          
        } catch (error) {
            throw error
        }
    }

    static async dohvatiJelo(jeloId){
        try{
            let jelo = await database.Jelo.findOne({where:{id:jeloId}})
            if (jelo)
                return jelo.dataValues;
            else return null;
        }catch (error) {
            throw error
        }
    }

}
export default JeloDataAccess