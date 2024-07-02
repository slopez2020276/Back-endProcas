const express = require('express');
const SoliController = require('../controllers/SoliVacaciones.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();


api.post('/soliVacaciones',md_auteticacion.Auth,SoliController.crearSoliVacaciones)
api.get('/soliVacaciones',md_auteticacion.Auth,SoliController.obtenerSoliVacacionesxIdentidad)




module.exports = api;