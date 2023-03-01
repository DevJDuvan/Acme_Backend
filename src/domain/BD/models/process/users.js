
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class users extends Model { }
users.init(
    {
        signin: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Metodo de registro'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'Nombre de usuario'
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'tipo de usuario'
        },
        img:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'imagen usuario'
        },
        tipo_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'tipo de usuario'
        },
        telefono: {
            type:DataTypes.STRING(),
            allowNull: false,
            comment: 'telefono'
        },
        tienda_pertenece:{
            type:DataTypes.STRING(),
            allowNull: false,
            comment: 'tienda que pertenece usuario'  
        },
        remove: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Eliminado'
        },
        date_system: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date(),
            comment: 'Fecha registra'
        }
    },
    {
        sequelize,
        modelName: "users",
        timestamps: false
    }
  
);

module.exports = users;


