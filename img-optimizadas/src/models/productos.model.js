const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  // Propiedades específicas de cada "item" dentro de "Listas"
  // Por ejemplo:
  nombreItem: String,
  // Otras propiedades del "item" según tus necesidades
});

const categoriaSchema = new Schema({
  Nombre: String,
  items: [String]  // Array de strings para almacenar nombres de items
});

const productosSchema = new Schema({
  nombreProducto: String,
  imgPath: String,
  categorias: [categoriaSchema]
});

module.exports = mongoose.model("productos", productosSchema);
