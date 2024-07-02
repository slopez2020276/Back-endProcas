const Departametos = require("../models/departamentos.model");


function crearDepartameto (req,res){
let DepartametosModel = new Departametos();
let params = req.body;
DepartametosModel.nombre = params.nombre;
DepartametosModel.jefeId = params.jefeId;
DepartametosModel.save((err,DepartametosGuardado)=>{
    if(err){
        return res.status(500).send({message:'error en la peticion'})
    }else if(DepartametosGuardado){
        return res.status(200).send({data:DepartametosGuardado})
    }else{
        return res.status(404).send({message:'no se pudo guardar'})
    }
})
}

function obtenerDepartametos(req,res){
Departametos.find((err,DepartametosFinded)=>{
    if(err){
        return res.status(500).send({message:'error en la peticion'})
    }else if(DepartametosFinded){
        return res.status(200).send({data:DepartametosFinded})
    }else{
        return res.status(404).send({message:'no se encontro la solicitud'})
    }
})
}

function obtenerDepartametoxId(req,res){
let idDepartamento = req.params.id;
Departametos.findById(idDepartamento,(err,DepartametosFinded)=>{
    if(err){
        return res.status(500).send({message:'error en la peticion'})
    }else if(DepartametosFinded){
        return res.status(200).send({data:DepartametosFinded})
    }else{
        return res.status(404).send({message:'no se encontro la solicitud'})
    }
})
}

function actualizarDepartameto(req,res){
let idDepartamento = req.params.id;
let update = req.body;a
Departametos.findByIdAndUpdate(idDepartamento,update,{new:true},(err,DepartametosUpdated)=>{
    if(err){
        return res.status(500).send({message:'error en la peticion'})
    }else if(DepartametosUpdated){
        return res.status(200).send({data:DepartametosUpdated})
    }else{
        return res.status(404).send({message:'no se pudo actualizar'})
    }
})
}

function eliminarDepartameto(req,res){
let idDepartamento = req.params.id;
Departametos.findByIdAndDelete(idDepartamento,(err,DepartametosDeleted)=>{
    if(err){
        return res.status(500).send({message:'error en la peticion'})
    }else if(DepartametosDeleted){
        return res.status(200).send({data:DepartametosDeleted})
    }else{
        return res.status(404).send({message:'no se pudo eliminar'})
    }
})
}

function aregarJefe(req,res){
    let idDepartamento = req.params.id;
    let update = req.body;

    Departametos.findByIdAndUpdate(idDepartamento,update,{new:true},(err,DepartametosUpdated)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(DepartametosUpdated){
            return res.status(200).send({data:DepartametosUpdated})
        }else{
            return res.status(404).send({message:'no se pudo actualizar'})
        }
    })
}

module.exports = { 
    crearDepartameto,
    obtenerDepartametos,
    obtenerDepartametoxId,
    actualizarDepartameto,
    eliminarDepartameto,
    aregarJefe
}