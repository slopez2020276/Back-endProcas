// index.js
const app = require('./app');
const { db1, db2 } = require('./database'); // Importar las conexiones de la base de datos

const PORT = process.env.PORT || 3011;
const IP = '0.0.0.0'; // Escucha en todas las interfaces de red

// Función para verificar las conexiones de las bases de datos
const checkDbConnections = () => {
  return new Promise((resolve, reject) => {
    let db1Connected = false;
    let db2Connected = false;

    db1.on('connected', () => {
      db1Connected = true;
      if (db1Connected && db2Connected) resolve();
    });

    db2.on('connected', () => {
      db2Connected = true;
      if (db1Connected && db2Connected) resolve();
    });

    db1.on('error', reject);
    db2.on('error', reject);
  });
};

checkDbConnections()
  .then(() => {
    console.log('Conexiones a bases de datos establecidas. Levantando el servidor...');
    app.listen(PORT, IP, () => {
      console.log(`El servidor está levantado en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a las bases de datos:', error);
  });
