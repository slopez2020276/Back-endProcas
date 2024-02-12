const Unete = require('../models/uneteEqipo.model');


function CrearEmpleo (req,res){


    UneteModel = new Unete()
    let parametros = req.body

    UneteModel.titulo = parametros.titulo
    UneteModel.ubicacion = parametros.ubicacion
    UneteModel.departamento = parametros.departamento
    UneteModel.empresa = parametros.empresa
    UneteModel.funciones = parametros.funciones
    UneteModel.educacion = parametros.educacion
    UneteModel.experecia = parametros.experecia

    UneteModel.save((err,uneteGuardado)=>{
        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(uneteGuardado){
            return res.status(200).send({unete:uneteGuardado})
        }else{
            return res.status(200).send({message:'error al guardar el unete'})
        }
    })

}

function obtenerUnete(req,res){
    Unete.find({},(err,uneteFinded)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(uneteFinded){
            return res.status(200).send({unete:uneteFinded})
        }else{
            return res.status(200).send({message:'error al obtener el unete'})
        }

    })
}


function editarFunciones(req, res) {
    let id = req.params.id;
    const  nuevasFunciones  = req.body.funciones;
  
    Unete.findByIdAndUpdate(
      id,
      { $set: { funciones: nuevasFunciones } },
      { new: true },
      (err, uneteActualizado) => {
        if (err) {
          return res.status(400).send({ message: 'Error en la petición' });
        } else if (uneteActualizado) {
          return res.status(200).send({ unete: uneteActualizado });
        } else {
          return res.status(200).send({ message: 'Error al actualizar el unete' });
        }
      }
    );
  }


  function agregarFuncionesAUnete(req, res) {
    try {
      const { id,  } = req.body;
      nuevasFunciones =   req.body.funciones;
  
      // Verificar que nuevasFunciones sea un array válido
      const funcionesArray = Array.isArray(nuevasFunciones) ? nuevasFunciones : [];
  
      // Encuentra el Unete por su ID y actualiza las funciones
      Unete.findOneAndUpdate(
        { _id: id },
        { $push: { funciones: { $each: funcionesArray } } },
        { new: true },
        (err, uneteActualizado) => {
          if (err) {
            console.error('Error al agregar funciones al Unete:', err);
            return res.status(500).send({ message: 'Error en el servidor' });
          }
  
          if (!uneteActualizado) {
            return res.status(404).send({ message: 'Unete no encontrado' });
          }
  
          res.status(200).send({ unete: uneteActualizado });
        }
      );
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(400).send({ message: 'Error en la solicitud' });
    }
  }

  function editarUnete(req, res) {
    try {
      const { id, nuevasPropiedades } = req.body;
  
      // Encuentra el Unete por su ID y actualiza las propiedades
      Unete.findOneAndUpdate(
        { _id: id },
        { $set: nuevasPropiedades },
        { new: true },
        (err, uneteActualizado) => {
          if (err) {
            console.error('Error al editar el Unete:', err);
            return res.status(500).send({ message: 'Error en el servidor' });
          }
  
          if (!uneteActualizado) {
            return res.status(404).send({ message: 'Unete no encontrado' });
          }
  
          res.status(200).send({ unete: uneteActualizado });
        }
      );
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(400).send({ message: 'Error en la solicitud' });
    }
  }

module.exports = {
    CrearEmpleo,
    obtenerUnete,
    editarFunciones,   
    agregarFuncionesAUnete,
    editarUnete
}
