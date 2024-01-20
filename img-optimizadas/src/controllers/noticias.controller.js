const Noticas = require("../models/noticias.model")
const path = require('path')
const fs = require('fs-extra')


function crearNocitiasDefult (req,res){

    

    Noticas.find((err,NoticiasFiend)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (NoticiasFiend.length == 0){
            let noticia1 = new Noticas()
            let noticia2 = new Noticas()
            let noticia3 = new Noticas()

         noticia1.titulo = 'Titulo noticia 1'
         noticia1.imgPhat = 'imgsDefult/imgdefult.png'
         noticia1.descripcion = 'descripcion 1'


         noticia2.titulo = 'Titulo evento 2'
         noticia2.imgPhat = 'imgsDefult/imgdefult.png'
         noticia2.descripcion = 'descripcion 2'

         
         noticia3.titulo = 'Titulo de la noticia 3'
         noticia3.imgPhat = 'imgsDefult/imgdefult.png'
         noticia3.descripcion = 'descripcion 3'

         noticia1.save((err,noticia1Saved)=>{
            if(err){
                return console.log('error en la peticon 2')
            }else if (noticia1Saved){
                noticia2.save()
                noticia3.save()
               return console.log('se crearon las noticas predeterminadas porfavor de la orden de editarlos')
            }
         })



        }else {
            return console.log("se encontraron registros sobre las noticias ")
        }
    })


}


function agregarNoticias(req,res){

    let parametros = req.body
    let noticiasmodel = new Noticas()
    let imgPatha = req.file.path
    noticiasmodel.titulo = parametros.titulo
    noticiasmodel.imgPhat = imgPatha
    noticiasmodel.descripcion = parametros.descripcion

    noticiasmodel.save((err, noticia) => {
        if (err) {
            return res.status(400).send({message:'error en la peticon'})
        } else if (noticia) {
            return res.status(200).send({noticia:noticia})
        }else{
            return res.status(200).send({message:'error al crear la noticia'})
        }
    })
}



function obtenerNoticias(req,res){
    Noticas.find({},(err,lineFiended)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(lineFiended){
            return res.status(200).send({noticas:lineFiended})
        }

    })
}

function editarNoticias(req,res){
    let  idNocicia = req.params.idNoticia
    let parametros = req.body
    
    Noticas.findByIdAndUpdate(idNocicia,parametros,{new:true},(err,noticiaFinded)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (noticiaFinded){
            return res.status(200).send({noticia:noticiaFinded})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })


}
function buscarNoticasxId(req,res){
    let  idNocicia = req.params.idNoticia
    
    Noticas.findById(idNocicia,(err,noticiaFinded)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (noticiaFinded){
            return res.status(200).send({noticia:noticiaFinded})
            console.log
        }else{
            return res.status(200).send({message:'error al buscar la noticia'})

        }
    })
}


function eliminarNoticias(req,res){
    let idNoticia = req.params.idNoticia
    
    Noticas.findByIdAndDelete(idNoticia,(err,eliminarLinea)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(eliminarLinea){
            fs.unlink(path.resolve (eliminarLinea.ImgPathLineaTiempo))

            
            return res.status(200).send({message:'se elimino correctamente'})
        }else{
            console.log(idNoticia)
            return res.status(200).send({message:'error al eliminar'})
        }
    })
}

module.exports = {
    crearNocitiasDefult,
    editarNoticias,
    obtenerNoticias,
    eliminarNoticias,
    buscarNoticasxId,
    agregarNoticias
}