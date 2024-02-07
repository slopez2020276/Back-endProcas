const express = require('express');
const ProductosController = require('../controllers/productros.controller');
const multer = require('../../libs/multer');



const api = express.Router();


api.post('/crearProducto',multer.single('imgPath'),ProductosController.CrearProductos);
api.post('/crearListaEnProducto/:idProducto',ProductosController.CrearListaEnProducto);


module.exports = api;



 