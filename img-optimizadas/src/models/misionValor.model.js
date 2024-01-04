const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const misionValorSchema = Schema({
  textMision: String,
  textVIsion: String,

});

module.exports = mongoose.model("misionValor", misionValorSchema);
