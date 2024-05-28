


const { MongoClient } = require('mongodb');
const estadosModel = require('../models/estados.model');
const fs = require('fs').promises;

const Estados = require('../models/estados.model');
const Cola = require('../models/cola.model');
const { setInterval } = require('timers');
const axios = require('axios');





const origenURI = 'mongodb+srv://desjr:desjr@cluster0.qmiwvug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const destinoURI = 'mongodb+srv://desjr:desjr@interno.g3fzrlc.mongodb.net/?retryWrites=true&w=majority&appName=Interno';

// Función para copiar la base de datos
async function copiarBaseDatos(req, res) {
    const origenClient = new MongoClient(origenURI);
    const destinoClient = new MongoClient(destinoURI);

    try {
        await origenClient.connect();
        await destinoClient.connect();

        const origenDB = origenClient.db();
        const destinoDB = destinoClient.db();

        // Eliminar todas las colecciones existentes en la base de datos de destino
        const coleccionesDestino = await destinoDB.listCollections().toArray();
        for (const coleccion of coleccionesDestino) {
            await destinoDB.collection(coleccion.name).drop();
        }

        // Copiar los datos de la base de datos de origen a la base de datos de destino
        const coleccionesOrigen = await origenDB.listCollections().toArray();
        for (const coleccion of coleccionesOrigen) {
            const nombreColeccion = coleccion.name;
            const documentos = await origenDB.collection(nombreColeccion).find().toArray();
            if (documentos.length > 0) { // Verifica si la colección contiene documentos
                await destinoDB.collection(nombreColeccion).insertMany(documentos);
            } else {
                console.log(`La colección ${nombreColeccion} está vacía. No se copiarán documentos.`);
            }
        }

        return res.status(200).send({ message: 'Base de datos copiada exitosamente.' });
    } catch (error) {
        console.error("Error al copiar la base de datos:", error);
        return res.status(500).send({ message: 'Error al copiar la base de datos.' });
    } finally {
        await origenClient.close();
        await destinoClient.close();
    }
}



async function exportarDatos(origenDB) {
    const colecciones = await origenDB.listCollections().toArray();

    for (const coleccion of colecciones) {
        const nombreColeccion = coleccion.name;
        const documentos = await origenDB.collection(nombreColeccion).find().toArray();
        const datosJSON = JSON.stringify(documentos);
        await fs.writeFile(`${nombreColeccion}.json`, datosJSON);
        console.log(`Datos de la colección ${nombreColeccion} exportados a ${nombreColeccion}.json`);
    }
}

async function cargarDatos(destinoDB) {
    const archivos = await fs.readdir('.');
    for (const archivo of archivos) {
        if (archivo.endsWith('.json')) {
            const nombreColeccion = archivo.slice(0, -5); // Eliminar la extensión .json
            const datosJSON = await fs.readFile(archivo, 'utf-8');
            const documentos = JSON.parse(datosJSON);
            if (documentos.length > 0) { // Verificar si el archivo JSON no está vacío
                await destinoDB.collection(nombreColeccion).insertMany(documentos);
                console.log(`Datos del archivo ${archivo} cargados en la colección ${nombreColeccion}`);
            } else {
                console.log(`El archivo ${archivo} está vacío. No se cargarán datos.`);
            }
        }
    }
}

async function copiarBaseDatosJson(req, res) {
    const origenClient = new MongoClient(origenURI);
    const destinoClient = new MongoClient(destinoURI);

    try {
        await origenClient.connect();
        await destinoClient.connect();

        const origenDB = origenClient.db();
        const destinoDB = destinoClient.db();

        // Eliminar la base de datos de destino
    

        const colecciones = await origenDB.listCollections().toArray();

        for (const coleccionInfo of colecciones) {
            const nombreColeccion = coleccionInfo.name;
            const cursor = origenDB.collection(nombreColeccion).find();
            const documentos = await cursor.toArray();
            for (const documento of documentos) {
                const { _id, ...resto } = documento;
                const existe = await destinoDB.collection(nombreColeccion).findOne({ _id });
                if (!existe) {
                    await destinoDB.collection(nombreColeccion).insertOne(documento);
                    console.log(`Documento con _id: ${_id} insertado en la colección ${nombreColeccion}.`);
                } else {
                    console.log(`Documento con _id: ${_id} ya existe en la colección ${nombreColeccion}.`);
                }
            }
        }

        return res.status(200).send({ message: 'Base de datos copiada exitosamente.' });
    } catch (error) {
        console.error("Error al copiar la base de datos:");
        return res.status(500).send({ message: 'Error al copiar la base de datos.' });
    } finally {
        await origenClient.close();
        await destinoClient.close();
    }

    }
    




    function crearEstadoPordefecto(){

    }

// Función para consultar constantemente la disponibilidad y ejecutar acciones en la cola
async function verificarDisponibilidad() {
    try {
        // Consultar el estado de disponibilidad en el servidor 1
        const estado = await Estados.findOne({});
        if (!estado || estado.estado !== 'disponible') {
            console.log('El servidor 1 no está disponible en este momento.');
            return;
        }

        // Si el servidor está disponible, ejecutar las acciones en la cola
        const cola = await Cola.findOne({});
        if (!cola || !cola.cola || cola.cola.length === 0) {
            console.log('No hay acciones en la cola para ejecutar.');
            return;
        }

        // Iterar sobre cada acción en la cola
        for (const accion of cola.cola) {
            console.log('Ejecutando acción en la cola:', accion);

            try {
                // Determinar el método de solicitud HTTP basado en el tipo de acción
                let metodoHTTP = '';
                if (accion.metodo === 'PUT') {
                    metodoHTTP = 'put';
                } else if (accion.metodo === 'POST') {
                    metodoHTTP = 'post';
                } else if (accion.metodo === 'DELETE'){
                    metodoHTTP = 'delete';
                }else {
                    console.error('Método de solicitud no soportado:', accion.metodo);
                    continue; // Pasar a la siguiente acción si el método no es PUT o POST
                }

                // Enviar los datos al servidor 2 para que los guarde
                console.log(`http://192.168.23.45:3009${accion.ruta}`)
                const respuesta = await axios[metodoHTTP](`http://192.168.23.45:3000${accion.ruta}`, accion.respuesta.data);
                console.log('Respuesta del servidor 2:', respuesta.data);
                
                // Aquí puedes eliminar la acción de la cola si se ejecutó con éxito
            } catch (error) {
                console.error('Error al enviar la acción al servidor 2:');
            }
        }

        // Vaciar la cola después de ejecutar todas las acciones
        cola.cola = [];
        await cola.save();

        console.log('Todas las acciones en la cola han sido ejecutadas y la cola ha sido vaciada.');
    } catch (error) {
        console.error('Error al verificar disponibilidad y ejecutar acciones en la cola:');
    }
}


setInterval(verificarDisponibilidad, 10 * 1000); 


module.exports = {
    copiarBaseDatos,
    copiarBaseDatosJson,
    verificarDisponibilidad
}