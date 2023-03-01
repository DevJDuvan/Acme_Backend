const { Sequelize } = require('sequelize');
const { database } = require('../config/config');

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
    .catch(err => console.error('No se pudo conectar a la:', err));


sequelize.sync({ force: false }).then(() => {
        console.log("Conecxion a la base de datos");
    }).catch(error => {
        console.log('Se produjo un erro', error);
    })
    
module.exports = sequelize;