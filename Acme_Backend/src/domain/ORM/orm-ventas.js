const enum_ = require('../util/enum')
const { Sequelize } = require('sequelize');
const { or } = Sequelize.Op;
const ventas = require('../BD/models/process/ventas');
const venta_producto = require('../BD/models/process/venta_producto');


exports.registrar_venta = async (obj) => {
    console.log(obj[0].total + '---' + obj[0].id_punto_venta + '---' + obj[0].id_autenticado)
    try {
        return await    ventas.create({
            total: obj[0].total,
            id_punto_venta: obj[0].id_punto_venta,
            id_autenticado: obj[0].id_autenticado,
        }).then(venta => {
            console.log(venta);
            if (venta) {
                obj.forEach(element => {
                    console.log(element);
                 venta_producto.create({
                        cantidad: element.cantidad,
                        precio_unitario: element.precio,
                        total: parseInt(element.precio) * element.cantidad,
                        id_venta: venta.id,
                        id_producto: parseInt(element.id_producto)
                    })
                });
            }
            return { "status": enum_.CODE_OK, "message": "venta registrada con exito", "data": '' }

        }).catch(error => {
            console.log('error al crear un registro de  venta');
            return error
        })
    } catch (error) {
        return error
    }
}



exports.consultar_ventas = async () => {
    try {

        return ventas.findAll({
        }).then(async ventashechas => {
            if (ventashechas) {
                //console.log(ventashechas)
               
                return { "status": enum_.CODE_OK, "message": "venta registrada con exito", "data": ventashechas }
            } else {
                return { "status": enum_.CODE_NOT_ACEPTABLE, "message": "venta registrada con exito", "data": '' }
            }
        })
    } catch (error) {
        console.log('error:' + error)
        return error
    }

}


exports.ventas_agrupadas = async () => {
    try {
        return await ventas.findAll({
            //  attributes: ["id_punto_venta"],
            //  group: "id_punto_venta",
            // order: ["id_punto_venta", "ASC"],

            order: [

                ['id_punto_venta', 'DESC'],]

        }).then(async ventas_agrupadas => {
            if (ventas_agrupadas) {
                return { "status": enum_.CODE_OK, "message": "venta registrada con exito", "data": ventas_agrupadas }
            }
            else{
                return { "status": enum_.CODE_NOT_ACEPTABLE, "message": "error al consultar las ventas", "data": '' }
            }
        }).catch(error => {
            return error
        })
    } catch (error) {
        console.log('error:' + error);
        return error
    }
}