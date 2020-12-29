import Sequelize from 'sequelize'

export default function (sequelize, DataTypes){
    const Korisnik = sequelize.define('Korisnik', {
        ime:{
            type: Sequelize.STRING,
            unique:false
        },
        prezime:{
            type: Sequelize.STRING,
            unique:false
        },
        prezime:{
            type: Sequelize.STRING,
            unique:true
        },
        datumRodjenja:{
            type:Sequelize.STRING,
            unique:false
        },
        username:{
            type:Sequelize.STRING,
            unique:true
        },
        password:{
            type: Sequelize.STRING,
            unique:false
        }
    })
    return Korisnik
}