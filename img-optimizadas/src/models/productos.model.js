const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productosSchema = new Schema({
  imgPath: String,
  nombre: String,
  Listas: String
});

module.exports = mongoose.model("productos", productosSchema);