


const { MongoClient } = require('mongodb');


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



module.exports = {
    copiarBaseDatos	
}