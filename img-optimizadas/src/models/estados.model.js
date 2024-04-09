const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const estado = Schema({
  Esadoto: String,
  
});



module.exports = mongoose.model("estado", estado);
