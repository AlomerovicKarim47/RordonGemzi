import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Rezervacija = sequelize.define('Rezervacija', {
        restoranId:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        brojOsoba:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        datum:{
            type: Sequelize.STRING,
            unique: false,
            allowNull:false
        },
        vrijeme:{
            type:Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        userId:{
            type: Sequelize.INTEGER,
            unique: false,
            allowNull: false
        }
    })
    return Rezervacija
}