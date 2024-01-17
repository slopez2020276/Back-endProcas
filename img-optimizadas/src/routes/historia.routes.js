const express = require('express');
const historriaController = require('../controllers/historia.controller');
const md_auteticacion = require('../middlewares/autenticacion');
const multer = require('../../libs/multer');
const api = express.Router();


api.get('/mostrarHistoria',historriaController.obtenerHistoria);
api.put('/editarHistoria/:idHistoria',md_auteticacion.Auth,historriaController.editarhistoria)
api.delete('/eliminarHistoria/:idHistoria',md_auteticacion.Auth,historriaController.eliminarhistoria)
api.post('/agregarHistoria',multer.single('image') ,historriaController.createHistoria)


module.exports = api; 