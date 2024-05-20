   const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Cola = Schema({
  cola:[],
});



module.exports = mongoose.model("Cola", Cola);
