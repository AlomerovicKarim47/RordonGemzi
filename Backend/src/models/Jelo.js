import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Jelo = sequelize.define('Jelo',{
        naziv:{
            type: Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        opis:{
            type: Sequelize.STRING,
            unique:false,
            allowNull:false
        },
        cijena:{
            type: Sequelize.STRING,
            unique:false,
            allowNull:false
        }
    })
    return Jelo
}