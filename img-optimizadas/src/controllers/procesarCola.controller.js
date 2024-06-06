const axios = require('axios');
const { ColaServidor2, PeticionPendienteServidor2, ColaServidor3, PeticionPendienteServidor3 } = require('../../database');

// Función para ejecutar la acción según el método y ruta
const ejecutarAccion = async (peticion) => {
  try {
    let respuesta;
    const config = {
      method: peticion.metodo.toLowerCase(),
      url: `http://localhost:3011${peticion.ruta}`, // Ajusta la URL según sea necesario
      data: peticion,
    };

    respuesta = await axios(config);

    return respuesta.data;
  } catch (error) {
    console.error(`Error al ejecutar la petición ${peticion._id}:`);
    throw error;
  }
};

const moverYProcesarCola = async () => {
  try {
    // Obtén las peticiones pendientes del servidor 2
    const peticionesPendientes = await PeticionPendienteServidor2.find({ estado: 'pendiente' });

    // Mueve las peticiones pendientes del servidor 2 al servidor 3
    for (const peticion of peticionesPendientes) {
      const nuevaPeticion = new PeticionPendienteServidor3(peticion.toObject());
      await nuevaPeticion.save();
      await peticion.remove();
    }

    console.log('Peticiones movidas del servidor 2 al servidor 3.');

    // Procesar la cola en el servidor 3
    const peticionesServidor3 = await PeticionPendienteServidor3.find({ estado: 'pendiente' });

    for (const peticion of peticionesServidor3) {
      // Ejecutar la acción correspondiente
      const resultado = await ejecutarAccion(peticion);

      // Actualizar la petición con el resultado y cambiar su estado a 'completado'
      peticion.respuesta = resultado;
      peticion.estado = 'completado';
      await peticion.save();

      // Enviar el resultado al servidor 2 (si es necesario)

      // Enviar el resultado al servidor 1 (si es necesario)
    }

    console.log('Cola procesada y peticiones ejecutadas correctamente en el servidor 3.');
  } catch (error) {
    console.error('Error al mover, procesar la cola y limpiar la cola del servidor 2:', );
  }
};

module.exports = moverYProcesarCola;
