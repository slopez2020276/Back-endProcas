const Ubicaciones = require("../models/ubicaciaones.model")
const path = require('path')
const cloudinary = require("../../libs/cloudinary");


function crearUbidefult (){
    Ubicaciones.find((err,ubicaciaonesFiend)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (ubicaciaonesFiend.length == 0){
            let UbiModel = new Ubicaciones()
         UbiModel.tipoTienda = 'procasa'
         UbiModel.nombreTienda = 'Tienda desde la base'
         UbiModel.direccion = 'direccion defult'
         UbiModel.telefono = 'telefono defult '
         UbiModel.horario = 'horario defult'
         UbiModel.descripcion = 'descripcion desde la base'
         UbiModel.imgPath = 'imgpath'
         UbiModel.enlaceMaps = '#'
         UbiModel.enlaceWaze = '#'
         UbiModel.whatsapp = '12345678'

         UbiModel.save((err,valorSaved)=>{
            if(err){
                return console.log('error en la peticon 2')
            }else if (valorSaved){
              
               return console.log('se crearon los ubi predeterminados porfavor de la orden de editarlos')
            }
         })
        }else {
            return console.log("se encontraron registros sobre los ubi ")
        }
    })
}


function obtnerUbiAll(req,res){
    Ubicaciones.find({},(err,ubicaciaonesFiend)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubi:ubicaciaonesFiend})
        }else{
            return res.status(200).send({ubi:'error al obtner la ubicacion'})
        }

    })
}

async function obtnerUbiAllForUnete(req, res) {
    try {
        const ubicacionesFiend = await Ubicaciones.find({});
        if (!ubicacionesFiend) {
            return res.status(404).send({ message: 'No se encontraron ubicaciones' });
        }

        // Obtener solo los nombres de las ubicaciones
        const nombresUbicaciones = ubicacionesFiend.map((ubicacion) => ubicacion.nombreTienda);

        // Agregar el nombre "Sígnala" al final de la lista de nombres
        nombresUbicaciones.push('Siquinala');
        nombresUbicaciones.push('Zona 5 Plaza Asunción');
        nombresUbicaciones.push('Zona 15 Vista Hermosa');
        nombresUbicaciones.push('Zona 16 Pulte');
        nombresUbicaciones.push('Zona 16 Santa Amelia');

        return res.status(200).send({ nombres: nombresUbicaciones });
    } catch (error) {
        console.error('Error en la petición:', error);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}




function obtenerUbicacionProcas(req,res){

    Ubicaciones.find({tipoTienda:'procasa'},(err,ubicaciaonesFiend)=>{

        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubicaciones:ubicaciaonesFiend})

        }else{
            return res.status(400).send({message:'No se encontraron Ubicaciones en Procasa'})
        }
    })



}

function ObtnerMeatHose(req,res){
    Ubicaciones.find({tipoTienda:'meathouse'},(err,ubicaciaonesFiend)=>{

        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubi:ubicaciaonesFiend})
        }else{
            return res.status(400).send({message:'No se encontraron Ubicaciones en meatHouse'})
        }
    })
}
function editarUbicaciones(req,res){

    
    let  idUbicacion = req.params.idUbicacion
    let parametros = req.body
    Ubicaciones.findById(idUbicacion,(err,UbicacionSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion 1'})
        }else if (UbicacionSinEditar){





          if(req.file){
            if(UbicacionSinEditar.imgPath === 'imgsDefult/imgDefult.png'){
                console.log('con image y la ulr SI ES LA DEFULT')
                let {nombre } = parametros
                Ubicaciones.findByIdAndUpdate(idUbicacion,{
                    
                    nombreTienda:req.body.nombreTienda,
                  
                    tipoTienda:req.body.tipoTienda,
                    descripcion:req.body.descripcion,
                    imgPath:req.body.imgPath,
                    whatsapp:req.body.whatsapp,
                 },{new:true},(err,NoticiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (NoticiaUpdated){
                        return res.status(200).send({data:NoticiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
                    }
                })
            }else{
                console.log('con imagen y la url de la imgen es NO ES LA DEFULT')
                let {nombre } = parametros
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
                        Ubicaciones.findByIdAndUpdate(idUbicacion,{imgPath:result.url ,idPublic: idPublic,
                           direccion:req.body.direccion,
                            telefono:req.body.telefono,
                            enlaceMaps:req.body.enlaceMaps,
                            enlaceWaze:req.body.enlaceWaze,
                            horario:req.body.horario,
                            nombreTienda:req.body.nombreTienda,
                            tipoTienda:req.body.tipoTienda,
                            descripcion:req.body.descripcion,
                            whatsapp:req.body.whatsapp,
                        },{new:true},(err,historiaUpdated)=>{
                            if(err){
                                return res.status(200).send({messege:'error en la petion 2'})
                            }else if (historiaUpdated){
    
                                const urlImagen = 'jwvlqzz6johnmhndtwy7';
    
                                // Utiliza el método destroy para eliminar la imagen en Cloudinary
                                cloudinary.uploader.destroy(UbicacionSinEditar.idPublic, (error, result) => {
                                 if (error) {
                                console.error('Error al eliminar la imagen en Cloudinary:', error);
                                } else {
                                console.log('Imagen eliminada correctamente en Cloudinary:', result)
                                return res.status(200).send({data:historiaUpdated});
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
            Ubicaciones.findByIdAndUpdate(idUbicacion,parametros,{new:true},(err,NoticiaUpdated)=>{
                if(err){
                    return res.status(200).send({messege:'error en la petion'})
                }else if (NoticiaUpdated){
                    
                    return res.status(200).send({data:NoticiaUpdated})
                }else{
                    return res.status(200).send({message:'error al editar'})
                }
            })
          }
        }else{
            return res.status(404).send({message:'la linea de timepo no se encuentra registrada'})
        }
    })

}

function editarubi(req,res){
    let  idMision = req.params.idMision
    let parametros = req.body


    
    Ubicaciones.findByIdAndUpdate(idMision,parametros,{new:true},(err,MisionUpdated)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (MisionUpdated){
            return res.status(200).send({data:MisionUpdated})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })


}
function obtenerMisionxID(req,res){
    let  idMision = req.params.idUbicacion
    Ubicaciones.findById(idMision,(err,MisionUpdated)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (MisionUpdated){
            return res.status(200).send({lineaUpdated:MisionUpdated})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })
}

function agregarUbicacion(req,res){

    let parametros = req.body
    let UbiModel = new Ubicaciones()

    UbiModel.tipoTienda = parametros.tipoTienda
    UbiModel.direccion = parametros.direccion
    UbiModel.telefono = parametros.telefono
    UbiModel.nombreTienda = parametros.nombreTienda
    UbiModel.descripcion = parametros.descripcion
    UbiModel.enlaceMaps = parametros.enlaceMaps
    UbiModel.enlaceWaze = parametros.enlaceWaze
    UbiModel.horario = parametros.horario
    UbiModel.whatsapp = parametros.whatsapp
 

    cloudinary.uploader.upload(req.file.path, function (err, result){
        if(err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error"
          })
        }
        else{
          UbiModel.imgPath = result.url
          UbiModel.idPublic = result.public_id

          console.log(parametros)
          UbiModel.save((err,valorSaved)=>{
            if(err){
                return res.status(500).send({message:'error en la peticion 2 asdfas'})
            }else if (valorSaved){
                return res.status(200).send({message:'se guardo correctamente',data : valorSaved})
            }else {
                return res.status(200).send({message:'error al guardar'})
            }
         })
        }
    })
}


function ObtnerUbicacionxID(req, res){
    let idUbicacion = req.params.idUbicacion
    
    Ubicaciones.findById(idUbicacion,(err,ubicaciaonesFiend)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubi:ubicaciaonesFiend})
        }else{
            return res.status(200).send({message:'error al obtener la ubcacion'})
        }
    })
}
function eliminarUbi(req,res){
    let idUbicacion = req.params.idUbicacion
    
    Ubicaciones.findById(idUbicacion,(err,ubicacionFinded)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(ubicacionFinded){

            cloudinary.uploader.destroy(ubicacionFinded.idPublic, (error, result) => {
                if (error) {
               console.error('Error al eliminar la imagen en Cloudinary:', error);
               } else {
               console.log('Imagen eliminada correctamente en Cloudinary:', result)
               Ubicaciones.findByIdAndDelete(idUbicacion,(err,eliminarLinea)=>{
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


        }else{
            return res.status(200).send({message:'error al obtener la ubcacion'})
        }
    })

}


async function obtenerUbicacionesProcasa(req, res) {
    try {
        const ubicacionesProcasa = await Ubicaciones.find({ tipoTienda: "procasa" });
        res.status(200).send({ ubicaciones: ubicacionesProcasa });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}

async function obtenerUbicacionesProcasacdd(req, res) {
    try {
        const ubicacionesProcasa = await Ubicaciones.find({ tipoTienda: "procasacdd" });
        res.status(200).send({ ubicaciones: ubicacionesProcasa });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}


async function obtenerUbicacionesmtgr(req, res) {
    try {
        const ubicacionesProcasa = await Ubicaciones.find({ tipoTienda: "mtgr" });
        res.status(200).send({ ubicaciones: ubicacionesProcasa });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}
async function obtenerUbicacionesmtCarniceria(req, res) {
    try {
        const ubicacionesProcasa = await Ubicaciones.find({ tipoTienda: "mtCarniceria" });
        res.status(200).send({ ubicaciones: ubicacionesProcasa });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}
async function obtenerUbicacionesecono(req, res) {
    try {
        const ubicacionesProcasa = await Ubicaciones.find({ tipoTienda: "econo" });
        res.status(200).send({ ubicaciones: ubicacionesProcasa });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}


module.exports = {
    crearUbidefult,
    editarubi,
    obtnerUbiAll,
    eliminarUbi,
    obtenerMisionxID,
    agregarUbicacion,
    ObtnerMeatHose,
    obtenerUbicacionProcas,
    ObtnerUbicacionxID,
    editarUbicaciones,

    obtnerUbiAllForUnete,
    obtenerUbicacionesProcasa,
    obtenerUbicacionesProcasacdd,
    obtenerUbicacionesmtgr,
    obtenerUbicacionesmtCarniceria,
    obtenerUbicacionesecono
}