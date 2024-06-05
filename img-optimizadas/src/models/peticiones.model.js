const mongoose = require('mongoose');

const PeticionClasificadaSchema = new mongoose.Schema({
  tipo: String,
  peticiones: [{
    metodo: String,
    ruta: String,
    fecha: Date,
    estado: String,
    respuesta: mongoose.Schema.Types.Mixed,
  }]
});

module.exports = (connection) => connection.model('PeticionClasificada', PeticionClasificadaSchema);
