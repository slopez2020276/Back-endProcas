const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// CABECERAS
app.use(cors());
app.use
// CARGA DE RUTAS localhost:3000/api/productos
app.use("/api", usuarioRoutes,imgsROutes,mainPage, lineaTiempo,historia,mision,noticas,valores,subs,ubicaciones);


module.exports = app;

