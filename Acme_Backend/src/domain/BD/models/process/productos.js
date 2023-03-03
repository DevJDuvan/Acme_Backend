const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class productos extends Sequelize.Model { }
productos.init(
    {
        nombre_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'Nombre de producto'
        },
        img_producto:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'imagen producto'
        },
        talla: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'talla producto'
        },
        cantidad_disponible: {
            type: DataTypes.BIGINT,
            allowNull: false,
            comment: 'cantidad disponoble'
        },
        precio_compra: { type: DataTypes.BIGINT, allowNull: false, comment: "" },
        precio_venta: { type: DataTypes.BIGINT, allowNull: false, comment: "" },
    },
    {
        sequelize,
        modelName: "productos",
        timestamps: false
    }
);

module.exports = productos;



