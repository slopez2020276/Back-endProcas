const express = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarLineaTiempo',NoticiasController.obtenerTiempo);
api.put('/editarLineaTiempo/:idLinea',md_auteticacion.Auth,NoticiasController.editarLineaTiempo)
api.delete('/eliminarLineaTiempo/:idLinea',md_auteticacion.Auth,NoticiasController.eliminarLineaTiempo)
api.get('obtener')




module.exports = api;