const magic = require('../../domain/util/magic')
const enum_ = require('../../domain/util/enum')
const ormUser = require('../../domain/ORM/orm-user');
const Cryptr = require('cryptr');
const cryptr = new Cryptr("1234");
const auth = require('../../infrastructure/middleware/jwtAuth')


exports.signin = async (req, res) => {
    console.log('api login')
    let status = '', Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { username, password } = req.body
        console.log(username + password)
        if (username && password) {
            var respOrm = await ormUser.Login(username, password);
            console.log(  respOrm.token)
            if (respOrm==undefined) {
               status = 'Failure', Code = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            } else if(respOrm.status==200) {
                status = respOrm.status , message = 'User loged', statusCode = enum_.CODE_OK;
            }
            else if(respOrm.status=="BL2026"){
                status = 'BL2026', errorCode = enum_.PASSWORD_ERROR, message = respOrm.message, statusCode = enum_.CODE_BAD_REQUEST;  
            }
            else if(respOrm.status=="BL2022"){
                status = 'BL2022', errorCode = enum_.PASSWORD_ERROR, message = respOrm.message, statusCode = enum_.CODE_BAD_REQUEST;  
            }
        } else {
            status = enum_.ERROR_REQUIRED_FIELD, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'todos los campos osn requeridos', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status, Code, message, respOrm)
        return res.status(statusCode).send(resp);
    } catch (err) {
       
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
    }
}



// recibimos del frontend la informciion basica de registro


exports.registrar_usuario = async (req, res) => {
    let status = '', Code = '', message = '', data = '', statusCode = 0, resp = {};
    
    try{
        const { signin, nombre, apellidos,img, tipo_usuario, telefono,id_tipoUser,tienda,id_tienda_pertenece,contraseña } = req.body
        
        if (signin != "" && signin != null && nombre!= null && nombre!= "" && contraseña!= null && contraseña != "" && tipo_usuario!= null && tipo_usuario!= ""&& telefono!= null && telefono!= "") {
            var respOr = await ormUser.Registrar_usuario(signin, nombre, apellidos,img, tipo_usuario, telefono,id_tipoUser, tienda,id_tienda_pertenece,contraseña);
            console.log('------------------' + respOr.token);
            if (respOr.err) {
                status = 'Failure', Code = respOr.err.code, message = respOr.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }
            else if(respOr.status==201) {
              status=enum_.CODE_CREATED , message = 'usuario registrado exitosamente', statusCode = enum_.CODE_OK;
            }
            else if(respOr.status=="BL2026"){
                status = 'BL2022', errorCode = enum_.PASSWORD_ERROR, message = respOrm.message, statusCode = enum_.CODE_BAD_REQUEST;     
            }
        } else {
            console.log(enum_.ERROR_REQUIRED_FIELD)
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'todos los campos son requeridos', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status, statusCode, message, respOr)
        return res.status(statusCode).send(resp);
    }catch(error){
        console.log("err = ", error);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', ''));
                 }
  
}


exports.consultar_trabajador=async(req,res)=>{

    let status = 'Success', Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
            var ORMproducto =await ormUser.consultar_trabajadores();
            
            if(ORMproducto.err)
            {
                status = 'Failure', Code = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else message='consulta exitosa', statusCode=enum_.CODE_OK
            
    
        resp =await magic.ResponseService(status,Code,message,ORMproducto)
        return res.status(statusCode).send(resp)
    }
catch(error){return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC,"error",''))}
}

exports.actualizar_trabajador=async(req,res)=>{
// variables de respuesta
    let status, Code = '', message = '', data = '', statusCode = 0, resp = {};
    try {
        const { signin, nombre, apellidos,img, tipo_usuario, telefono,id_tipoUser,tienda,id_tienda_pertenece} = req.body
        // ejecutamos consulta a l base de datos y gurdamos respuesta
            var ORMuser =await ormUser.actualizar_usuario(signin,nombre,apellidos,img,tipo_usuario, telefono,tienda,id_tipoUser,id_tienda_pertenece);
            
            if(ORMuser.err)
            {
                status = 'Failure', Code = ORMuser.err.code, message = ORMuser.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                status==200,message='usuario actualizado', statusCode=enum_.CODE_OK
        }
            
    // devuelve respuesta al cliente
        resp =await magic.ResponseService(status,Code,message,ORMuser)
        return res.status(statusCode).send(resp)
    }
catch(error){return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('fail', enum_.CRASH_LOGIC,"error",''))}
}
