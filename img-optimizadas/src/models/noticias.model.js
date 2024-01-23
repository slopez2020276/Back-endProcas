const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiaSchema = Schema({
  imgPhat: String,
  fecha: Date,
  title:String,
  descripcion: String,
  prioridad:Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("noticias", noticiaSchema);
