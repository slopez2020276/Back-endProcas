const Suscribe = require("../models/suscripciones.model")




function agregarSub(req,res){

    let parametros = req.body
    let suscribeModel = new Suscribe()

    suscribeModel.correo = parametros.correo
    suscribeModel.nombre = parametros.nombre
    suscribeModel.apellido = parametros.apellido

    suscribeModel.save((err, subsFiended) => {
        if (err) {
            return res.status(400).send({message:'error en la peticon'})
        } else if (subsFiended) {
            return res.status(200).send({subs:subsFiended})
        }else{
            return res.status(200).send({message:'error al crear la subs'})
        }
    })
}



function obtenerSubs(req,res){
    Suscribe.find({},(err,subsFiended)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(subsFiended){
            return res.status(200).send({subs:subsFiended})
        }

    })
}

function editarNoticias(req,res){
    let  idsubs = req.params.idSubs
    let parametros = req.body
    
    Suscribe.findByIdAndUpdate(idsubs,parametros,{new:true},(err,noticiaFinded)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (noticiaFinded){
            return res.status(200).send({subsFiended:noticiaFinded})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })


}
function buscarNoticasxId(req,res){
    let  idsubs = req.params.idSubs
    
    Suscribe.findById(idsubs,(err,noticiaFinded)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (noticiaFinded){
            return res.status(200).send({subsFiended:noticiaFinded})
            console.log
        }else{
            return res.status(200).send({message:'error al buscar la subsFiended'})

        }
    })


}


function eliminarSub(req,res){
    let idSub = req.params.idSub
    
    Suscribe.findByIdAndDelete(idSub,(err,SubDelete)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(SubDelete){
            return res.status(200).send({message:'se elimino correctamente'})
        }else {
            return res.status(200).send({message:'error al eliminar'})

        }
    })
}

module.exports = {
   
    editarNoticias,
    obtenerSubs,
    eliminarSub,
    buscarNoticasxId,
    agregarSub
}