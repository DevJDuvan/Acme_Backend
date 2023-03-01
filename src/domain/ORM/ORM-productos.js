const { json } = require('body-parser');
const { Sequelize } = require('sequelize');
const { or } = Sequelize.Op;
const enum_ = require('../util/enum');
const productos = require('../../domain/BD/models/process/productos');

// metodo para crear i

exports.crear_producto = async (nombre_producto, img_producto, talla, cantidad_disponible, precio_compra, precio_venta, id_categoria) => {
    try {

        return await productos.create({
            nombre_producto: nombre_producto,
            img_producto: img_producto,
            talla: talla,
            cantidad_disponible: cantidad_disponible,
            precio_compra: precio_compra,
            precio_venta: precio_venta,
            id_category: id_categoria,

        }).then(product => {
            if (product) {
                return { "status": enum_.CODE_OK, "message": "producto registrado", "data": product }

            }
            else {
                return { "status": enum_.CODE_NOT_ACEPTABLE, "message": "error intentar registrar producto", "data": '' }
            }
        }).catch(err => { return err })
    }
    catch (error) {
        return error
    }

}

// metodo para consultar productos

exports.consultar_productos = async () => {
    try {
        return await productos.findAll({
        }).then(productos => {
            if (productos) {
                return { "status": enum_.CODE_OK, "message": "venta registrada con exito", "data": productos }
            } else { 
                return { "status": enum_.CODE_NOT_ACEPTABLE, "message": "error al consultar productos", "data": '' }
            }
        })


    } catch (error) {
        console.log('error:' + error)
        return error

    }

}



// metodo para consultar productos

exports.eliminar_productos = async (id) => {
    try {
        // modelo/tabla productos
        return await productos.destroy({
            where: {
                id:id   
  }
        }).then(productos => {
            if (productos) {
                return { "status": enum_.CODE_OK, "message": "producto eliminad ocn exito", "data":"" }
            } else { 
                return { "status": enum_.CODE_NOT_ACEPTABLE, "message": "error al consultar productos", "data": '' }
            }
        })


    } catch (error) {
        console.log('error:' + error)
        return error

    }

}