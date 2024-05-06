

const express = require('express');
const historriaController = require('../controllers/estados.controller');
const api = express.Router();

api.get('/copiarBasesDatos',historriaController.copiarBaseDatos);
api.get('/exportarDatos',historriaController.copiarBaseDatosJson);

module.exports = api; 