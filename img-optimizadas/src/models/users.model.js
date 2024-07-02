const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UsuarioSchema = Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
  puesto: String,
  dpi: String,
  ID_departamento: { type: Schema.Types.ObjectId, ref: 'Departametos'},
  puesto: String,
  username: String,
  diasDisponibles: Number,
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
