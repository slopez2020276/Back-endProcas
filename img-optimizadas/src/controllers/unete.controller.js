const Unete = require('../models/uneteEqipo.model');


function CrearEmpleo (req,res){


    UneteModel = new Unete()
    let parametros = req.body

    UneteModel.titulo = parametros.titulo
    UneteModel.ubicacion = parametros.ubicacion
    UneteModel.departamento = parametros.departamento
    UneteModel.empresa = parametros.empresa
    UneteModel.funciones = parametros.funciones
    UneteModel.educacion = parametros.educacion
    UneteModel.experecia = parametros.experecia

    UneteModel.save((err,uneteGuardado)=>{
        if(err){
            return res.status(400).send({message:'error en la peticion'})
        }else if(uneteGuardado){
            return res.status(200).send({unete:uneteGuardado})
        }else{
            return res.status(200).send({message:'error al guardar el unete'})
        }
    })

}

function obtenerUnete(req,res){
    Unete.find({},(err,uneteFinded)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(uneteFinded){
            return res.status(200).send({unete:uneteFinded})
        }else{
            return res.status(200).send({message:'error al obtener el unete'})
        }

    })
}


module.exports = {
    CrearEmpleo,
    obtenerUnete    
}
