const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');
class punto_venta extends Model { }
punto_venta.init({
    
    ciudad: { type: DataTypes.STRING(), allowNull: false, comment: 'ciudad' },
    nombre: { type: DataTypes.STRING(), allowNull: false, comment: "title of post" },
    direccion: { type: DataTypes.STRING(), allowNull: false, comment: '' },
    telefono: { type: DataTypes.STRING(), allowNull: false, comment: "" },
   

}
    , {
        sequelize,
        modelName: "punto_venta",
        timestamps: true,
        freezeTableName: true,
        tableName: 'punto_venta',

    })

module.exports = punto_venta;


