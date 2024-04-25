

const express = require('express');
const historriaController = require('../controllers/estados.controller');
const api = express.Router();

api.get('/copiarBasesDatos',historriaController.copiarBaseDatos);

module.exports = api; 