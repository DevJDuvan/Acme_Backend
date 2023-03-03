const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connect');
const { Sequelize } = require('../../repository_mysql');

class category extends Sequelize.Model { }
category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        }
    },
    {
        sequelize,
        modelName: "category",
        timestamps: false
    }
);

module.exports = category;
