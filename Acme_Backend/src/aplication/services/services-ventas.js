const magic = require('../../domain/util/magic')
const enum_ = require('../../domain/util/enum')
const ormVentas = require('../../domain/ORM/orm-ventas')

exports.registrar_ventas = async (req, res) => {
    let status, Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { productos } = req.body
        console.log(productos[0].total)
        if (productos[0].total != null && productos[0].total != "") {
            var ORMventaRegistrada = await ormVentas.registrar_venta(productos);

            if (ORMventaRegistrada.err) {
                status = 'Failure', Code = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else {
                status = 200, message = 'venta realizada con exito', statusCode = enum_.CODE_OK
            }

        }
        else { status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'se requieren todos los campos', statusCode = enum_.CODE_BAD_REQUEST; }
        resp = await magic.ResponseService(status, Code, message, ORMventaRegistrada)
        return res.status(statusCode).send(resp)
    }
    catch (error) { return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC, "error", '')) }
}

exports.consultar_ventas = async (req, res) => {
    try {
        let status, Code = '', message = '', data = '', statusCode = 0, resp = {};
        var ormconsultarVenta = await ormVentas.consultar_ventas()
        if (ormconsultarVenta.err) {
            status = 'Failure', Code = ormconsultarVenta.err.code, message = ormconsultarVenta.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        } else if (ormconsultarVenta.status == 200) {
            status = 200, message = 'consulta de ventas exitosa', statusCode = enum_.CODE_OK
        }else if(ormconsultarVenta.status==406){
            status=406 ,message='error al consultar las ventas', statusCode=enum_.CODE_OK
           
                 }
        resp = await magic.ResponseService(status, Code, message, ormconsultarVenta)
        return res.status(statusCode).send(resp)
    }

    catch (error) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC, "error", ''))
    }

}



exports.ventas_agrupadas = async (req, res) => {
    try {
        let status, Code = '', message = '', data = '', statusCode = 0, resp = {};
        var ormconsultarVenta = await ormVentas.ventas_agrupadas()
        if (ormconsultarVenta.err) {
            status = 'Failure', Code = ormconsultarVenta.err.code, message = ormconsultarVenta.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        } else if (ormconsultarVenta.status == 200) {
            status = 200, message = 'consulta exitosa', statusCode = enum_.CODE_OK

        }
        resp = await magic.ResponseService(status, Code, message, ormconsultarVenta)
        return res.status(statusCode).send(resp)
    }

    catch (error) {
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC, "error", ''))
    }

}
