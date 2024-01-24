const express = require('express');
const NoticiasController = require('../controllers/noticias.controller');
const md_auteticacion = require('../middlewares/autenticacion')
const api = express.Router();
const multer = require('../../libs/multer');


api.get('/ObtnerNoticias',NoticiasController.obtenerNoticias);
api.get('/obtenernoticiasid/:idNoticia',NoticiasController.buscarNoticasxId)
api.get('/otenerNoticciasAll',NoticiasController.obtenerNoticiasPrincipalesYRestantes)
api.put('/editarNoticiasxId/:idNoticia',multer.single('imgPhat'),NoticiasController.editarNoticias)
api.delete('/eliminarNoticia/:idNoticia',NoticiasController.eliminarNoticias)
api.post('/agregarNOticias',multer.single('imgPhat'),NoticiasController.agregarNoticias)



module.exports = api;