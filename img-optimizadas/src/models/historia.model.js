const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historia = Schema({
  EncalceVideo: String,
  DescripcionHistoria: String,
  imgPathFondo:String,
  imgPathPrincipal:String,
  imgPathPrincipalLarge: String,
  imgPathPrincipalMedium: String,
  imgPathPrincipalSmall: String,
  imgPathFondoLarge: String,
  imgPathFondoMedion:String,
  imgPathPrincipalSmall:String,
  colorFondo: String,
  backgroundTipo :  Boolean,
});



module.exports = mongoose.model("historia", historia);
