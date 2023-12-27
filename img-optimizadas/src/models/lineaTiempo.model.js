const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineaTiempo = Schema({
  titleLineaTiempo: String,
  ImgPathLineaTiempo: String,
  descriptionLineaTiempo: String,
});

module.exports = mongoose.model("lineaTiempo", lineaTiempo);
