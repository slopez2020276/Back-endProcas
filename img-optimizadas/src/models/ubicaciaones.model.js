const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ubicaciones = Schema({
  tipoTienda: String,
  direccion: String,
  telefono: String,
  horario: String,
  nombreTienda: String,
  descripcion: String,
  imgPath:String,
  enlaceMaps:String,
  enlaceWaze:String,
  idPublic:String,
  whatsapp:String,
});

module.exports = mongoose.model("Ubicaciones", Ubicaciones);
