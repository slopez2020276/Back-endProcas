const express = require('express');
const subsContoller = require('../controllers/suscribe.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/ObtenerSubs',subsContoller.obtenerSubs);
api.delete('/eliminarSubs/:idSub',md_auteticacion.Auth,subsContoller.eliminarSub)
api.post('/agregarSubs',subsContoller.agregarSub)



module.exports = api;