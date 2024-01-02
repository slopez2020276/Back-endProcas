const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historia = Schema({
  EncalceVideo: String,
  DescripcionHistoria: String,
});

module.exports = mongoose.model("historia", historia);
