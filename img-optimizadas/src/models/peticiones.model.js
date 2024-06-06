const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeticionPendienteSchema = new Schema({
  metodo: String,
  ruta: String,
  fecha: Date,
  estado: String,
  respuesta: Schema.Types.Mixed,
});

module.exports = mongoose.model('PeticionPendiente', PeticionPendienteSchema);
