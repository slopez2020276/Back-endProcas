const express = require('express');
const controladorUsuario = require('../controllers/users.controller');
const md_auteticacion = require("../middlewares/autenticacion")

const api = express.Router();

api.post('/crearEmpleado', controladorUsuario.RegistrarEmpleado);

api.post('/registrarUsuario', controladorUsuario.RegistrarUsuario);
api.get("/obtenerUsuarios",controladorUsuario.ObtenerUsuarios);
api.get("/obtenerUsuarioId/:idUsuario",controladorUsuario.ObtenerUsuarioId);
api.post('/registrarUsuario/',controladorUsuario.RegistrarUsuario)
api.put('/editarUsuario/:idUsers' ,controladorUsuario.editUser);
api.post('/CrearAgenteMarketing',controladorUsuario.CrearAgenteMarketing);


api.post('/login', controladorUsuario.Login);

api.post('/loginnn', controladorUsuario.login2 );



module.exports = api;