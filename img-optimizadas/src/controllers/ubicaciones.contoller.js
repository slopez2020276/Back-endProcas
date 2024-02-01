const Ubicaciones = require("../models/ubicaciaones.model")


function crearUbidefult (){
    Ubicaciones.find((err,ubicaciaonesFiend)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (ubicaciaonesFiend.length == 0){
            let UbiModel = new Ubicaciones()
         UbiModel.tipoTienda = 'Tienda Pruea'
         UbiModel.nombreTienda = 'Tienda desde la base'
         UbiModel.codenadasLng = -90.528741
         UbiModel.codenadaslat = 14.603684
         UbiModel.descripcion = 'descripcion desde la base'
         UbiModel.imgPath = 'imgpath'
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

function obtenerUbicacionProcas(req,res){

    Ubicaciones.find({tipoTienda:'procasa'},(err,ubicaciaonesFiend)=>{

        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubi:ubicaciaonesFiend})

        }else{
            return res.status(400).send({message:'No se encontraron Ubicaciones en Procasa'})
        }
    })



}

function ObtnerMeatHose(req,res){
    Ubicaciones.find({tipoTienda:'meatHouse'},(err,ubicaciaonesFiend)=>{

        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(ubicaciaonesFiend){
            return res.status(200).send({ubi:ubicaciaonesFiend})

        }else{
            return res.status(400).send({message:'No se encontraron Ubicaciones en meatHouse'})
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
            return res.status(200).send({lineaUpdated:MisionUpdated})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })


}
function obtenerMisionxID(req,res){
    let  idMision = req.params.idNoticia
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
    let imgPathRelative = req.file.path

    UbiModel.tipoTienda = parametros.tipoTienda
    UbiModel.nombreTienda = parametros.nombreTienda
    UbiModel.codenadasLng = parametros.codenadasLng
    UbiModel.codenadaslat = parametros.codenadaslat
    UbiModel.descripcion = parametros.descripcion
    UbiModel.imgPath = imgPathRelative
    UbiModel.save((err, ubiSaved) => {
        if (err) {
            return res.status(400).send({message:'error en la peticon'})
        } else if (ubiSaved) {
            return res.status(200).send({Ubi:ubiSaved})
        }else{
            return res.status(200).send({message:'error al crear al crear la ubicacion'})
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
function eliminarMision(req,res){
    let idUbicacion = req.params.idUbicacion
    
    Ubicaciones.findByIdAndDelete(idUbicacion,(err,noticiaDeleted)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(noticiaDeleted){
            return res.status(200).send({message:'se elimino correctamente'})
        }
    })
}

module.exports = {
    crearUbidefult,
    editarubi,
    obtnerUbiAll,
    eliminarMision,
    obtenerMisionxID,
    agregarUbicacion,
    ObtnerMeatHose,
    obtenerUbicacionProcas,
    ObtnerUbicacionxID
}