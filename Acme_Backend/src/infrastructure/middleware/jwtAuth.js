var jwt = require('jsonwebtoken');
const Users = require('../../domain/BD/models/process/users');


// verificamos la disponibilidad del token si existe damos acceso a los enpoints de los contrario negamos
module.exports.verifyTokenUser = (req, res, next) => {
  const token = req.headers['token'];
  // verifica si sexite un token
  if (token) {
    // verifica si el token es correcto
    jwt.verify(token, "12233", (err, decoded) => {
      if (err) {
        res.send({
          "status": 401,
          "Resp": {
            "code": "",
            "message": "token invalida",
            "data": {
              "status": 401,
              "message": "token invalida"
            }
          }
        });
        // verifica si el usuario es administrador o trabajador
      } else if (jwt.decode(token, "12233").id_tipo_usuario == 1) {
        req.decoded = decoded;
        next();
      } else {
        // si el usuario no es adminin no le damos permiso
        console.log('lllllllll' + jwt.decode(token, "12233").id_tipo_usuario);
        res.send({
          "status": 401,
          "Resp": {
            "code": "",
            "message": "usuario no autorizado para esta funcionalidad",
            "data": {
              "status": 401,
              "message": "usuario no autorizado para esta funcionalidad"
            }
          }
        });

      }
    });
  } else {
    res.send({
      "status": 401,
      "Resp": {
        "code": "",
        "message": "token no asignada",
        "data": {
          "status": 401,
          "message": "token no asignada"
        }
      }
    });
  }
};


module.exports.verifyToken = (req, res, next) => {
  const token = req.headers['token'];
  // verifica si sexite un token
  if (token) {
    // verifica si el token es correcto
    jwt.verify(token, "12233", (err, decoded) => {
      if (err) {
        res.send({
          "status": 401,
          "Resp": {
            "code": "",
            "message": "token invalida",
            "data": {
              "status": 401,
              "message": "token invalida"
            }
          }
        });
      } else {
        Users.findAll(
          { 
              
              where:{ 
                  id:jwt.decode(token, process.env.JWT_KEY).id 
              }
          }
      )
      .then(menu => {  
        req.decoded = decoded;
        next();
       })
      }
    })
  } else {
    res.send({
      "status": 401,
      "Resp": {
        "code": "",
        "message": "token no asignada",
        "data": {
          "status": 401,
          "message": "token no asignada"
        }
      }
    })
  }
}


