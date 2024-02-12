const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unetes = Schema({
  titulo: String,
  ubicacion: String,
  departamento: String,
  empresa: String,
  fecha: {
    type: Date,
    default: Date.now
  },
  funciones:[String],
  educacion:String,
  experecia:String,


});

module.exports = mongoose.model("unetes", unetes);


