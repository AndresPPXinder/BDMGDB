const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
require('./config/db');

// Configurar motor de vistas
app.set('view engine', 'ejs');


// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas
app.use('/', userRoutes);

// Puerto de la aplicación
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
