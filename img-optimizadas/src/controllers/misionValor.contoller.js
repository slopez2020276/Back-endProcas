const MisionValor = require("../models/misionValor.model")


function crearMisionDefult (){
    MisionValor.find((err,MisionFined)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (MisionFined.length == 0){
            let misionValormodel = new MisionValor()
        

         misionValormodel.textMision = 'Texto Mision'
         misionValormodel.textVIsion = 'texto Vision'
         misionValormodel.save((err,misionSaved)=>{
            if(err){
                return console.log('error en la peticon 2')
            }else if (misionSaved){
              
               return console.log('se crearon las misiones predeterminadas porfavor de la orden de editarlos')
            }
         })



        }else {
            return console.log("se encontraron registros sobre la mision ")
        }
    })


}


function obtenerMision(req,res){
    MisionValor.find({},(err,lineFiended)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(lineFiended){
            return res.status(200).send({Mision:lineFiended})
        }

    })
}

function editarMision(req,res){
    let  idMision = req.params.idMision
    let parametros = req.body
    
    MisionValor.findByIdAndUpdate(idMision,parametros,{new:true},(err,MisionUpdated)=>{
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
    let  idMision = req.params.idNoticia
    MisionValor.findById(idMision,(err,MisionUpdated)=>{
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
    
    MisionValor.findByIdAndDelete(idNotica,(err,noticiaDeleted)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(noticiaDeleted){
            return res.status(200).send({message:'se elimino correctamente'})
        }
    })
}

module.exports = {
    crearMisionDefult,
    editarMision,
    obtenerMision,
    eliminarMision,
    obtenerMisionxID
}