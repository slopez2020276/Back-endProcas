const Noticas = require("../models/noticias.model")


function crearNocitiasDefult (req,res){

    

    Noticas.find((err,NoticiasFiend)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (NoticiasFiend.length == 0){
            let noticia1 = new Noticas()
            let noticia2 = new Noticas()
            let noticia3 = new Noticas()

         noticia1.titulo = 'Titulo noticia 1'
         noticia1.imgPhat = 'url img'
         noticia1.descripcion = 'descripcion 1'


         noticia2.titulo = 'Titulo evento 2'
         noticia2.imgPhat = 'url de la imgen'
         noticia2.descripcion = 'descripcion 2'

         
         noticia3.titulo = 'Titulo de la noticia 3'
         noticia3.imgPhat = 'url de la img'
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

    noticiasmodel.titulo = parametros.titulo
    noticiasmodel.imgPhat = parametros.imgPhat
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
    let idNotica = req.params.idNotica
    
    LineaTimepo.findByIdAndDelete(idNotica,(err,noticiaDeleted)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(noticiaDeleted){
            return res.status(200).send({message:'se elimino correctamente'})
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