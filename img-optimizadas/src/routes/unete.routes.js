const express = require('express');
const UneteContoller = require('../controllers/unete.controller');
const md_auteticacion = require('../middlewares/autenticacion');
const api = express.Router();


api.post('/crearEmpleo',UneteContoller.CrearEmpleo);
api.get('/obtenerEmpleo',UneteContoller.obtenerUnete);
api.put('/editarFunciones/:id',UneteContoller.editarFunciones);	
api.put('/agregarFuncionesAUnete/:id',UneteContoller.agregarFuncionesAUnete);
api.put('/editarPlaza',UneteContoller.editarUnete);

module.exports = api;

