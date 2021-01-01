import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Meni = sequelize.define('Meni', {
        restoranId:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        },
        jeloId:{
            type: Sequelize.INTEGER,
            unique:false,
            allowNull:false
        }
    })
    return Meni
}