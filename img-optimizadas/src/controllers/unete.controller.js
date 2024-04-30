const { cloudinary_js_config } = require('../../libs/cloudinary');
const uneteEqipoModel = require('../models/uneteEqipo.model');
const Unete = require('../models/uneteEqipo.model');
const cloudinary = require("../../libs/cloudinary");
const { param } = require('../routes/ubicaciones.routes');
const { format } = require('date-fns');
const { subDays } = require('date-fns');



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
      PlazaModel.enlaceFormualario = 'https://forms.gle/kwy2Yp7ZrQ8QHCER6'
      PlazaModel.imgPath = ''
      PlazaModel.idPublic = 'publico'

    
    
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


     let uneteModel = new Unete()

    uneteModel.titulo = req.body.titulo
    uneteModel.ubicacion = req.body.ubicacion
    uneteModel.departamento = req.body.departamento
    uneteModel.empresa = req.body.empresa
    uneteModel.funciones = req.body.funciones
    uneteModel.educacion = req.body.educacion
    uneteModel.experiencia = req.body.experiencia
    uneteModel.enlaceFormualario = req.body.enlaceFormualario
    uneteModel.estado = 'activo'
    uneteModel.descripcion = req.body.descripcion
    uneteModel.visibilidad = req.body.visibilidad

    cloudinary.uploader.upload(req.file.path , function(error, result) {
      if(error){
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }else{
        uneteModel.imgPath = result.url
        uneteModel.idPublic = result.public_id

        uneteModel.save((err,uneteGuardado)=>{
          if(err){
              return res.status(400).send({message:'error en la peticion'})
          }else if(uneteGuardado){
              return res.status(200).send({unete:uneteGuardado})
          }else{
              return res.status(200).send({message:'error al guardar el unete'})
          }


        })
      }


    })

}

function obtenerUnete(req, res) {
  Unete.find({}, (err, uneteFinded) => {
      if (err) {
          return res.status(500).send({ message: 'Error en la petición' });
      }
      if (!uneteFinded || uneteFinded.length === 0) {
          return res.status(200).send({ message: 'No se encontraron registros', unete: []});
      }

      // Formatear las fechas en el formato deseado
      const unetesFormateados = uneteFinded.map(unete => ({
          ...unete._doc,
          fechaCreacion: format(new Date(unete.fechaCreacion), 'dd MMMM yyyy'),
          fechaModificacion: format(new Date(unete.fechaModificacion), 'dd MMMM yyyy'),
      }));

      return res.status(200).send({ unete: unetesFormateados });
  });
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
      nuevasFunciones =   req.body.funcion;
  
      // Verificar que nuevasFunciones sea un array válido
    
  
      // Encuentra el Unete por su ID y actualiza las funciones
      Unete.findOneAndUpdate(
        { _id: id },
        { $push: { funciones:  nuevasFunciones  } },
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




   Unete.findById(id,(err,uneteFinded)=>{
    if(err){
      return res.status(404).send({message:'error en la peticion'})
    }else if (uneteFinded){


      if(req.file){

        console.log('con imagen')
        cloudinary.uploader.upload(req.file.path , function(error, result) {
          if(error){
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error"
            })
          }else{
            parametros.imgPath = result.url
            parametros.idPublic = result.public_id

            if(parametros.estado === 'inactivo'){


              console.log('inactivo'	)
              Unete.findByIdAndUpdate(id,{ 
                titulo: parametros.titulo,
                ubicacion: parametros.ubicacion,
                departamento: parametros.departamento,
                empresa: parametros.empresa,
                educacion: parametros.educacion,
                experecia: parametros.experecia,
                enlaceFormualario: parametros.enlaceFormualario,
                imgPath: parametros.imgPath,
                idPublic: parametros.idPublic,
                fechaModificacion: Date.now()
               },{new:true},(err,uneteUpdated)=>{
                if(err){
                  return res.status(404).send({message:'error en la peticion'})
                }else if (uneteUpdated){
                  return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
                }else{
                  return res.status(400).send({message:'error al actualizar el usuario'})
                }
              })

            }else{

              console.log('activo')
              Unete.findByIdAndUpdate(id,{ 
                titulo: parametros.titulo,
                ubicacion: parametros.ubicacion,
                departamento: parametros.departamento,
                empresa: parametros.empresa,
                educacion: parametros.educacion,
                experecia: parametros.experecia,
                enlaceFormualario: parametros.enlaceFormualario,
                imgPath: parametros.imgPath,
                idPublic: parametros.idPublic,
               },{new:true},(err,uneteUpdated)=>{
                if(err){
                  return res.status(404).send({message:'error en la peticion'})
                }else if (uneteUpdated){
                  return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
                }else{
                  return res.status(400).send({message:'error al actualizar el usuario'})
                }
              })
            }

           
          }
        })
      }else{

        if(req.body.estado == 'inactivo'){
          parametros.estado = 'inactivo'
          parametros.fechaModificacion = Date.now()
          console.log('inactivo'	)
        }else{
          parametros.estado = 'activo'
          console.log('activo')
        }
        console.log('sin imgagen')
        Unete.findByIdAndUpdate (id,parametros,{new:true},(err,uneteUpdated)=>{

       


          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }
        }

       )}





    
    }else{
      return res.status(400).send({message:'error al obtener el usuario'})
    }
   })


  }



  function eiliminarPlaza(req,res){
    let id = req.params.id

    Unete.findById(id,(err,uneteFinded)=>{
      if(err){
        return res.status(404).send({message:'error en la peticion'})
      }else if (uneteFinded){
        cloudinary.uploader.destroy(uneteFinded.idPublic, function(error, result) {
          if(error){
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error"
            })
          }else{
            Unete.findByIdAndDelete(id,(err,uneteDeleted)=>{
              if(err){
                return res.status(404).send({message:'error en la peticion'})
              }else if (uneteDeleted){
                console.log(result)
                return res.status(200).send({message:'plazo  eliminado con exito'})
              }else{
                return res.status(400).send({message:'error al eliminar el usuario'})
              }
            })
          }
        })
      }else{
        return res.status(400).send({message:'error al obtener el usuario'})
      }
    
    })





  }



  function obtenerPlazasFiltradas(req, res) {
    const quinceDiasAtras = subDays(new Date(), 15); // Fecha de hace 15 días
    const quinceDiasAtrasISO = quinceDiasAtras.toISOString();

    Unete.find({ visibilidad: 'visible' }, (err, todasLasPlazas) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' });
        }

        if (!todasLasPlazas || todasLasPlazas.length === 0) {
            return res.status(200).send({ message: 'No se encontraron plazas visibles', plazas: [] });
        }

        const plazasFiltradas = todasLasPlazas.filter(plaza => {
            // Si la plaza está inactiva y la fecha de modificación es posterior a quince días atrás, no se incluye
            if (plaza.estado === 'inactivo' && plaza.fechaModificacion <= quinceDiasAtrasISO) {
                return false;
            }
            return true;
        }).map(plaza => ({
            ...plaza._doc,
            fechaCreacion: format(new Date(plaza.fechaCreacion), 'dd MMMM yyyy'),
            fechaModificacion: format(new Date(plaza.fechaModificacion), 'dd MMMM yyyy'),
        }));

        return res.status(200).send({ plazas: plazasFiltradas });
    });
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

function ObtenerPlazaxId(req,res){
  let id = req.params.id

  Unete.findById(id,(err,uneteFinded)=>{
    if(err){
      return res.status(404).send({message:'error en la peticion'})
    }else if (uneteFinded){
      return res.status(200).send({plaza:uneteFinded})
    }else{
      return res.status(400).send({message:'error al obtener el usuario'})
    }
  })

}

function editarEstado (){
  let id = req.params.id
  let parametros = req.body
  let estado = parametros.estado

  Unete.findById(id,(err,uneteFinded)=>{
    if(err){
      return res.status(404).send({message:'error en la peticion'})
    }else if(uneteFinded){
      let estado = uneteFinded.estado

      if(estado == 'activo'){
        Unete.findByIdAndUpdate(id,{estado:estado,  fechaModificacion: Date.now() },{new:true},(err,uneteUpdated)=>{
          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }
        })
      }else{
        Unete.findByIdAndUpdate(id,{estado:estado, fechaModificacion: Date.now()},{new:true},(err,uneteUpdated)=>{
          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }
        })
      }
    }else{
      return res.status(400).send({message:'error al obtener el usuario'})

    }
  })
}

function editarVisibilidad (req,res){
  let id = req.params.id
  let parametros = req.body

  Unete.findById(id,(err,uneteFinded)=>{
    if(err){
      return res.status(404).send({message:'error en la peticion'})
    }else if(uneteFinded){
      let estado = uneteFinded.visibilidad

      if(estado == 'novisible'){
        Unete.findByIdAndUpdate(id,{visibilidad:'visible',  fechaModificacion: Date.now() },{new:true},(err,uneteUpdated)=>{
          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }
        })
      }else{
        Unete.findByIdAndUpdate(id,{visibilidad:'novisible', fechaModificacion: Date.now()},{new:true},(err,uneteUpdated)=>{
          if(err){
            return res.status(404).send({message:'error en la peticion'})
          }else if (uneteUpdated){
            return res.status(200).send({message:'plazo  actualizado con exito',uneteUpdated})
          }else{
            return res.status(400).send({message:'error al actualizar el usuario'})
          }
        })
      }
    }else{
      return res.status(400).send({message:'error al obtener el usuario'})

    }
  })
}



async function eliminarRegistrosInactivos() {
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - 14); // Resta 14 días a la fecha actual

  try {
    const registrosInactivos = await Unete.find({
      estado: 'inactivo',
      fechaModificacion: { $lt: fechaLimite } // Fecha de modificación menor que la fecha límite
    });

    if (registrosInactivos.length > 0) {
      // Eliminar los registros inactivos
      const eliminados = await Unete.deleteMany({
        estado: 'inactivo',
        fechaModificacion: { $lt: fechaLimite }
      });

      console.log(`Se eliminaron ${eliminados.deletedCount} registros inactivos.`);
    } else {
      console.log('No hay registros inactivos que eliminar.');
    }
  } catch (error) {
    console.error('Error al eliminar registros inactivos:', error);
  }
}

function obtenerPlazasActivas(req, res) {
  const quinceDiasAtras = subDays(new Date(), 15); // Fecha de hace 15 días
  const quinceDiasAtrasISO = quinceDiasAtras.toISOString();

  Unete.find({ estado: 'activo' }, (err, plazasActivas) => {
      if (err) {
          return res.status(500).send({ message: 'Error en la petición' });
      }

      if (!plazasActivas || plazasActivas.length === 0) {
          return res.status(200).send({ message: 'No se encontraron plazas activas', plazas: [] });
      }

      const plazasFiltradas = plazasActivas.filter(plaza => {
          // Si la plaza está marcada como visible y su fecha de modificación es posterior a quince días atrás, se incluye
          if (plaza.visibilidad && plaza.fechaModificacion > quinceDiasAtrasISO) {
              return true;
          }
          // Si la plaza no está marcada como visible o su fecha de modificación es anterior a quince días atrás, se excluye
          return false;
      });

      return res.status(200).send({ plazas: plazasFiltradas });
  });
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
    obtenerFuncionesxid,
    ObtenerPlazaxId,editarEstado,
    eliminarRegistrosInactivos,
    obtenerPlazasActivas,
    editarVisibilidad,
    obtenerPlazasFiltradas
}
