const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const estados = new Schema({
  estado: String,
});
module.exports = mongoose.model("estados", estados);