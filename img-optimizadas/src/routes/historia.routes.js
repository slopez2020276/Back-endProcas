const express = require('express');
const historriaController = require('../controllers/historia.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarHistoria',historriaController.obtenerHistoria);
api.put('/editarHistoria/:idHistoria',md_auteticacion.Auth,historriaController.editarhistoria)
api.delete('/eliminarHistoria/:idHistoria',md_auteticacion.Auth,historriaController.eliminarhistoria)



module.exports = api;