const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiaSchema = Schema({
  imgPhat: String,
  fecha: Date,
  title:String,
  descripcion: String,
  tipo:String,
  fecha: {
    type: Date,
    default: Date.now
  },
  idPulic:String
});

module.exports = mongoose.model("noticias", noticiaSchema);
