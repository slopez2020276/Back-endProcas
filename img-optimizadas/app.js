const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path')
const app = express();

// IMPORTACION RUTAS
const usuarioRoutes = require("./src/routes/users.routes");
const imgsROutes = require("./src/routes/img.routes")
const mainPage = require("./src/routes/main.routes")
const lineaTiempo = require("./src/routes/lineaTiempo.routes")
const historia = require("./src/routes/historia.routes")
const mision = require("./src/routes/mision.routes")
const noticas = require('./src/routes/noticias.routes')
const valores = require('./src/routes/volores.routes')
const subs = require('./src/routes/susbribe.routes')
const ubicaciones = require('./src/routes/ubicaciones.routes')
const producto = require('./src/routes/productos.routes')
const unete = require('./src/routes/unete.routes')
const cloud = require('./src/routes/cloudinary.routes')

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use("/api", usuarioRoutes,imgsROutes,mainPage, unete,producto ,lineaTiempo,historia,mision,noticas,valores,subs,ubicaciones,cloud);

app.use('/uploads',express.static(path.resolve('uploads')));
app.use('/imgsDefult',express.static(path.resolve('imgsDefult')));
app.use('/optimize',express.static(path.resolve('optimize')));



module.exports = app;

