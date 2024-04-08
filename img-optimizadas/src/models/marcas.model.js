const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marcas = Schema({
  imgPath: String,
  idPublic: String,
  textMarca: String,

});

module.exports = mongoose.model("marcas", marcas);
