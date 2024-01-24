const Historia = require('../models/historia.model')
const path = require('path')
const fs = require('fs-extra')


function crearHistoraDefult (){
    Historia.find((err,HistoriaFiended)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (HistoriaFiended.length == 0){
            let histriaModel = new Historia()
            histriaModel.EncalceVideo = 'https://www.youtube.com/watch?v=f0hN3s9XvI0'
            histriaModel.DescripcionHistoria = 'Lorem, ipsum dolor sit amet '
            histriaModel.imgPathPrincipal = 'imgsDefult/imgdefult.png'
            histriaModel.imgPathFondo = 'imgsDefult/textura-defult.png'
            histriaModel.save((err,noticia1Saved)=>{
            if(err){
                return console.log('error en la peticon 2')
            }else if (noticia1Saved){
               return console.log('se crearon las noticas predeterminadas porfavor de la orden de editarlos')
            }
         })
        }else {
            return console.log("se encontraron registros sobre las noticias ")
        }
    })


}




async function obtenerHistoria(req,res){
    Historia.find({},(err,historiaFiend)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(historiaFiend){
            return res.status(200).send({historia:historiaFiend})
        }

    })
}

function editarhistoria(req,res){

    let  idHistoria = req.params.idHistoria
    let parametros = req.body
    Historia.findById(idHistoria,(err,historiaSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion 1'})
        }else if (historiaSinEditar){
          if(req.file){
            if(historiaSinEditar.imgPathPrincipal === 'imgsDefult/imgdefult.png'){
                console.log('con image y la ulr SI ES LA DEFULT')
                let {EncalceVideo,DescripcionHistoria, } = parametros
                Historia.findByIdAndUpdate(idHistoria,{EncalceVideo,DescripcionHistoria,imgPathPrincipal:req.file.path },{new:true},(err,historiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (historiaUpdated){
                        return res.status(200).send({lineaUpdated:historiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
                    }
                })
            }else{
                console.log('con imagen y la url de la imgen es NO ES LA DEFULT')
                fs.unlink(path.resolve (historiaSinEditar.imgPathPrincipal))
                let {EncalceVideo,DescripcionHistoria, } = parametros
                Historia.findByIdAndUpdate(idHistoria,{EncalceVideo,DescripcionHistoria,imgPathPrincipal:req.file.path },{new:true},(err,historiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (historiaUpdated){
                        return res.status(200).send({lineaUpdated:historiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
            
                    }
                })
            }
          }else{
            console.log('sin imagen')
            Historia.findByIdAndUpdate(idHistoria,parametros,{new:true},(err,historiaUpdated)=>{
                if(err){
                    return res.status(200).send({messege:'error en la petion'})
                }else if (historiaUpdated){
                    
                    return res.status(200).send({lineaUpdated:historiaUpdated})
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
function EditarFondo(req,res){

    let  idHistoria = req.params.idHistoria
    let parametros = req.body
    Historia.findById(idHistoria,(err,historiaSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion 1'})
        }else if (historiaSinEditar){
          if(req.file){
            if(historiaSinEditar.imgPathFondo === 'textura-defult/imgdefult.png'){
                console.log('con image y la ulr SI ES LA DEFULT')
                let {EncalceVideo,DescripcionHistoria, } = parametros
                Historia.findByIdAndUpdate(idHistoria,{imgPathFondo:req.file.path },{new:true},(err,historiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (historiaUpdated){
                        return res.status(200).send({lineaUpdated:historiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
                    }
                })
            }else{
                console.log('con imagen y la url de la imgen es NO ES LA DEFULT')
                fs.unlink(path.resolve (historiaSinEditar.imgPathFondo))
                let {EncalceVideo,DescripcionHistoria, } = parametros
                Historia.findByIdAndUpdate(idHistoria,{imgPathFondo:req.file.path },{new:true},(err,historiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (historiaUpdated){
                        return res.status(200).send({lineaUpdated:historiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
            
                    }
                })
            }
          }else{
            console.log('sin imagen')
            Historia.findByIdAndUpdate(idHistoria,parametros,{new:true},(err,historiaUpdated)=>{
                if(err){
                    return res.status(200).send({messege:'error en la petion'})
                }else if (historiaUpdated){
                    
                    return res.status(200).send({lineaUpdated:historiaUpdated})
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

function eliminarhistoria(req,res){
    let idHistoria = req.params.idHistoria
    
    Historia.findByIdAndDelete(idHistoria,(err,historiaDeleted)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(historiaDeleted){
            return res.status(200).send({message:'se elimino correctamente'})
        }
    })
}

 function createHistoria(req,res){
    console.log(req.body)
    return res.json({
        message:'photo successfully saved'
    })
}



module.exports ={
    crearHistoraDefult,
    eliminarhistoria,
    obtenerHistoria,
    editarhistoria,
    createHistoria,
    EditarFondo,
}