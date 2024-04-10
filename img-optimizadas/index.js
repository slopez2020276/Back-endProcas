const mongoose = require("mongoose");
const app = require("./app");
const usuarioController = require("./src/controllers/users.controller");
const lineaController = require("./src/controllers/lineaTiempo.controller");
const noticasController = require("./src/controllers/noticias.controller");
const mainPage = require("./src/controllers/mainPage.controller");
const historiaController = require('./src/controllers/historia.controller');
const equipoCOntroller = require('./src/controllers/unete.controller');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);  // Añade esta línea para evitar la advertencia

mongoose
  .connect('mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    //'mongodb://localhost/procasa'
    //mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
    const PORT = process.env.PORT || 3002;
    equipoCOntroller.eliminarRegistrosInactivos();
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto ' + PORT
      );
    });
  })
  .catch((error) => console.log(error));



