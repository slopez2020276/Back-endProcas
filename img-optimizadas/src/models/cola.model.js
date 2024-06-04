const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeticionSchema = new Schema({
  metodo: String,
  ruta: String,
  fecha: Date,
  estado: String,
  respuesta: Schema.Types.Mixed
});

const ColaSchema = new Schema({
  cola: [PeticionSchema]
});

module.exports = mongoose.model('Cola', ColaSchema);
