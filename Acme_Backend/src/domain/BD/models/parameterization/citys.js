const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class citys extends Sequelize.Model { }
citys.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "citys",
        timestamps: false
    }
);

module.exports = citys;