const magic = require('../../domain/util/magic')
const enum_ = require('../../domain/util/enum')
const ormPRODUCTOS = require ('../../domain/ORM/ORM-productos')

exports.registrar_producto=async(req,res)=>{

    let status = '', Code = '', message = '', data = '', statusCode , resp = {};
    try {

        const {nombre_producto,img,talla,cantidad_disponible,precio_compra,precio_venta,id_categoria}=req.body
        if(nombre_producto!=null && nombre_producto!='' && talla!=null && talla!='' && cantidad_disponible!=null && cantidad_disponible!='' && precio_compra!=null && precio_compra!='' && precio_venta!=null && precio_venta!='' && id_categoria!=null && id_categoria!='')
        {
            //llamamos a sequelize para ejecutar la consullta sql para crear producto
            var ORMproducto =await ormPRODUCTOS.crear_producto(nombre_producto,img,talla,cantidad_disponible,precio_compra,precio_venta,id_categoria)
            console.log(ORMproducto);
            if(ORMproducto.err){
                status = 'Failure', Code =  ORMproducto.err.code, message =  ORMproducto.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else if( ORMproducto.status==200)
             {
              status=200,  message='producto creado', statusCode=enum_.CODE_OK
            }
            else if( ORMproducto.status==406){
                status = 406, message =  ORMproducto.message, statusCode = enum_.CODE_NOT_ACEPTABLE;    
            }
            
        }
        else {
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'se requieren todos los campos', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp =await magic.ResponseService(status,Code,message,ORMproducto)
        return res.status(statusCode).send(resp)
    }
catch(err){
   
    console.log("err = ", err);
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
}
}




exports.consultar_producto=async(req,res)=>{

    let status , Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
            var ORMproducto =await ormPRODUCTOS.consultar_productos();
            
            if(ORMproducto.err)
            {
           
                status = 'Failure', Code = ORMproducto.err.code, message = ORMproducto.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else if(ORMproducto.status==200)
             {
            status= 200, message='CONSULTA EXITOSA', statusCode=enum_.CODE_OK
            }
            else if(ORMproducto.status==406)
             {
               status=406, message='ERROR AL INTENTAR CONSULTAR LOS PRODUCTOS', statusCode=enum_.CODE_OK
            }
            
    
        resp =await magic.ResponseService(status,Code,message,ORMproducto)
        return res.status(statusCode).send(resp)
    }
catch(error){return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC,"error",''))}
}

exports.eliminar_producto=async(req,res)=>{

    let status , Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        // del cliente me llega un id
        const {id} = req.body
            var ORMproducto =await ormPRODUCTOS.eliminar_productos(id);
            
            if(ORMproducto.err)
            {
           
                status = 'Failure', Code = ORMproducto.err.code, message = ORMproducto.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else if(ORMproducto.status==200)
             {
            status= 200, message='producto eliminado con exito', statusCode=enum_.CODE_OK
            }
            else if(ORMproducto.status==406)
             {
               status=406, message='ERROR AL INTENTAR ELIMINAR EL PRODUCTO', statusCode=enum_.CODE_OK
            }
            
    // devuelvo repuesta
        resp =await magic.ResponseService(status,Code,message,ORMproducto)
        return res.status(statusCode).send(resp)
    }
catch(error){return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC,"error",''))}
}