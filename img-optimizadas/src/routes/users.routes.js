const express = require('express');
const controladorUsuario = require('../controllers/users.controller');
const md_auteticacion = require("../middlewares/autenticacion")

const api = express.Router();

api.post('/registrarUsuario', controladorUsuario.RegistrarUsuario);
api.put('/editarUsuario/:idEmpresa' ,controladorUsuario.EditarUsuario);
api.get("/obtenerUsuarios",controladorUsuario.ObtenerUsuarios);
api.get("/obtenerUsuarioId/:idUsuario",controladorUsuario.ObtenerUsuarioId);
api.post('/registrarUsuario/',controladorUsuario.RegistrarUsuario)
api.put('/editarUsuario/:idEmpresa' ,controladorUsuario.EditarUsuario);



api.post('/login', controladorUsuario.Login);





module.exports = api;