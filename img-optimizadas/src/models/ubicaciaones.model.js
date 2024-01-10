const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ubicaciones = Schema({
  tipoTienda: String,
  nombreTienda: String,
  codenadasLng: Number,
  codenadaslat: Number,
  descripcion: String,
  imgPath:String,
});

module.exports = mongoose.model("Ubicaciones", Ubicaciones);
