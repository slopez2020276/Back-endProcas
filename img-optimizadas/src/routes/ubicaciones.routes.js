const express = require('express');
const ControllerUbicaion = require('../controllers/ubicaciones.contoller');
const md_auteticacion = require("../middlewares/autenticacion")
const multer = require('../../libs/multer');
const api = express.Router();

api.get("/obtenerUbicaciones",ControllerUbicaion.obtnerUbiAll);
api.get("/obtenerMeatouse",ControllerUbicaion.ObtnerMeatHose);
api.get("/obtenerProcasa",ControllerUbicaion.obtenerUbicacionProcas);
api.get("/obtenerUbiccacionxID/:idUbicacion",ControllerUbicaion.ObtnerUbicacionxID)
api.post("/crearUbicacion",multer.single('imgPath'),ControllerUbicaion.agregarUbicacion);
api.delete("/eliminarUbicacion/:idUbicacion",ControllerUbicaion.eliminarUbi);
api.put("/editarUbicacion/:idUbicacion",multer.single('imgPath'),ControllerUbicaion.editarUbicaciones);
api.get('/obtnerUbiAllForUnete',ControllerUbicaion.obtnerUbiAllForUnete);
api.get('/obtenerUbicacionesProcasa',ControllerUbicaion.obtenerUbicacionesProcasa);
api.get('/obtenerProcasacdd',ControllerUbicaion.obtenerUbicacionesProcasacdd);
api.get('/obtnerMeathouseGrabandgo',ControllerUbicaion.obtenerUbicacionesmtgr);
api.get('/obtenerMeathouseCarniceria',ControllerUbicaion.obtenerUbicacionesmtCarniceria);
api.get('/obtenerEconocarnes',ControllerUbicaion.obtenerUbicacionesecono);

module.exports = api;