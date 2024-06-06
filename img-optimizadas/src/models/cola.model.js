const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColaSchema = new Schema({
  tipo: String,
  peticiones: [
    {
      metodo: String,
      ruta: String,
      fecha: Date,
      estado: String,
      respuesta: Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model('Cola', ColaSchema);
