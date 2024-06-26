const express = require('express');0
const UneteContoller = require('../controllers/unete.controller');
const api = express.Router();
const multer = require('../../libs/multer');


api.post('/crearEmpleo',multer.single('imgPath'),UneteContoller.CrearEmpleo);



api.get('/obtenerEmpleo',UneteContoller.obtenerUnete);
api.get('/obtenerFuncionesxid/:id',UneteContoller.obtenerFuncionesxid)
api.get('/obtenerPlazas',UneteContoller.obtenerPlazas);
api.get('/obtenerPlazasFiltradas',UneteContoller.obtenerPlazasFiltradas);
api.put('/editarFunciones/:id',UneteContoller.editarFunciones);	
api.put('/agregarFuncionesAUnete/:id',UneteContoller.agregarFuncionesAUnete);
api.put("/editarPlaza/:id",multer.single('imgPath'),UneteContoller.editarPlaza)
api.put('/editarPlazaV2/:id/:position', UneteContoller.editatFuncionesV2)
api.put('/eliminarFuncion/:id/:position',UneteContoller.eliminarFuncionV2)
api.put('/cambiarVisibilidad/:id',UneteContoller.editarVisibilidad);
api.delete('/eliminarPlaza/:id',UneteContoller.eiliminarPlaza);
api.delete('/eliminarPlaza/:id',UneteContoller.eiliminarPlaza);


api.get('/obtenerPlazaId/:id',UneteContoller.ObtenerPlazaxId);


module.exports = api;

