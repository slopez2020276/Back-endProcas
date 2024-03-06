const express = require('express');
const ProductosController = require('../controllers/productros.controller');
const multer = require('../../libs/multer');



const api = express.Router();


api.post('/crearProducto',multer.single('imgPath'),ProductosController.CrearProductos);
api.post('/crearListaEnProducto/:idProducto',ProductosController.CrearListaEnProducto);
api.post('/crearProductoV2',multer.single('imgPath',ProductosController.CrearProductosv2));
api.post('/crearProductov2',multer.single('imgPath'),ProductosController.CrearProductosv2);
api.post('/agregarCategoria/:idProducto',ProductosController.agregarCategoria);
api.post('/agregarItemsACategoria/:idProducto/:nombreCategoria',ProductosController.agregarItemsACategoria);
api.put('/editarItemsACategoria/:idProducto/:nombreCategoria/:nombreItemExistente',ProductosController.editarItemEnCategoria);
api.put('/editarCategoria/:idProducto/:nombreCategoriaExistente',ProductosController.editarCategoria);
api.get('/ObtenerProductos',ProductosController.ObtenerProductos);
api.delete('/eliminarProducto/:idProducto',ProductosController.EliminarProductos);
api.delete('/eliminarCategoria/:idProducto/:nombreCategoria',ProductosController.EliminarCategoriaEnProducto);
api.delete('/eliminarProducto/:idProducto',ProductosController.EliminarProductos);
api.delete('/eliminarItemCategoria/:idProducto/:idCategoria/:idItem',ProductosController.EliminarItemEnCategoria);
api.put('/editarProducto/:idProducto',multer.single('imgPath'),ProductosController.editarProductos);
api.get('/obtenerProducto/:idProducto',ProductosController.ObtenerProductosxId);
api.get('/obtenerCategoriasxProducto/:idProducto',ProductosController.ObtenerCategoriasxID);
api.get('/obtenerItemsxCategoria/:idProducto/:idCategoria',ProductosController.ObtenerItemsxCategoria);
module.exports = api;



// Path: src/routes/susbribe.routes.js