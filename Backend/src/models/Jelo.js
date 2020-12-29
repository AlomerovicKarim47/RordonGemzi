import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Jelo = sequelize.define('Jelo',{
        naziv:{
            type: Sequelize.STRING,
            unique:false
        },
        opis:{
            type: Sequelize.STRING,
            unique:false
        },
        cijena:{
            type: Sequelize.STRING,
            unique:false
        }
    })
    return Jelo
}