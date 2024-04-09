const express = require('express');
const LineaTiempoController = require('../controllers/lineaTiempo.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();
const multer = require('../../libs/multer');

api.get('/mostrarLineaTiempo',LineaTiempoController.obtenerTiempo);
api.delete('/eliminarLineaTiempo/:idLinea',LineaTiempoController.eliminarLineaTiempo)
api.get('/obtenerLineaXid/:idAnio/:idLinea', LineaTiempoController.obtenerLineaTiempoxId)
api.post('/agregarEventoLineadeTiempo',multer.single('ImgPathLineaTiempo'),LineaTiempoController.agregarLineaTiempo)







api.post('/CrearAnio',LineaTiempoController.CrearAnio)
api.delete('/EliminarAnio/:idAnio',LineaTiempoController.EliminarAnio)
api.put('/ediatarAnio/:idAnio',LineaTiempoController.ediatarAnio)
api.put('/agregarEventoLineaTiempo/:idLinea',multer.single('ImgPathLineaTiempo'),LineaTiempoController.agregarEventoAlAnioPorId)
api.put('/editarEventoLineaTiempo/:idLinea/:eventoId',multer.single('ImgPathLineaTiempo'),LineaTiempoController.editarEvento)
api.delete('/eliminarEventoLineaTiempo/:idLinea/:eventoId',LineaTiempoController.eliminarEvento)
api.get('/obtenerEventoXid/:idLinea/:eventoId',LineaTiempoController.obtenerLineaTiempoxId)

module.exports = api;