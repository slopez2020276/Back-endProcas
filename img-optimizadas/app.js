const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const VerPeticion = require('./src/middlewares/estado-middlewares');

// IMPORTACIÓN DE RUTAS
const usuarioRoutes = require("./src/routes/users.routes");
const imgsRoutes = require("./src/routes/img.routes");
const mainPageRoutes = require("./src/routes/main.routes");
const lineaTiempoRoutes = require("./src/routes/lineaTiempo.routes");
const historiaRoutes = require("./src/routes/historia.routes");
const misionRoutes = require("./src/routes/mision.routes");
const noticiasRoutes = require('./src/routes/noticias.routes');
const valoresRoutes = require('./src/routes/volores.routes');
const subsRoutes = require('./src/routes/susbribe.routes');
const ubicacionesRoutes = require('./src/routes/ubicaciones.routes');
const productoRoutes = require('./src/routes/productos.routes');
const uneteRoutes = require('./src/routes/unete.routes');
const cloudRoutes = require('./src/routes/cloudinary.routes');
const marcasRoutes = require('./src/routes/marcas.routes');
const estadosRoutes = require('./src/routes/estados.routes');
const colaRoutes = require('./src/routes/cola.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// CARGA DE RUTAS
app.use("/api", usuarioRoutes, imgsRoutes, mainPageRoutes, misionRoutes,colaRoutes, uneteRoutes, productoRoutes, lineaTiempoRoutes, historiaRoutes, noticiasRoutes, valoresRoutes, subsRoutes, ubicacionesRoutes, cloudRoutes, marcasRoutes, estadosRoutes);

app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/imgsDefult', express.static(path.resolve('imgsDefult')));
app.use('/optimize', express.static(path.resolve('optimize')));

module.exports = app;
