const { Respuesta } = require('../../database');

const crearRespuesta = async (req, res) => {
  try {
    const { idPeticion, respuesta } = req.body;

    const nuevaRespuesta = new Respuesta({
      idPeticion,
      respuesta,
    });

    await nuevaRespuesta.save();

    res.status(201).json(nuevaRespuesta);
  } catch (error) {
    console.error('Error al crear la respuesta:', error);
    res.status(500).json({ message: 'Error al crear la respuesta' });
  }
};

const obtenerRespuestas = async (req, res) => {
  try {
    const respuestas = await Respuesta.find();
    res.status(200).json(respuestas);
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    res.status(500).json({ message: 'Error al obtener las respuestas' });
  }
};

module.exports = {
  crearRespuesta,
  obtenerRespuestas,
};
