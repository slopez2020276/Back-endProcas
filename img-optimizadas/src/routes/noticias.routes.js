const express = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();
const multer = require('../../libs/multer');


api.get('/ObtnerNoticias',NoticiasController.obtenerNoticias);
api.put('/editarNoticiasxId/:idNoticia',md_auteticacion.Auth,NoticiasController.editarNoticias)
api.delete('/eliminarNoticia/:idNoticia',md_auteticacion.Auth,NoticiasController.eliminarNoticias)
api.get('/obtenernoticiasid/:idNoticia',NoticiasController.buscarNoticasxId)
api.post('/agregarNOticias',multer.single('ImgPathLineaTiempo'),NoticiasController.agregarNoticias)



module.exports = api;