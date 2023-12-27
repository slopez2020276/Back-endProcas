const express = require('express');
const controllerMainPage = require('../controllers/mainPage.controller');

const api = express.Router();

api.get('/mostrarPaginaPrincipal', controllerMainPage.mostrarMainPage);





module.exports = api;