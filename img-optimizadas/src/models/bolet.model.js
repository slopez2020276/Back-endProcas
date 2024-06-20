// models/boleta.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ajusteSchema = new Schema({
  descripcion: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  }
});

const transaccionSchema = new Schema({
  ajustes: {
    type: [ajusteSchema],
    default: []
  },
  total: {
    type: Number,
    required: true
  }
});

const boletaSchema = new Schema({
  fecha: {
    type: Date,
    required: true
  },
  puesto: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  dpi: {
    type: String,
    required: true
  },
  comprobanteNo: {
    type: Number,
    required: true
  },
  ingreso: {
    type: [transaccionSchema],
    default: []
  },
  egreso: {
    type: [transaccionSchema],
    default: []
  },
  totalIngresos: {
    type: Number,
    required: true,
    default: 0
  },
  totalEgresos: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Middleware to calculate totalIngresos and totalEgresos
boletaSchema.pre('save', function(next) {
  this.totalIngresos = this.ingreso.reduce((sum, transaccion) => sum + transaccion.total, 0);
  this.totalEgresos = this.egreso.reduce((sum, transaccion) => sum + transaccion.total, 0);
  next();
});

const Boleta = mongoose.model('Boleta', boletaSchema);

module.exports = Boleta;
