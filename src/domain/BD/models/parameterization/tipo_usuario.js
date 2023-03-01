
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class tipo_usuario extends Sequelize.Model { }
tipo_usuario.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "tipo_usuario",
        timestamps: false
    }
);

module.exports =  tipo_usuario;

