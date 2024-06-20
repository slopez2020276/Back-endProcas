const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soliBoleta = new Schema({

  fecha: Date,
  accion: String,
  
});

module.exports = mongoose.model('Cola', ColaSchema);
