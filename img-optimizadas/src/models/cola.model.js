const mongoose = require('mongoose');

const ColaSchema = new mongoose.Schema({
  cola: [{
    metodo: String,
    ruta: String,
    fecha: Date,
    estado: String,
    respuesta: mongoose.Schema.Types.Mixed,
  }]
});

module.exports = (connection) => connection.model('Cola', ColaSchema);
