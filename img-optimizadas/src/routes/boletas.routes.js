// Crear una nueva boleta
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Boleta = require('../models/bolet.model');
const controllerBoleta = require('../controllers/bolet.controller')
const md_auteticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/boletas', async (req, res) => {
    try {
      const boleta = new Boleta(req.body);
      await boleta.save();
      res.status(201).send(boleta);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Obtener todas las boletas
  api.get('/boletas', async (req, res) => {
    try {
      const boletas = await Boleta.find();
      res.send(boletas);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Obtener una boleta por ID
  api.get('/boletas/:id', async (req, res) => {
    try {
      const boleta = await Boleta.findById(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
      res.send(boleta);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Actualizar una boleta por ID
  api.patch('/boletas/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fecha', 'puesto', 'nombre', 'dpi', 'comprobanteNo', 'ingreso', 'egreso'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Actualización no permitida' });
    }
  
    try {
      const boleta = await Boleta.findById(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
  
      updates.forEach(update => boleta[update] = req.body[update]);
      await boleta.save();
  
      res.send(boleta);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Eliminar una boleta por ID
  api.delete('/boletas/:id', async (req, res) => {
    try {
      const boleta = await Boleta.findByIdAndDelete(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
      res.send(boleta);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  api.post('/crearSolicitudBoleta',md_auteticacion.Auth,controllerBoleta.crearSolicitudBoleta )

  module.exports = api;