const Productos = require('../models/productos.model');
const Listas = require('../models/listasProductos.model');
const path = require('path');
const fs = require('fs-extra');

// Función para crear un producto
async function CrearProductos(req, res) {
    try {
        const parametros = req.body;
        const imgPatha = req.file.path;

        // Crear un nuevo producto
        const nuevoProducto = new Productos({
            nombre: parametros.nombre,
            imgPath: imgPatha
        });

        // Guardar el nuevo producto en la base de datos
        const productoCreado = await nuevoProducto.save();

        // Devolver el producto creado como respuesta
        return res.status(200).send({ producto: productoCreado });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}

// Función para crear una nueva lista en un producto existente
async function CrearListaEnProducto(req, res) {

    let idProducto = req.params.idProducto;	
    let nuevaLista = req.body.tituloLista
    try {
        const { tituloLista, descripcionItems } = req.body;

        // Buscar el producto por su ID
        const producto = await Productos.findById(idProducto);

        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Crear una nueva lista con los items proporcionados
      

        // Agregar la nueva lista al producto
        producto.Lista.push({tituloLista:nuevaLista});

        // Guardar los cambios en el producto
        await producto.save();

        // Devolver el producto actualizado como respuesta
        return res.status(200).send({ producto: producto });
    } catch (error) {
        console.error('Error al crear la lista en el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    CrearProductos,
    CrearListaEnProducto
};
