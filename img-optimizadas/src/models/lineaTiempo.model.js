const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineaTiempo = Schema({
  ImgPathLineaTiempo: String,
  titleLineaTiempo: String,
  subTitleLineaTiempo: String,
  descriptionLineaTiempo: String,
  fecha: Date,
});

module.exports = mongoose.model("lineaTiempo", lineaTiempo);
