const { Sequelize } = require('sequelize');
const enum_  = require ('../util/enum')
const { database } = require('./config/config');


const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        port: 3306,
        dialect: "mysql"
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexion establecida.'))
    .catch(err => enum_.LogDanger("No hay ninguna base de datos vinculada"+err));
 


sequelize.sync({ force: false }).then(() => {
        console.log("Conecxion a la base de datos");
    }).catch(error => {
        console.log('Se produjo un error al conectar a la base de datos', error);
    })

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.users = require('./models/process/users');
    db.category = require('./models/parameterization/category');

module.exports = db;