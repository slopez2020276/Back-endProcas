const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suscribeSchema = Schema({
  correo: String,
  nombre: String,
  apellido: String,
});

module.exports = mongoose.model("suscribe", suscribeSchema);
