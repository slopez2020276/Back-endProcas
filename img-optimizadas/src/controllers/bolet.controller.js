const bodyParser = require('body-parser');
const Boleta = require('../models/bolet.model');
const { obtenerCola } = require('./cola.controller');

 crearBoleta =  async (req, res) => {
    try {
      const boleta = new Boleta(req.body);
      await boleta.save();
      res.status(201).send(boleta);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  obtenerBoletas =  async (req, res) => {
    try {
      const boletas = await Boleta.find();
      res.send(boletas);
    } catch (error) {
      res.status(500).send(error);
    }
  }


  obtenerBoletasxId =  async (req, res) => {
    try {
      const boleta = await Boleta.findById(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
      res.send(boleta);
    } catch (error) {
      res.status(500).send(error);
    }
  }


  ActualizarBoleta = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['fecha', 'puesto', 'nombre', 'dpi', 'comprobanteNo', 'ingreso', 'egreso'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Actualización no permitida' });
    }
  
    try {
      const boleta = await Boleta.findById(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
  
      updates.forEach(update => boleta[update] = req.body[update]);
      await boleta.save();
  
      res.send(boleta);
    } catch (error) {
      res.status(400).send(error);
    }
  }


async function crearSolicitudBoleta(req, res){
    let  user = req.user.sub;


    console.log(user);


}


  EliminarBoleta = async (req, res) => {
    try {
      const boleta = await Boleta.findByIdAndDelete(req.params.id);
      if (!boleta) {
        return res.status(404).send();
      }
      res.send(boleta);
    } catch (error) {
      res.status(500).send(error);
    }
  }

    module.exports = {
        crearBoleta,
        obtenerBoletas,
        obtenerBoletasxId,
        ActualizarBoleta,
        EliminarBoleta,
        crearSolicitudBoleta
    }



