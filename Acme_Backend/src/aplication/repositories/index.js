'use strict';

const apiController = require('../../infrastructure/controller/index');


const routers = (app) =>{
    // definir las versiones o la cantidad de apis que existan
    app.use('/api/v1',apiController);
  

    
};

module.exports = routers;