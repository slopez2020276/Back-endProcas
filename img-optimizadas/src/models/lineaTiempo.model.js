const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define el esquema para el objeto principal
const lineaTiempo = new Schema({
  anio: Number, // Año del evento
  eventos: [ // Array de eventos
    {
      ImgPathLineaTiempo: String,
      titleLineaTiempo: String,
      subTitleLineaTiempo: String,
      descriptionLineaTiempo: String,
      mostrarPor: String,
      idPublic: String
    }
  ]
});

// Crea el modelo basado en el esquema
module.exports = mongoose.model("lineaTiempo", lineaTiempo);
