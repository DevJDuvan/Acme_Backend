const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class user_passwords extends Model { }
user_passwords.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'id usuario'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Contraseña'
        },
        change: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Eliminado'
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: 'Eliminado'
        },
        attempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'Numero de intentos para que se bloquee el usuario'
        },
        date_system: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date(),
            comment: 'Fecha registra'
        }
    },
    {
        sequelize,
        modelName: "user_passwords",
        timestamps: false
    }
);

module.exports = user_passwords;

