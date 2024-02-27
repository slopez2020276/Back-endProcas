const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineaTiempo = Schema({
  ImgPathLineaTiempo: String,
  titleLineaTiempo: String,
  subTitleLineaTiempo: String,
  descriptionLineaTiempo: String,
  mostrarPor:String,
  fecha: {
    type: Date,
    default: Date.now
  },
  idPublic:String
});

module.exports = mongoose.model("lineaTiempo", lineaTiempo);
