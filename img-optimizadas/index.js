const mongoose = require("mongoose");
const app = require("./app");
const usuarioController = require("./src/controllers/users.controller");
const lineaController = require("./src/controllers/lineaTiempo.controller");
const noticasController = require("./src/controllers/noticias.controller");
const mainPage = require("./src/controllers/mainPage.controller");
const historiaController = require('./src/controllers/historia.controller');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);  // Añade esta línea para evitar la advertencia

mongoose
  .connect('mongodb://localhost/procasa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, function () {
      lineaController.crearEventosLineaDeTiempoDefult();
      console.log(
        'El servidor está levantado en el puerto ' + PORT
      );
    });
  })
  .catch((error) => console.log(error));



