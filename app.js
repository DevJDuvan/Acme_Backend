const app = require('./src/server');

//agregamos los argumentos al metodo listen de express
app.listen(3001, '0.0.0.0', () => {
    console.log(`Servidor online en el puerto: ${process.env.PORT}`)
    //console.log(`Servidor online en el puerto: ${process.env.PORT}`);
    console.log(`Servidor online en el host: ${process.env.HOST}`);
});

app.on('error', err => {
    console.error(err)

})
