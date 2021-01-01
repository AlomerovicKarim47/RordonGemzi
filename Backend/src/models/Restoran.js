import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Restoran = sequelize.define('Restoran', {
        naziv:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        adresa:{
            type: Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        brojMjesta:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        brojDostupnihMjesta:{
            type:Sequelize.INTEGER,
            unique:false,
            allowNull:false
        }
    })
    return Restoran
}