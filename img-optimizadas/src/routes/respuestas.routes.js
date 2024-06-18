const express = require('express');
const router = express.Router();
const { crearRespuesta, obtenerRespuestas } = require('../controllers/respuestas.controller');

// Ruta para crear una nueva respuesta
router.post('/respuestas', crearRespuesta);

// Ruta para obtener todas las respuestas
router.get('/respuestas', obtenerRespuestas);

module.exports = router;
