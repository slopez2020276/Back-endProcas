const express = require('express');
const LineaTiempoController = require('../controllers/lineaTiempo.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();
const multer = require('../../libs/multer');

api.get('/mostrarLineaTiempo',LineaTiempoController.obtenerTiempo);
api.put('/editarLineaTiempo/:idLinea',multer.single('ImgPathLineaTiempo'),LineaTiempoController.editarLineaTiempo)
api.delete('/eliminarLineaTiempo/:idLinea',LineaTiempoController.eliminarLineaTiempo)
api.get('/obtenerLineaXid/:idLinea',md_auteticacion.Auth, LineaTiempoController.obtenerLineaTiempoxId)
api.post('/agregarEventoLineadeTiempo',multer.single('ImgPathLineaTiempo'),LineaTiempoController.agregarLineaTiempo)



module.exports = api;