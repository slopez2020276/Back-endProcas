const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lista = new Schema({
  imgPath: String,
  nombre: String,
  Lista: [{
    tituloLista: String,
    listaItems: [{
      descripcion: String,
    }]
  }],
});
module.exports = mongoose.model("lista", lista);
