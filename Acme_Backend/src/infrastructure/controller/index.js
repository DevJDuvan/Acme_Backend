'use strict';

const express = require('express'),
 magic = require('../../domain/util/magic'),
 users = require ('../../aplication/services/services-user');
 const productos=require ('../../aplication/services/services-productos')
 const ventas = require('../../aplication/services/services-ventas')
 const auth = require('../middleware/jwtAuth')
const router = express.Router()

    console.log('[[ USERS ]]');
magic.LogInfo('[GET] = /users/')
magic.LogInfo('[GET] = /users/:id')
magic.LogSuccess('[POST] = /users/')
magic.LogWarning('[PATCH] = /users/:id')
magic.LogDanger('[DELETE] = /users/:id')
// definiendo endpoints y sus respectivas funcionalidades
router.post('/login/', users.signin);
router.get('/consultar_trabajadores',users.consultar_trabajador);
router.post('/registrar_usuario',users.registrar_usuario);
router.post('/crear_producto',auth.verifyTokenUser,productos.registrar_producto);
router.get('/consultar_productos',productos.consultar_producto);
router.post('/registrar_venta',ventas.registrar_ventas);
router.get('/consultar_ventas',ventas.consultar_ventas);
router.get('/consultar_ventas_agrupadas', auth.verifyToken,ventas.ventas_agrupadas);
router.put('/actualizar_usuario/',auth.verifyTokenUser,users.actualizar_trabajador);
router.delete('/eliminar_producto/',auth.verifyTokenUser,productos.eliminar_producto);
/*router.get('/users/:id', users.GetById);
router.delete('/users/:id', users.DeleteById);
router.patch('/users/:id', users.UpdateById);*/
router.get('/', function (req, res) {
    res.send("ruta principal en funcionamiento");
});


module.exports = router;