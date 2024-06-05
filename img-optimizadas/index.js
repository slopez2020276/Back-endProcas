const express = require('express');
const app = express();
const classifyAndSavePeticiones = require('./src/controllers/clasificarPeticiones.controller');
const estadosController = require('./src/controllers/estados.controller');
const { db1, db2 } = require('./database'); // Importar las conexiones de la base de datos

const PORT = process.env.PORT || 3009;
const IP = '0.0.0.0'; // Escucha en todas las interfaces de red

// Escuchar los eventos de conexión
db1.on('connected', () => {
  db2.on('connected', () => {
    console.log('Conexiones a bases de datos establecidas. Levantando el servidor...');

    // Ejecutar la clasificación cada 5 minutos

    app.listen(PORT, IP, () => {
      console.log('El servidor está levantado en el puerto ' + PORT);
    });
  });
});

// Endpoint para clasificar peticiones manualmente
app.get('/clasificar-peticiones', async (req, res) => {
  try {
    await classifyAndSavePeticiones();
    res.status(200).send('Peticiones clasificadas y guardadas correctamente.');
  } catch (error) {
    res.status(500).send('Error al clasificar y guardar peticiones.');
  }
});
