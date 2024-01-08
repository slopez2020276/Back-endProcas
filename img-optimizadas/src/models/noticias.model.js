const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiaSchema = Schema({
  titulo: String,
  imgPhat: String,
  descripcion: String,
});

module.exports = mongoose.model("noticias", noticiaSchema);
