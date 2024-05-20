const mongoose = require("mongoose");
const app = require("./app");
const estadosController = require('./src/controllers/estados.controller');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3009;
const IP = '0.0.0.0'; // Escucha en todas las interfaces de red

mongoose
  .connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
    app.listen(PORT, IP, () => {
      estadosController.verificarDisponibilidad();
      console.log('El servidor está levantado en el puerto ' + PORT);
    });
  })
  .catch((error) => console.log(error));
