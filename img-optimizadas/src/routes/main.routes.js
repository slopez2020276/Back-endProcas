const express = require('express');
const controllerMainPage = require('../controllers/mainPage.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();

api.get('/mostrarPaginaPrincipal', controllerMainPage.mostrarMainPage);
api.put('/editarMainPage/:idPage',md_auteticacion.Auth,controllerMainPage.editarPage)




module.exports = api;