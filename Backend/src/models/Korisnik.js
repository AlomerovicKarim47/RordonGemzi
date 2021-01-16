import Sequelize from 'sequelize'

export default function (sequelize, DataTypes) {
    const Korisnik = sequelize.define('Korisnik', {
        ime: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        prezime: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        userSecret: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            unique: false,
            allowNull: false
        }
    })
    return Korisnik
}
