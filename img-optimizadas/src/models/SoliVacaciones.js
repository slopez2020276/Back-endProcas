const { id } = require("date-fns/locale");
const { isDuration } = require("moment");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SoliVacaciones = Schema({
    nombre: String,
    departamento: String,
    Usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios'}, 
    fechaInicio: Date,
    fechaFin: Date,
    email: String,


});



module.exports = mongoose.model("SoliVacaciones", SoliVacaciones);
