const express = require('express');
const controladorUsuario = require('../controllers/users.controller');

const api = express.Router();

api.post('/registrarUsuario', controladorUsuario.RegistrarUsuario);
api.put('/editarUsuario/:idEmpresa' ,controladorUsuario.EditarUsuario);
api.get("/obtenerUsuarios",controladorUsuario.ObtenerUsuarios);
api.get("/obtenerUsuarioId/:idUsuario",controladorUsuario.ObtenerUsuarioId);
api.post('/login', controladorUsuario.Login);

api.put('/editarUsuario/:idEmpresa' ,controladorUsuario.EditarUsuario);




module.exports = api;