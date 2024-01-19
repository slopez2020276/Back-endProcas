const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiaSchema = Schema({
  imgPhat: String,
  fecha: Date,
  title:String,
  descripcion: String,
});

module.exports = mongoose.model("noticias", noticiaSchema);
