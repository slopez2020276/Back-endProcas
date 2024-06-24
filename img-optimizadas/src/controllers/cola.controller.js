const Estado = require('../models/estados.model');
const Cola = require('../models/cola.model');


async function obtenerEstados (req, res)  { 
    try {
        const estados = await Estado.find();
        return res.status(200).send(estados);
    } catch (error) {
        console.error("Error al obtener los estados:", error);
        return res.status(500).send({ message: 'Error al obtener los estados.' });
    }
}


async function obtenerCola (req,res)  {
    try {
        const Colaa = await Cola.find();
        return res.status(200).send(Colaa);
    } catch (error) {
        console.error("Error al obtener los estados:", error);
        return res.status(500).send({ message: 'Error al obtener los estados.' });
    }

}


async function crearcola (req,res)  {
    
}

module.exports = {
    obtenerEstados,
    obtenerCola
}