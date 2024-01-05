const Valores = require("../models/valores.model")


function crearValoresDefult (){
    Valores.find((err,valoresFiend)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (valoresFiend.length == 0){
            let valoresModel = new Valores()
         valoresModel.Integridad = 'Texto Integirdad'
         valoresModel.Pasion = 'Pasion'
         valoresModel.Innovacion = 'innovacion'
         valoresModel.Orientacion = 'orientacion'
         valoresModel.save((err,valorSaved)=>{
            if(err){
                return console.log('error en la peticon 2')
            }else if (valorSaved){
              
               return console.log('se crearon los valores predeterminados porfavor de la orden de editarlos')
            }
         })
        }else {
            return console.log("se encontraron registros sobre los valores ")
        }
    })


}


function obtenerValores(req,res){
    Valores.find({},(err,valoresFiend)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(valoresFiend){
            return res.status(200).send({valores:valoresFiend})
        }

    })
}

function editarValores(req,res){
    let  idMision = req.params.idMision
    let parametros = req.body
    
    Valores.findByIdAndUpdate(idMision,parametros,{new:true},(err,MisionUpdated)=>{
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
    Valores.findById(idMision,(err,MisionUpdated)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (MisionUpdated){
            return res.status(200).send({lineaUpdated:MisionUpdated})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })
}
function eliminarMision(req,res){
    let idNotica = req.params.idNotica
    
    Valores.findByIdAndDelete(idNotica,(err,noticiaDeleted)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(noticiaDeleted){
            return res.status(200).send({message:'se elimino correctamente'})
        }
    })
}

module.exports = {
    crearValoresDefult,
    editarValores,
    obtenerValores,
    eliminarMision,
    obtenerMisionxID
}