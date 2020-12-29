import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Rezervacija = sequelize.define('Rezervacija', {
        restoranId:{
            type: Sequelize.INTEGER,
            unique:false
        },
        brojOsoba:{
            type: Sequelize.INTEGER,
            unique:false
        },
        datum:{
            type: Sequelize.STRING,
            unique: false
        },
        vrijeme:{
            type:Sequelize.STRING,
            unique:false
        }
    })
    return Rezervacija
}