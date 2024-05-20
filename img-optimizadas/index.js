const mongoose = require("mongoose");
const app = require("./app");
const estadosController = require('./src/controllers/estados.controller');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 3009;
const IP = '0.0.0.0'; // Escucha en todas las interfaces de red

mongoose
  .connect('mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {  
    //'mongodb://localhost/procasa'
    //mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
        //mongodb+srv://desjr:desjr@interno.g3fzrlc.mongodb.net/?retryWrites=true&w=majority&appName=Interno


    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");
    app.listen(PORT, IP, () => {
      console.log('El servidor está levantado en el puerto ' + PORT);
    });
  })
  .catch((error) => console.log(error));
