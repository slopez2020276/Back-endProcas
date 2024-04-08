const express = require('express');
const marcaController = require('../controllers/marcas.controller');
const md_auteticacion = require('../middlewares/autenticacion');
const multer = require('../../libs/multer');
const api = express.Router();


api.get('/mostrarMarcas',marcaController.obtenerMarcas);
api.delete('/eliminarMarca/:id',marcaController.eliminarMarca)
api.get('/obtenerMarcaXid/:id', marcaController.obtenerMarcaPorId)
api.post('/agregarMarca',multer.single('imgPath'),marcaController.crearMarca)
api.put('/editarMarca/:idMarca',multer.single('imgPath'),marcaController.actualizarMarca)



module.exports = api; 