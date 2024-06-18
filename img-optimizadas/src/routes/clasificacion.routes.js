const express = require('express');
const clasificacion = require('../controllers/clasificarPeticiones.controller');

const app = express();



app.get('/clasificar-peticiones', async (req, res) => {
  try {
    await clasificacion.classifyAndSavePeticiones();
    res.status(200).send('Peticiones clasificadas y guardadas correctamente.');
  } catch (error) {
    res.status(500).send('Error al clasificar y guardar peticiones.');
  }
});

// Ejecutar la clasificación cada 5 minutos

module.exports = app;
