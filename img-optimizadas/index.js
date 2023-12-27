
const mongoose = require("mongoose");
const app = require("./app");
const usuarioController = require("./src/controllers/users.controller");
const lineaController = require("./src/controllers/lineaTiempo.controller")
const noticasController = require("./src/controllers/noticias.controller")
const mainPage = require("./src/controllers/mainPage.controller")

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/procasa' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
        usuarioController.RegistrarAd()


        lineaController.crearEventosLineaDeTiempoDefult()


        noticasController.crearNocitiasDefult()


      const PORT = process.env.PORT || 3002
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto '+PORT 
      );
      mainPage.crearMainPageDefult()

    });
  })
  .catch((error) => console.log(error));
