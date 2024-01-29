const express = require('express');
const controladorUsuario = require('../controllers/ubicaciones.contoller');
const md_auteticacion = require("../middlewares/autenticacion")

const api = express.Router();

api.get("/obtenerUbicaciones",controladorUsuario.obtnerUbiAll);
api.post("/crearUbicacion",md_auteticacion.Auth,controladorUsuario.agregarUbicacion);

module.exports = api;