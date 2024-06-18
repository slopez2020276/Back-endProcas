// index.js
const app = require('./app');
const procesarCola = require('./src/controllers/procesarCola.controller');

const PORT = process.env.PORT || 3011;
const IP = '0.0.0.0';

app.listen(PORT, IP, () => {
  console.log(`Servidor 3 está corriendo en el puerto ${PORT}.`);

  // Ejecutar procesarCola cada 10 segundos (ajusta según sea necesario)
  setInterval(procesarCola, 10000);
});
