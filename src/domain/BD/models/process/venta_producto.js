const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class venta_producto extends Model { }
venta_producto.init(
    {
       cantidad: {
            type: DataTypes.BIGINT,
            allowNull: false,
           
            comment: 'cantidad productos'
        },
        precio_unitario:{
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'precio unitario'
        },
        total: {
            type: DataTypes.BIGINT,
            allowNull: false,
            comment: 'total '
        },
        
    },
    {
        sequelize,
        modelName: "venta_producto",
        timestamps: false
    }
);

module.exports = venta_producto;






