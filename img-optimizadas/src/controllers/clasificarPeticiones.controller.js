const { ColaServidor1, PeticionClasificada, PeticionPendiente } = require('../../database');

const classifyAndSavePeticiones = async () => {
    try {
      // Consulta las peticiones de la base de datos del servidor 1
      const colas = await ColaServidor1.find();
  
      // Clasificación de peticiones por tipo (metodo)
      const peticionesClasificadas = {};
      const peticionesPendientes = [];
  
      colas.forEach(cola => {
        cola.cola.forEach(peticion => {
          const tipo = peticion.metodo;
          if (!peticionesClasificadas[tipo]) {
            peticionesClasificadas[tipo] = [];
          }
          peticionesClasificadas[tipo].push(peticion);
          peticionesPendientes.push(peticion); // Agregar a peticiones pendientes
        });
      });
  
      // Guardar las peticiones clasificadas en la base de datos del servidor 2
      for (const [tipo, peticiones] of Object.entries(peticionesClasificadas)) {
        const peticionClasificada = new PeticionClasificada({ tipo, peticiones });
        await peticionClasificada.save();
      }
  
      // Guardar las peticiones pendientes en la base de datos del servidor 2
      await PeticionPendiente.insertMany(peticionesPendientes);
  
      // Limpiar la cola del servidor 1
      await ColaServidor1.updateMany({}, { $set: { cola: [] } });
  
      console.log('Peticiones clasificadas, guardadas y cola del servidor 1 limpiada correctamente.');
    } catch (error) {
      console.error('Error al clasificar, guardar peticiones y limpiar la cola:', error);
    }
  };
  

setInterval(classifyAndSavePeticiones, 2 * 1000); 


module.exports = classifyAndSavePeticiones;
