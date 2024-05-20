const express = require('express');
const misioncontoller  = require('../controllers/misionValor.contoller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarMision', misioncontoller.obtenerMision);
api.put('/editarMision/:idMision',misioncontoller.editarMision)





module.exports = api;