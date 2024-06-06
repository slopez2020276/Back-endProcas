const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db2 = mongoose.createConnection('mongodb://192.168.22.90:27017/procasa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db3 = mongoose.createConnection('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db2.on('connected', () => {
  console.log('Conectado a la base de datos del servidor 2.');
});

db2.on('error', (error) => {
  console.error('Error al conectar a la base de datos del servidor 2:', error);
});

db3.on('connected', () => {
  console.log('Conectado a la base de datos del servidor 3.');
});

db3.on('error', (error) => {
  console.error('Error al conectar a la base de datos del servidor 3:', error);
});

const ColaServidor2 = db2.model('Cola', require('./src/models/cola.model').schema);
const PeticionPendienteServidor2 = db2.model('PeticionPendiente', require('./src/models/peticionesPendientes.mode').schema);

const ColaServidor3 = db3.model('Cola', require('./src/models/cola.model').schema);
const PeticionPendienteServidor3 = db3.model('PeticionPendiente', require('./src/models/peticionesPendientes.mode').schema);

module.exports = {
  ColaServidor2,
  PeticionPendienteServidor2,
  ColaServidor3,
  PeticionPendienteServidor3,
};
