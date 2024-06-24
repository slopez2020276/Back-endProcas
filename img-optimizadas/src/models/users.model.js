const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UsuarioSchema = Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
  puesto: String,
  dpi: String,
  departamento: String,
  puesto: String,
  cuenta: String,
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
