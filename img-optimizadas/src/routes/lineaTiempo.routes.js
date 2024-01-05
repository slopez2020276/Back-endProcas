const express = require('express');
const LineaTiempoController = require('../controllers/lineaTiempo.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarLineaTiempo',LineaTiempoController.obtenerTiempo);
api.put('/editarLineaTiempo/:idLinea',md_auteticacion.Auth,LineaTiempoController.editarLineaTiempo)
api.delete('/eliminarLineaTiempo/:idLinea',md_auteticacion.Auth,LineaTiempoController.eliminarLineaTiempo)
api.get('/obtenerLineaXid/:idLinea',md_auteticacion.Auth, LineaTiempoController.obtenerLineaTiempoxId)
api.post('/agregarEventoLineadeTiempo',md_auteticacion.Auth,LineaTiempoController.agregarLineaTiempo)



module.exports = api;