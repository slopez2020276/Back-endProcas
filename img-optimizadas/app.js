const express = require("express");
const cors = require("cors");
const app = express();

// IMPORTACION RUTAS
const usuarioRoutes = require("./src/routes/users.routes");
const imgsROutes = require("./src/routes/img.routes")
const mainPage = require("./src/routes/main.routes")


// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use("/api", usuarioRoutes,imgsROutes,mainPage);


module.exports = app;

