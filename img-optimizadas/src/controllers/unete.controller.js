const uneteEqipoModel = require('../models/uneteEqipo.model');
const Unete = require('../models/uneteEqipo.model');

function PlazaPorDefecto(){

  Unete.find((err,NoticiasFiend)=>{
    if(err){
        return console.log("error en la peticion 1")            
    }else if (NoticiasFiend.length == 0){
      let PlazaModel = new Unete()

      PlazaModel.titulo = 'Desarrollador de Software'
      PlazaModel.ubicacion = 'San Salvador'
      PlazaModel.departamento = 'Desarrollo'
      PlazaModel.empresa = 'Empresa X'
      PlazaModel.funciones = ['Desarrollar software', 'Mantener software', 'Probar software']
      PlazaModel.educacion = 'Ingenieria en Sistemas'
      PlazaModel.experecia = '2 años'
    
    
      PlazaModel.save((err,uneteGuardado)=>{
        if(err){
          console.log('Error al guardar la plaza por defecto')
        }else if(uneteGuardado){
          console.log('Plaza por defecto guardada')
        }else{
          console.log('Error al guardar la plaza por defecto')
        }
      })
    }else{
      console.log('Plaza por defecto ya existe')
    }
  })

}


function CrearEmpleo (req,res){


    UneteModel = new Unete()
    let parametros = req.body

    UneteModel.titulo = req.body.titulo
    UneteModel.ubicacion = req.body.ubicacion
    UneteModel.departamento = req.body.departamento
    UneteModel.empresa = req.body.empresa
    UneteModel.funciones = req.body.funciones
    UneteModel.educacion = req.body.educacion
    UneteModel.experecia = req.body.experecia

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

  function editatFuncionesV2(req,res){
    let id = req.params.id;
    let position = req.params.position

    Unete.findById(id,(err,uneteFinded)=>{
      if(err){
        return res.status(404).send({message:'error en la peticion'})
      }else if(uneteFinded){


        let arrayPlaza =  uneteFinded.funciones

        arrayPlaza[position] = req.body.funciones

        Unete.findByIdAndUpdate(id,{funciones:arrayPlaza},{new:true},(err,uneteUpdated)=>{
          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }

        })


        console.log(arrayPlaza)
        console.log(position)


      }else{
        return res.status(400).send({message:'error al obtener el usuario'})
      }

    })
  }

  function eliminarFuncionV2(req, res) {
    const id = req.params.id;
    const position = req.params.position;

    Unete.findById(id, (err, uneteFinded) => {
        if (err) {
            return res.status(404).send({ message: 'Error en la petición' });
        } else if (uneteFinded) {
            const arrayPlaza = uneteFinded.funciones;

            // Verificar que la posición es válida
            if (position >= 0 && position < arrayPlaza.length) {
                // Eliminar el elemento en la posición especificada
                arrayPlaza.splice(position, 1);

                // Actualizar el documento con el array modificado
                Unete.findByIdAndUpdate(
                    id,
                    { funciones: arrayPlaza },
                    { new: true },
                    (err, uneteUpdated) => {
                        if (err) {
                            return res.status(500).send({ message: 'Error al actualizar el registro' });
                        } else if (uneteUpdated) {
                            return res.status(200).send({ message: 'Registro actualizado con éxito', uneteUpdated });
                        } else {
                            return res.status(400).send({ message: 'Error al actualizar el registro' });
                        }
                    }
                );
            } else {
                return res.status(400).send({ message: 'Posición de función inválida' });
            }
        } else {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
    });
}


function obtenerFuncionesxid(req, res) {
    const id = req.params.id;

    Unete.findById(id, (err, uneteFinded) => {
        if (err) {
            return res.status(404).send({ message: 'Error en la petición' });
        } else if (uneteFinded) {
            return res.status(200).send({ funciones: uneteFinded.funciones });
        } else {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
    });
}



  function agregarFuncionesAUnete(req, res) {
    try {
      const { id,  } = req.params;
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



  function editarPlaza(req,res){

    id = req.params.id
    parametros = req.body

    Unete.findByIdAndUpdate(id,parametros,{new:true},(err,uneteUpdated)=>{
      if(err){
        return res.status(404).send({message:'error en la peticion'})
      }else if (uneteUpdated){
        return res.status(200).send({message:'plazo  actualizado con exito'})
      }else{
        return res.status(400).send({message:'error al actualizar el usuario'})
      }
    })


  }



  function eiliminarPlaza(req,res){
    let id = req.params.id

    Unete.findByIdAndDelete(id,(err,uneteDeleted)=>{
      if(err){
        return res.status(404).send({message:'error en la peticion'})
      }else if (uneteDeleted){
        return res.status(200).send({message:'plazo  eliminado con exito'})
      }else{
        return res.status(400).send({message:'error al eliminar el usuario'})
      }
    })


  }



  function obtenerPlazas(req,res){
    Unete.find({},(err,uneteFinded)=>{
      if(err){
        return res.status(404).send({message:'error en la peticion'})
      }else if (uneteFinded){
        return res.status(200).send({plazas:uneteFinded})
      }else{
        return res.status(400).send({message:'error al obtener el usuario'})
      }
    })
  }

module.exports = {
    CrearEmpleo,
    obtenerUnete,
    editarFunciones,   
    agregarFuncionesAUnete,
    editarUnete,
    PlazaPorDefecto,
    editarPlaza,
    eiliminarPlaza,
    obtenerPlazas,
    editatFuncionesV2,
    eliminarFuncionV2,
    obtenerFuncionesxid
}
