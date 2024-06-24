const SoliVacaciones = require("../models/SoliVacaciones")


function crearSoliVacaciones(req,res){
    let SoliVacacionesModel = new SoliVacaciones();
    let params = req.body;
    let user = req.user.sub;
    SoliVacacionesModel.nombre = req.user.nombre;
    SoliVacacionesModel.departamento = req.user.departamento;
    SoliVacacionesModel.Usuario = user;
    SoliVacacionesModel.fechaInicio = params.fechaInicio;
    SoliVacacionesModel.fechaFin = params.fechaFin;
    SoliVacacionesModel.save((err,SoliVacacionesGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(SoliVacacionesGuardado){
            return res.status(200).send({SoliVacacionesGuardado})
        }else{
            return res.status(404).send({message:'no se pudo guardar'})
        }
    })
}



module.exports = {
    crearSoliVacaciones
}

