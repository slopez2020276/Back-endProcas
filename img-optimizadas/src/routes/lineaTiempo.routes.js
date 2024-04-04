const express = require('express');
const LineaTiempoController = require('../controllers/lineaTiempo.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();
const multer = require('../../libs/multer');

api.get('/mostrarLineaTiempo',LineaTiempoController.obtenerTiempo);
api.delete('/eliminarLineaTiempo/:idLinea',LineaTiempoController.eliminarLineaTiempo)
api.get('/obtenerLineaXid/:idLinea',md_auteticacion.Auth, LineaTiempoController.obtenerLineaTiempoxId)
api.post('/agregarEventoLineadeTiempo',multer.single('ImgPathLineaTiempo'),LineaTiempoController.agregarLineaTiempo)







api.post('/CrearAnio',LineaTiempoController.CrearAnio)
api.put('/agregarEventoLineaTiempo/:idLinea',multer.single('ImgPathLineaTiempo'),LineaTiempoController.agregarEventoAlAnioPorId)
api.put('/editarEventoLineaTiempo/:idLinea/:eventoId',multer.single('ImgPathLineaTiempo'),LineaTiempoController.editarEvento)
api.delete('/eliminarEventoLineaTiempo/:idLinea/:eventoId',LineaTiempoController.eliminarEvento)

module.exports = api;