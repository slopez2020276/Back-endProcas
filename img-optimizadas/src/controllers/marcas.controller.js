const Marcas = require('../models/marcas.model');
const express = require('express')

const { param } = require('../routes/img.routes')
const path = require('path')
const cloudinary = require("../../libs/cloudinary");


async function crearMarca(req, res) {
    try {
        const  textMarca  = req.body.textMarca;

        console.log(req.file.path)

        cloudinary.uploader.upload(req.file.path, async function (err, result){
            if(err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Error"
              })
            }
            else{
             
                
        const nuevaMarca = new Marcas({ 
            imgPath: result.url, 
            idPublic: result.public_id, 
            textMarca 
        });

    
            console.log(nuevaMarca)
            const MarcaUpdated = await nuevaMarca.save();
            res.status(200).json({ success: true, message: 'nueva marca creada', MarcaUpdated });
    
            
            }
          })
    
    } catch (error) {
        console.error('Error al crear la marca:', error);
        res.status(500).json({ message: 'Error al crear la marca' });
    }
}

async function obtenerMarcas(req, res) {
    try {
        const marcas = await Marcas.find();
        res.status(200).json({marcas:marcas});
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
        res.status(500).json({ message: 'Error al obtener las marcas' });
    }
}

// Obtener una marca por su ID
async function obtenerMarcaPorId(req, res) {
    try {
        const marca = await Marcas.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.status(200).json(marca);
    } catch (error) {
        console.error('Error al obtener la marca:', error);
        res.status(500).json({ message: 'Error al obtener la marca' });
    }
}

async function eliminarMarca(req, res) {
    try {
        const marca = await Marcas.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }

        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(marca.idPublic);

        await Marcas.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        res.status(500).json({ message: 'Error al eliminar la marca' });
    }
}

function actualizarMarca(req, res) {
    const idMarca = req.params.idMarca;
    const parametros = req.body;

    Marcas.findById(idMarca, async (err, marcaSinEditar) => {
        if (err) {
            return res.status(404).send({ message: 'Error en la petición' });
        }

        if (!marcaSinEditar) {
            return res.status(404).send({ message: 'La marca no se encuentra registrada' });
        }

        try {
            let imgPublicId = marcaSinEditar.idPublic;

            // Si se proporciona una nueva imagen, subirla a Cloudinary y eliminar la imagen anterior
            if (req.file) {
                // Subir la nueva imagen a Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path);
                imgPublicId = result.public_id;
                imgPath = result.url;
                // Eliminar la imagen anterior de Cloudinary
                await cloudinary.uploader.destroy(marcaSinEditar.idPublic);
            }

            // Actualizar la marca en la base de datos
            const marcaActualizada = await Marcas.findByIdAndUpdate(idMarca, {
                imgPath:  imgPath ,
                idPublic: imgPublicId,
                textMarca: req.body.textMarca
            }, { new: true });

            res.status(200).json({ marcaUpdated: marcaActualizada });
        } catch (error) {
            console.error('Error al actualizar la marca:', error);
            res.status(500).json({ message: 'Error al actualizar la marca' });
        }
    });
}

module.exports = {
    crearMarca,
    obtenerMarcas,
    obtenerMarcaPorId,
    actualizarMarca,
    eliminarMarca
};