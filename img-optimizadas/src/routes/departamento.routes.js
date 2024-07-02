const express = require('express');
const departamentosController = require('../controllers/departametos.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.get('/mostrarDepartamentos', departamentosController.obtenerDepartametos);
api.put('/editarDepartamento/:idDepartamento', departamentosController.actualizarDepartameto);
api.delete('/eliminarDepartamento/:idDepartamento', departamentosController.eliminarDepartameto);
api.post('/agregarDepartamento', departamentosController.crearDepartameto);
api.put('/editarJefeDepartamento/:idDepartamento', departamentosController.aregarJefe);
module.exports = api; 