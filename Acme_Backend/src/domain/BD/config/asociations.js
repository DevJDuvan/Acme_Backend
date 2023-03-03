// parameterization
const category = require('../models/parameterization/category');
const city = require('../models/parameterization/citys');

// process
const User = require('../models/process/users');
const ventas = require('../models/process/ventas');
const UserPassword = require('../models/process/user_passwords');
const prodctos = require('../models/process/productos');
const punto_venta = require('../models/process/punto_venta');
const venta_producto = require('../models/process/venta_producto');
const tipo_usuario = require('../models/parameterization/tipo_usuario');


// relacion 1 a muchos  usuario tiene muchas categorias  // categoria tiene muchos prodctos

category.hasMany(prodctos, { as: "category-user-category", constraints: false, foreignKey: "id" });
prodctos.belongsTo(category, { as: "category-userct", foreignKey: "id_category" });

// Relacion usuario->contraseña
User.hasMany(UserPassword, { as: "user_password", constraints: false, foreignKey: "id_user" });
UserPassword.belongsTo(User, { as: "user_password", foreignKey: "id_user" });

// relacion 1  a muchos un venta puede tenes muchos productos

ventas.hasMany(venta_producto,{as:'user-user-category',foreignKey:'id_venta'});
venta_producto.belongsTo(ventas, { as: "venta-se-asocia-con-id-procuto", foreignKey: "id_venta" });
prodctos.hasMany(venta_producto, { as: "category-user-category", constraints: false, foreignKey: "id_producto" });
venta_producto.belongsTo(prodctos, { as: "category-userct", foreignKey: "id_producto" });
// usuario es un tipo de usuario
User.belongsTo(tipo_usuario,{as:'usuario_tipousuario',foreignKey:'id_tipoUser'})

User.belongsTo(punto_venta,{as:'usuario_puntoVenta',foreignKey:'id_tienda_pertenece'})



// una venta tiene un solo punto de venta
ventas.belongsTo(punto_venta,{as:"venta-punto de venta",foreignKey:'id_punto_venta'})
// una venta tiene un solo punto de venta
ventas.belongsTo(User,{as:'venta-usuario autenticado',foreignKey:'id_autenticado'})



punto_venta.belongsTo(city,{as:'punto_ciudad',foreignKey:'id_ciudad'})


