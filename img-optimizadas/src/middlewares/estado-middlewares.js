const express = require('express');
const mongoose = require('mongoose');
const Estados = require('../models/estados.model');
const Cola = require('../models/cola.model');
const mongoose2 = require('mongoose');


exports.VerPeticion = async function(req, res, next) {
  if (req.originalUrl === '/api/login') {
    return next();
  }

  if (['PUT', 'POST', 'DELETE'].includes(req.method)) {
    try {
      await Estados.updateOne({}, { estado: 'disponible' }, { new: true, upsert: true });
      console.log('Estado actualizado correctamente');
    } catch (err) {
      console.log('Error al actualizar estado:', err);
    }

    const nuevaPeticion = {
      metodo: req.method,
      ruta: req.originalUrl,
      fecha: new Date(),
      estado: 'pendiente',
      token: req.headers.authorization
    };

    const originalSend = res.send;
    res.send = function (body) {
      res.locals.responseBody = body;
      originalSend.apply(res, arguments);
    };

    res.on('finish', async function() {
      let respuesta = res.locals.responseBody;
      if (typeof respuesta === 'string') {
        try {
          respuesta = JSON.parse(respuesta);
        } catch (error) {
          // Mantener como cadena de texto
        }
      }
      nuevaPeticion.respuesta = respuesta;
      try {
        await Cola.findOneAndUpdate({}, { $push: { cola: nuevaPeticion } }, { upsert: true });
        console.log('Petición guardada en la cola');
      } catch (error) {
        console.error('Error al guardar la petición en la cola:', error);
      }
    });
  }
  next();
};
const Estado2 = require('../models/estados.model');
const { es } = require('date-fns/locale');

exports.EjecutarCola = function () {
    // Configurar la conexión a la segunda base de datos
    mongoose2.connect('mongodb://localhost:27017/segundaBaseDatos', { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Obtener la cola de la segunda base de datos
    Estado2.findOne({}, (err, estado) => {
        if (err) {
            console.error('Error al obtener la cola:', err);
            return;
        }

        if (!estado || !estado.cola || estado.cola.length === 0) {
            console.log('No hay funciones en la cola para ejecutar');
            return;
        }

        // Iterar sobre cada elemento de la cola
        estado.cola.forEach(peticion => {
            // Aquí ejecutas la función correspondiente según el contenido de la peticion
            
            // Por ejemplo, si peticion.metodo es 'POST', ejecutar la función correspondiente al método POST
            console.log('Ejecutando función de la cola en la segunda base de datos:', peticion);
        });

        // Una vez que se han ejecutado todas las funciones de la cola, vaciamos la cola
        estado.cola = [];

        // Guardar el estado actualizado en la segunda base de datos
        estado.save()
            .then(() => {
                console.log('Cola ejecutada y vaciada correctamente en la segunda base de datos');
                // Cerrar la conexión a la segunda base de datos después de guardar el estado actualizado
                mongoose2.connection.close();
            })
            .catch(error => {
                console.error('Error al guardar el estado actualizado en la segunda base de datos:', error);
                // Cerrar la conexión a la segunda base de datos en caso de error
                mongoose2.connection.close();
            });
    });
};

