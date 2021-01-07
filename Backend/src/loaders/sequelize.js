import Sequelize from 'sequelize'
import mysql from 'mysql2/promise'
import Korisnik from '../models/Korisnik'
import Rezervacija from '../models/Rezervacija'
import Restoran from '../models/Restoran'
import Jelo from '../models/Jelo'
import Meni from '../models/Meni'

const database = {}

const loadSequelize = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root'
        })
        await connection.query('CREATE DATABASE IF NOT EXISTS rordongemzi')
        console.log("Created the databse.")
        const sequelize = new Sequelize("mysql://root:root@localhost:3306/rordongemzi", { logging: false })

        database.Sequelize = Sequelize
        database.sequelize = sequelize

        database.Korisnik = Korisnik(sequelize)
        database.Rezervacija = Rezervacija(sequelize)
        database.Restoran = Restoran(sequelize)
        database.Jelo = Jelo(sequelize)
        database.Meni = Meni(sequelize)

        await sequelize.authenticate()
        console.log("Connected to the database.")

        await database.sequelize.sync()
        console.log("Tables created.")
    }
    catch (error) {
        console.log("Unable to connect to the database.", error)
        throw (error)
    }
    return database
}

export default loadSequelize
