const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const valoresSchema = Schema({
  Integridad: String,
  Pasion: String,
  Innovacion: String,
  Orientacion: String,

});

module.exports = mongoose.model("valores", valoresSchema);
