import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Restoran = sequelize.define('Restoran', {
        naziv:{
            type: Sequelize.STRING,
            unique: false
        },
        adresa:{
            type: Sequelize.STRING,
            unique:false
        },
        brojMjesta:{
            type: Sequelize.INTEGER,
            unique:false
        },
        brojDostupnihMjesta:{
            type:Sequelize.INTEGER,
            unique:false
        }
    })
    return Restoran
}