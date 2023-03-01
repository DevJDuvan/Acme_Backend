'use strict';
//importamos las librerias de express
const express = require('express'),
    swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
   

const cors = require('cors');

const{ json, urlencoded } = require('body-parser');
// iniciamos las relaciones entre modelos
const aso = require('../domain/BD/config/asociations');


//inicializamos el Server
const http = require('http');
const { Module } = require('module');
const app = express();
const Server = http.Server(app);
//const server = Server(app);
const io = require('socket.io')(Server);
io.on('connection', function (socket) {
    socket.on('send-notification', function (data) {
        socket.broadcast.emit('event-notification', data)
    })
})
require('dotenv').config()
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "acme Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8000/api",
            }
        ],
    },
    apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);
/*app.use(
    "/api-docs",
    serve,
    setup(specs)
);*/

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({origin: '*',
methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
require('../aplication/repositories')(app);

module.exports = app;