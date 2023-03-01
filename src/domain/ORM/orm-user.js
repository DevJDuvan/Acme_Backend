const User = require('../BD/models/process/users');
const { Sequelize } = require('sequelize');
const { or } = Sequelize.Op;
const enum_ = require('../util/enum');
const UserPasswords = require('../BD/models/process/user_passwords');
const Cryptr = require('cryptr');
const cryptr = new Cryptr("12233");
var jwt = require('jsonwebtoken');
const { update } = require('../BD/models/process/users');
exports.Login = async (username, password) => {
    console.log('peticon')
    try {
        return await User.findOne({
            where: {
                [or]: [
                    {
                        signin: username
                    },
                    {
                        nombre: username
                    }
                ]
            },
            include: {
                model: UserPasswords,
                as: "user_password",
                attributes: ['password', 'change', 'locked', 'attempts', 'id']
            },
            attributes: ['id', 'signin', 'nombre','apellido','img','telefono','tipo_usuario','id_tipoUser','tienda_pertenece','id_tienda_pertenece']
        }).then(r => {
            if (!r) {
                return { "status": enum_.ID_NOT_FOUND, "message": "usuario o contraseña incorrectos", "data": null };
              
            } else {
                // validamos que exista una contraseña
                let haveActivePassword = r?.user_password?.find(e => e.change == true) ? r?.user_password?.find(e => e.change == true) : false;
                if (!haveActivePassword) {
                    return { "status": "inconsistente1", "message": "usuario o contraseña incorrectos", "data": null };
                }
                // validamos que el numero de intentos no sea mayor a 5
                if (haveActivePassword?.attempts == 5) {
                    return { "status": "bloqueada", "message": "Se bloqueo su cuenta", "data": null };
                }
                // desencriptamos la contraseña que esta en la base de datos
                let pass = cryptr.decrypt(haveActivePassword.password);
                if (pass != password) {
                    let attempts = haveActivePassword?.attempts + 1;
                    UserPasswords.update({ attempts: attempts }, {
                        where: {
                            id: haveActivePassword?.id
                        }
                    });
                    if (attempts == 5) {
                        return { "status": "bloqueada", "message": "Se bloqueo su cuenta intenta recuperando la contraseña", "data": null };
                    } else {
                        return{ "status": enum_.PASSWORD_ERROR, "message": "usuario o contraseña incorrectos", "data": null }
                    }
                } else {
                    //en el primer parametro, ingresamos la información que queremos
                    //encriptar, en el segundo parametro la llave
                    UserPasswords.update({ attempts: 0 }, { where: { id: haveActivePassword?.id } });
                    let token = jwt.sign({ id: r.id, id_tipo_usuario: r.id_tipoUser  }, "12233");
                    return { "status":enum_.CODE_OK,'token': token,
                    "data": {"id_usuario": r.id,"correo": r.signin,"nombre_usuario": r.nombre,"apellido_usuario": r.apellido,"img":r.img,"telefono":r.telefono,"tipo_usuario":r.tipo_usuario,"id_tipo_usuario":r.id_tipoUser,"id_tienda":r.id_tienda_pertenece,"nombre_tienda":r.tienda_pertenece} }
                }
            }
        });
    } catch (err) {
        console.log(" err orm-user.GetById = ", err);
        return err
    }
}


//------------------------------------------------------------------------------------------
exports.Registrar_usuario = async (sig, nombr, apelli,img_usuario, tipo_usuari, telefon,id_tipoUser,tienda_pertenece,id_tienda_pertenece,contra) => {
   console.log(sig, nombr, apelli,img_usuario, tipo_usuari, telefon, contra,id_tienda_pertenece,id_tipoUser);
    try {
  return await User.create({
            signin: sig,
            nombre: nombr,
            apellido: apelli,
            img:img_usuario,
            tipo_usuario:tipo_usuari,
            telefono: telefon,
            tienda_pertenece:tienda_pertenece,
            id_tipoUser: id_tipoUser,
            id_tienda_pertenece:id_tienda_pertenece
        }).then( async account => {
                // insertamos la contraseña encriptada a la tabla user_password
                if (account) {

          return  await    UserPasswords.create({
                        id_user: account.id,
                        password: cryptr.encrypt(contra),
                        change: 1,
                        locked: 0,
                        attempts: 0,
                    }).then( pass => {
                        if (pass) {
                            let token = jwt.sign({ id: account.id, id_tipo_usuario: account.id_tipoUser }, "12233");

                            return { "status":enum_.CODE_CREATED,'token': token,
                            "data": {"id_usuario": account.id,"correo": account.signin,"nombre_usuario": account.nombre,"telefono": account.telefono,"apellido_usuario": account.apellido,"img":account.img,"tipo_usuario":account.tipo_usuario,"id_tipo_usuario":account.id_tipoUser,"id_tienda:":account.id_tienda_pertenece,"nombre_tienda":account.tienda_pertenece} }


                        }
                        else{
                            return{ "status": enum_.PASSWORD_ERROR, "message": "error al crear contraseña" , "data": null }
                    }
                    }).catch(error => {
                        console.log('error al crear contrase'+error);
                        return {err};
                    });

                }
            }).catch(err => {
                console.log('error al  crear usuario  =' + err)
                return err;
            });
    } catch (err) {
        console.log(" error al ejecutar consulta de registro de usuario = ", err);
        return err
                  }
}



exports.consultar_trabajadores = async () => {
    try {
      return await  User.findAll({
        }).then(trabajadores => {
            if (trabajadores) {
                return { "trabajadores": trabajadores }
            } 
        })


    } catch (error) {
        console.log('error:' + error)
        return error
    }

}






// metodo actualizar usuario
exports.actualizar_usuario = async (id,nombre,apellido,img,tipo_usuario,telefono,tienda_pertenece,id_tipoUser,id_tienda_pertenece)=>{
    try{
    return await User.update({
        
            nombre: nombre,
            apellido: apellido,
            img:img,
            tipo_usuario:tipo_usuario,
            telefono:telefono,
            tienda_pertenece:tienda_pertenece,
            id_tipoUser:id_tipoUser,
            id_tienda_pertenece:id_tienda_pertenece,
          },{
            where: {
                          id:id   
            }
        
           
           
        }).then(U  => {
if(U){
  console.log('usuario actualizado')
     return {"status":enum_.CODE_OK, "message":'usuario actualizado'}
}

    }).catch(err=>{console.log(err)})
}catch(error){
    console.log('error:' + error)
    return error
}

}



