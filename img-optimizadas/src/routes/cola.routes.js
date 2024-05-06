
const express = require('express');
const colaController = require('../controllers/cola.controller');
const api = express.Router();

api.get('/ObtenerEstado',colaController.obtenerEstados);
api.get('/ObtenerCola',colaController.obtenerCola);

module.exports = api; 