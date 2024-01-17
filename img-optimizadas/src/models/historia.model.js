const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historia = Schema({
  EncalceVideo: String,
  DescripcionHistoria: String,
  imgPathPrincipal: String,
  imgPathFondo: String,
});



module.exports = mongoose.model("historia", historia);
