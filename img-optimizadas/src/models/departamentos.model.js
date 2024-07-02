const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departamentosSchema = new Schema({
  nombre: String,
  IdJefe: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
});


module.exports = mongoose.model("Departametos", departamentosSchema);