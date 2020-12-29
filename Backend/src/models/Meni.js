import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Meni = sequelize.define('Meni', {
        restoranId:{
            type: Sequelize.INTEGER,
            unique:false
        },
        jeloId:{
            type: Sequelize.INTEGER,
            unique:false
        }
    })
    return Meni
}