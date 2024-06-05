const mongoose = require('mongoose');

const PeticionPendienteSchema = new mongoose.Schema({
  metodo: String,
  ruta: String,
  fecha: Date,
  estado: String,
  respuesta: mongoose.Schema.Types.Mixed,
});

module.exports = (connection) => connection.model('PeticionPendiente', PeticionPendienteSchema);
