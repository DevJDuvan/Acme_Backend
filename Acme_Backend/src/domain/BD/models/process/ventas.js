const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');


class ventas extends Model { }
ventas.init(
    {
        data: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date(),
            comment: 'Fecha venta'
        },
        total: {
            type: DataTypes.STRING,
            comment: 'total de la venta'
        }   
    },
    {
        sequelize,
        modelName: "ventas",
        timestamps: false
    }
);

module.exports = ventas;