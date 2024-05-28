const express = require('express')
const LineaTimepo = require('../models/lineaTiempo.model')
const Historia = require('../models/historia.model')
const { param } = require('../routes/img.routes')
const path = require('path')
const cloudinary = require("../../libs/cloudinary");


function crearEventosLineaDeTiempoDefult() {
    // Definir los eventos predeterminados
    LineaTimepo.find({}, (err, lineFiended) => {
      if(err){

      }else if (lineFiended.length > 0){

        return console.log("ya se encuentran registrados ")
      }else{

        const eventosPredeterminados = [
          {
              anio: 2021,
              eventos: [{
                  ImgPathLineaTiempo: 'imgsDefult/imgDefult.png',
                  titleLineaTiempo: 'Título del evento 1',
                  subTitleLineaTiempo: 'Subtítulo del evento 1',
                  descriptionLineaTiempo: 'Descripción del evento 1',
                  mostrarPor: 'anio',
                  idPublic: 'idDelEvento1'
              }]
          },
          {
              anio: 2022,
              eventos: [{
                  ImgPathLineaTiempo: 'imgsDefult/imgDefult2.png',
                  titleLineaTiempo: 'Título del evento 2',
                  subTitleLineaTiempo: 'Subtítulo del evento 2',
                  descriptionLineaTiempo: 'Descripción del evento 2',
                  mostrarPor: 'anio',
                  idPublic: 'idDelEvento2'
              }]
          },
          // Puedes agregar más eventos aquí si es necesario
      ];
  
      // Insertar los eventos predeterminados en la base de datos
      LineaTimepo.insertMany(eventosPredeterminados, (err, eventosInsertados) => {
          if (err) {
              console.error('Error al insertar eventos predeterminados:', err);
          } else {
              console.log('Eventos predeterminados insertados correctamente:', eventosInsertados);
          }
      });

      }

    })

    
}




async function agregarEventoAlAnioPorId(req, res) {
  try {
      const anioId  = req.params.idLinea; // ID del año
      const nuevoEvento = req.body; // Nuevo evento a agregar

      // Buscar el año por su ID
      const anioEncontrado = await LineaTimepo.findById(anioId);

      if (!anioEncontrado) {
          return res.status(404).json({ success: false, message: 'El año especificado no fue encontrado.' });
      }

      // Agregar el nuevo evento al año encontrado



      if(req.file){
        
        
        cloudinary.uploader.upload(req.file.path, async function (err, result){
            if(err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Error"
              })
            }
            else{
             
           
          nuevoEvento.ImgPathLineaTiempo = result.url
          nuevoEvento.idPublic = result.public_id
  
          console.log(nuevoEvento)
          anioEncontrado.eventos.push(nuevoEvento);
          const anioActualizado = await anioEncontrado.save();
          let numeroEvento = anioActualizado.eventos.length - 1
          res.status(200).json({ success: true, message: 'Evento agregado correctamente al año.', data: anioActualizado.eventos[numeroEvento] });
            
            }
          })

           


      }else{


        nuevoEvento.ImgPathLineaTiempo = req.body.ImgPathLineaTiempo
         nuevoEvento.idPublic = req.body.idPublic
        nuevoEvento._id = req.body._id

        console.log(nuevoEvento)
        anioEncontrado.eventos.push(nuevoEvento);
        const anioActualizado = await anioEncontrado.save();
        console.log(anioActualizado)

        res.status(200).json({ success: true, message: 'Evento agregado correctamente al año.', data:  anioActualizados });


      }
      
   

      // Guardar los cambios en la base de datos
      

  } catch (error) {
      console.error('Error al agregar evento al año:', error);
      res.status(500).json({ success: false, message: 'Error al agregar evento al año.' });
  }
}


function obtenerFechaFormateada(lineaTiempo) {
    const fecha = lineaTiempo.fecha;
    const mostrarPor = lineaTiempo.mostrarPor;
  
    if (mostrarPor === 'anio') {
      return fecha.getFullYear().toString();
    } else if (mostrarPor === 'anioyMes') {
      const year = fecha.getFullYear().toString();
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    } else if (mostrarPor === 'anioMesDia') {
      const year = fecha.getFullYear().toString();
      const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const day = fecha.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return fecha.toISOString();
    }
  }
  async function obtenerTiempo(req, res) {
    try {
        // Obtener todos los registros de la línea de tiempo y ordenarlos por año de menor a mayor
        const registrosOrdenados = await LineaTimepo.find().sort({ anio: 1 });

        return res.status(200).json({ registros: registrosOrdenados });
    } catch (error) {
        console.error('Error al obtener los registros ordenados:', error);
        return res.status(500).json({ message: 'Error al obtener los registros ordenados' });
    }
}



  
  
/* 
function editarLineaTiempo(req,res){

    

    let  idlinea = req.params.idLinea
    let parametros = req.body
    LineaTimepo.findById(idlinea,(err,lineaSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion 1'})
        }else if (lineaSinEditar){
          if(req.file){
            if(lineaSinEditar.ImgPathLineaTiempo === 'imgsDefult/imgDefult.png'){
                console.log('con image y la ulr SI ES LA DEFULT')
                let {titleLineaTiempo,descriptionLineaTiempo } = parametros
                let   ImgPathLineaTiempo = req.file.path 
                LineaTimepo.findByIdAndUpdate(idlinea,{titleLineaTiempo,descriptionLineaTiempo,ImgPathLineaTiempo:req.file.path },{new:true},(err,lienaUpdeted)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (lienaUpdeted){
                        return res.status(200).send({lineaUpdated:lienaUpdeted})
                    }else{
                        return res.status(200).send({message:'error al editar'})
                    }
                })
            }else{

              cloudinary.uploader.upload(req.file.path, function (err, result){
                if(err) {
                  console.log(err);
                  return res.status(500).json({
                    success: false,
                    message: "Error"
                  })
                }else{
                    let idPublic = result.public_id
                    let {EncalceVideo,DescripcionHistoria, } = parametros
                    LineaTimepo.findByIdAndUpdate(idlinea,{ImgPathLineaTiempo:result.url ,idPublic: idPublic,
                      descriptionLineaTiempo:req.body.descriptionLineaTiempo,mostrarPor:req.body.mostrarPor,
                      titleLineaTiempo:req.body.titleLineaTiempo},{new:true},(err,historiaUpdated)=>{
                        if(err){
                            return res.status(200).send({messege:'error en la petion 2'})
                        }else if (historiaUpdated){

                            const urlImagen = 'jwvlqzz6johnmhndtwy7';

                            // Utiliza el método destroy para eliminar la imagen en Cloudinary
                            cloudinary.uploader.destroy(lineaSinEditar.idPublic, (error, result) => {
                             if (error) {
                            console.error('Error al eliminar la imagen en Cloudinary:', error);
                            } else {
                            console.log('Imagen eliminada correctamente en Cloudinary:', result)
                            return res.status(200).send({lineaUpdated:historiaUpdated});
                            }
                            });
                         }else{
                            return res.status(200).send({message:'error al editar'})
                
                        }
                    })
                }
              })
            }
          }else{
            console.log('sin imagen')
            LineaTimepo.findByIdAndUpdate(idlinea,parametros,{new:true},(err,lienaUpdeted)=>{
                if(err){
                    return res.status(200).send({messege:'error en la petion'})
                }else if (lienaUpdeted){
                    
                    return res.status(200).send({lineaUpdated:lienaUpdeted})
                }else{
                    return res.status(200).send({message:'error al editar'})
                }
            })
          }
        }else{
            return res.status(404).send({message:'la linea de timepo no se encuentra registrada'})
        }
    })
} */





function eliminarLineaTiempo(req,res){

    
    let idLinea = req.params.idLinea
    
    LineaTimepo.findById(idLinea,(err,lineaFiend)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion'})
        }else if(lineaFiend){

            if(lineaFiend.ImgPathLineaTiempo === 'imgsDefult/imgDefult.png'){

                LineaTimepo.findByIdAndDelete(idLinea,(err,eliminarLinea)=>{
                    if(err){
                        return res.status(200).send({message:'error en la peticion'})
                    }else if(eliminarLinea){
                        return res.status(200).send({message:'se elimino correctamente'})
                    }else{
                        console.log(idLinea)
                        return res.status(200).send({message:'error al eliminar'})
                    }
                })

            }else{

              cloudinary.uploader.destroy(lineaFiend.idPublic, (error, result) => {
                if (error) {
               console.error('Error al eliminar la imagen en Cloudinary:', error);
               } else {
               console.log('Imagen eliminada correctamente en Cloudinary:', result)
               LineaTimepo.findByIdAndDelete(idLinea,(err,eliminarLinea)=>{
                if(err){
                    return res.status(200).send({message:'error en la peticion'})
                }else if(eliminarLinea){
                    return res.status(200).send({message:'se elimino correctamente'})
                }else{
                    console.log(idLinea)
                    return res.status(200).send({message:'error al eliminar'})
                }
            })
               }
               });

             
            }

           

        }else{  
            return res.status(404).send({message:'error no se encontro la linea de tiempo'})

        }

    })
  
}
function obtenerLineaTiempoxId(req, res) {
    const idLinea = req.params.idLinea;
    const comunetoId = req.params.idAnio;

    // Buscar el documento principal por su ID
    LineaTimepo.findById(comunetoId, (err, comunetoEncontrado) => {
        if (err) {
            return res.status(400).send({ message: 'Error en la petición' });
        } else if (comunetoEncontrado) {
            // Buscar la línea de tiempo dentro del documento principal por su ID
            const lineaEncontrada = comunetoEncontrado.eventos.find(linea => linea._id.toString() == idLinea);
            if (lineaEncontrada) {
                return res.status(200).send({ linea: lineaEncontrada });
            } else {
                return res.status(404).send({ message: 'No se encontró la línea de tiempo' });
            }
        } else {
            return res.status(404).send({ message: 'No se encontró el documento principal' });
        }
    });
}

 
function helperImg(filepath,filename,sizel = 300,sizeW){
    return sharp(filepath).resize(sizel,sizeW)
    .toFile(`./optimize/${filename}`)
}


async function agregarLineaTiempo(req, res) {
  try {
    let parametros = req.body;
    let lineaTiempo1 = new LineaTimepo();
    let ImgPathLine = req.file.filename;

    lineaTiempo1.titleLineaTiempo = req.body.titleLineaTiempo;

    lineaTiempo1.descriptionLineaTiempo = req.body.descriptionLineaTiempo;
    lineaTiempo1.fecha = req.body.fecha;
    lineaTiempo1.mostrarPor = req.body.mostrarPor;

  
    cloudinary.uploader.upload(req.file.path, function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
      else{
       
      lineaTiempo1.ImgPathLineaTiempo = result.url
      lineaTiempo1.idPublic = result.public_id
      lineaTiempo1.save((err, noticia) => {
          if (err) {
              return res.status(400).send({message:'error en la peticon'})
          } else if (noticia) {
              return res.status(200).send({noticia:noticia})
          }else{
              return res.status(200).send({message:'error al crear la noticia'})
          }
      })
      }
    })

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error al procesar la imagen o al crear la noticia' });
  }
}

async function CrearAnio(req, res) {
  try {
      const { anio } = req.body; // Año a crear

      // Verificar si el año ya existe
      const anioExistente = await LineaTimepo.findOne({ anio });

      if (anioExistente) {
          return res.status(400).json({ success: false, message: 'El año ya existe en la línea de tiempo.' });
      }

      // Crear un nuevo objeto de año
      const nuevoAnio = new LineaTimepo();
      nuevoAnio.anio = req.body.anio;
      nuevoAnio._id = req.body._id;
      // Guardar el nuevo año en la base de datos
      await nuevoAnio.save();

      return res.status(200).json({ success: true, message: 'Año creado exitosamente.', data: nuevoAnio });
  } catch (error) {
      console.error('Error al crear el año:', error);
      return res.status(500).json({ success: false, message: 'Error al crear el año.' });
  }
}

async function EliminarAnio(req,res){
    const anioId = req.params.idAnio;
    const lineaTiempo = await LineaTimepo.findById(anioId);

    if(lineaTiempo){
        LineaTimepo.findByIdAndDelete(anioId,(err,eliminarAnio)=>{
            if(err){
                return res.status(404).send({message:'error en la peticion'})
            }else if(eliminarAnio){
                return res.status(200).send({message:'se elimino correctamente'})
            }else{
                return res.status(404).send({message:'error al eliminar'})
            }
        })
    }else{
        return res.status(404).send({message:'no se encontro el anio'})
    
    }

}


async function ediatarAnio(req,res){
    const anioId = req.params.idAnio;
    const parametros = req.body;
    let anios = parametros.anio

    LineaTimepo.findById(anioId,(err,anioSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion'})
        }else if(anioSinEditar){
            LineaTimepo.findByIdAndUpdate(anioId,{anio:anios},{new:true},(err,anioUpdeted)=>{
                if(err){
                    return res.status(404).send({message:'error en la peticion'})
                }else if(anioUpdeted){
                    return res.status(200).send({anioUpdeted})
                }else{
                    return res.status(404).send({message:'error al editar'})
                }
            })
        }else{
            return res.status(404).send({message:'no se encontro el anio'})
        }
    })

}

async function editarEvento(req, res) {
  const eventoId = req.params.eventoId;
  const lineaId = req.params.idLinea;
  const parametrosEvento = req.body;

  try {
      // Buscar la línea de tiempo por su ID
      const lineaTiempo = await LineaTimepo.findById(lineaId);
      if (!lineaTiempo) {
          return res.status(404).send({ message: 'La línea de tiempo no se encuentra registrada jkhkjhkhhy' });
      }

      console.log(eventoId  )

      // Buscar el evento dentro de la línea de tiempo por su ID
      const eventoExistente = lineaTiempo.eventos.find(evento => evento._id.toString() === eventoId);
      if (!eventoExistente) {
          return res.status(404).send({ message: 'El evento no se encuentra registrado en esta línea de tiempo' });
      }

      if(eventoExistente.idPublic === 'NULL'){

        const result = await cloudinary.uploader.upload(req.file.path);
        parametrosEvento.ImgPathLineaTiempo = result.url;
        parametrosEvento.idPublic = result.public_id;
      }else{

        // Si se envía una nueva imagen, eliminar la anterior de Cloudinary
         if (req.file) {
         // Eliminar la imagen   anterior de Cloudinary
         await cloudinary.uploader.destroy(eventoExistente.idPublic);
         // Subir la nueva imagen a Cloudinary
         const result = await cloudinary.uploader.upload(req.file.path);
              parametrosEvento.ImgPathLineaTiempo = result.url;
             parametrosEvento.idPublic = result.public_id;
}

      }
      // Actualizar las propiedades del evento
      Object.assign(eventoExistente, parametrosEvento);

      // Guardar los cambios en la línea de tiempo
      const lineaActualizada = await lineaTiempo.save();

      return res.status(200).send({ message: 'Evento actualizado exitosamente', data:parametrosEvento });
  } catch (error) {
      console.error('Error al editar el evento:', error);
      return res.status(500).send({ message: 'Error al editar el evento' });
  }
}

async function eliminarEvento(req, res) {
  const eventoId = req.params.eventoId;
  const lineaId = req.params.idLinea;

  try {
      // Buscar la línea de tiempo por su ID
      const lineaTiempo = await LineaTimepo.findById(lineaId);
      if (!lineaTiempo) {
          return res.status(404).send({ message: 'La línea de tiempo no se encuentra registrada' });
      }

      // Buscar el índice del evento dentro de la línea de tiempo por su ID
      const indiceEvento = lineaTiempo.eventos.findIndex(evento => evento._id.toString() === eventoId);
      if (indiceEvento === -1) {
          return res.status(404).send({ message: 'El evento no se encuentra registrado en esta línea de tiempo' });
      }

      // Obtener el evento a eliminar
      const eventoAEliminar = lineaTiempo.eventos[indiceEvento];

      // Eliminar la imagen del evento de Cloudinary
      await cloudinary.uploader.destroy(eventoAEliminar.idPublic);

      // Eliminar el evento del array de eventos en la línea de tiempo
      lineaTiempo.eventos.splice(indiceEvento, 1);

      // Guardar los cambios en la línea de tiempo
      const lineaActualizada = await lineaTiempo.save();

      return res.status(200).send({ message: 'Evento eliminado exitosamente', lineaActualizada });
  } catch (error) {
      console.error('Error al eliminar el evento:', error);
      return res.status(500).send({ message: 'Error al eliminar el evento' });
  }
}


function obtenerLineaTiempoxId(req, res) {
    const idLinea = req.params.eventoId;
    const comunetoId = req.params.idLinea;

    // Buscar el documento principal por su ID
    LineaTimepo.findById(comunetoId, (err, comunetoEncontrado) => {
        if (err) {
            return res.status(400).send({ message: 'Error en la petición' });
        } else if (comunetoEncontrado) {
            // Buscar la línea de tiempo dentro del documento principal por su ID
            const lineaEncontrada = comunetoEncontrado.eventos.find(evento => evento._id.toString() === idLinea);
            if (lineaEncontrada) {
                return res.status(200).send({ linea: lineaEncontrada });
            } else {
                return res.status(404).send({ message: 'No se encontró la línea de tiempo' });
            }
        } else {
            return res.status(404).send({ message: 'No se encontró el documento principal' });
        }
    });
}






module.exports = {
    crearEventosLineaDeTiempoDefult,
    obtenerTiempo,
  
    eliminarLineaTiempo,
    obtenerLineaTiempoxId,
    agregarLineaTiempo,
    agregarEventoAlAnioPorId,
    CrearAnio,
    editarEvento,eliminarEvento,EliminarAnio,ediatarAnio
}

