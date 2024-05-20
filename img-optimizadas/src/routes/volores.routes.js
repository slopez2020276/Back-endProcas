const express = require('express');
const misioncontoller  = require('../controllers/valores.contoller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarvalores', misioncontoller.obtenerValores);
api.put('/editarvalores/:idMision',misioncontoller.editarValores)





module.exports = api;