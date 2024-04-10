const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unetesSchema = Schema({
  titulo: String,
  ubicacion: String,
  departamento: String,
  empresa: String,
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaModificacion: {
    type: Date,
    default: Date.now
  },
  funciones: [String],
  educacion: String,
  experiencia: String,
  enlaceFormulario: String,
  imgPath: String,
  idPublic: String,
  estado: String,
});

const Unete = mongoose.model("unetes", unetesSchema);