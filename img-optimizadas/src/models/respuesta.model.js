    const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  idPeticion: { type: mongoose.Schema.Types.ObjectId, required: true },
  respuesta: { type: mongoose.Schema.Types.Mixed, required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

module.exports = (db) => db.model('Respuesta', RespuestaSchema);
