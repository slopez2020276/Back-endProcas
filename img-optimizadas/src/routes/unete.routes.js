const express = require('express');
const UneteContoller = require('../controllers/unete.controller');
const md_auteticacion = require('../middlewares/autenticacion');
const api = express.Router();


api.post('/crearEmpleo',UneteContoller.CrearEmpleo);
api.get('/obtenerEmpleo',UneteContoller.obtenerUnete);


module.exports = api;

