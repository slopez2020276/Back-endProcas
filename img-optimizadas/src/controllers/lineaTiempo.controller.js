const e = require('express')
const LineaTimepo = require('../models/lineaTiempo.model')
const { param } = require('../routes/img.routes')
const path = require('path')
const fs = require('fs-extra')

function crearEventosLineaDeTiempoDefult() {


    LineaTimepo.find((err, eventosLineaTiempoFiend) => {
        if (err) {
            return res.status(500).send({ "message": "error en la petion1" })

        } else if (eventosLineaTiempoFiend.length == 0) {
            let lineaTiempo1 = new LineaTimepo()
            let lineaTiempo2 = new LineaTimepo()
            let lineaTiempo3 = new LineaTimepo()

            lineaTiempo1.titleLineaTiempo = 'Titulo evento 1'
            lineaTiempo1.ImgPathLineaTiempo = 'url de la imgen evento 1'
            lineaTiempo1.descriptionLineaTiempo = 'descripcion evento 1'


            lineaTiempo2.titleLineaTiempo = 'Titulo evento 2'
            lineaTiempo2.ImgPathLineaTiempo = 'url de la imgen evento 2'
            lineaTiempo2.descriptionLineaTiempo = 'descripcion evento 2'


            lineaTiempo3.titleLineaTiempo = 'Titulo evento 3'
            lineaTiempo3.ImgPathLineaTiempo = 'url de la imgen evento 3'
            lineaTiempo3.descriptionLineaTiempo = 'descripcion evento 3'

            lineaTiempo1.save((err, noticia) => {
                if (err) {
                    return console.log('error en la peticon')
                } else if (noticia) {
                    lineaTiempo2.save()
                    lineaTiempo3.save()
                    return console.log('se crearon los eventos de predetermindos porfavor de la orden de editarlos')
                }
            })



        } else {
            return console.log("se encontraron registros sobre eventos en la linea de tiempo")
        }
    })


}

function obtenerTiempo(req,res){
    LineaTimepo.find({},(err,lineFiended)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(lineFiended){
            return res.status(200).send({lineFiended})
        }

    })
}

function editarLineaTiempo(req,res){
    let  idlinea = req.params.idLinea
    let parametros = req.body
    
    LineaTimepo.findByIdAndUpdate(idlinea,parametros,{new:true},(err,lienaUpdeted)=>{
        if(err){
            return res.status(200).send({messege:'error en la petion'})
        }else if (lienaUpdeted){
            return res.status(200).send({lineaUpdated:lienaUpdeted})
        }else{
            return res.status(200).send({message:'error al editar'})

        }
    })


}

function eliminarLineaTiempo(req,res){
    let idLinea = req.params.idLinea
    
    LineaTimepo.findByIdAndDelete(idLinea,(err,eliminarLinea)=>{
        if(err){
            return res.status(200).send({message:'error en la peticion'})
        }else if(eliminarLinea){
            fs.unlink(path.resolve (eliminarLinea.ImgPathLineaTiempo))

            
            return res.status(200).send({message:'se elimino correctamente'})
        }else{
            console.log(idLinea)
            return res.status(200).send({message:'error al eliminar'})
        }
    })
}

function obtenerLineaTiempoxId(req,res){

    let idLinea = req.params.idLinea

    LineaTimepo.findById(idLinea,(err,lineaFiend)=>{
        if(err){return res.status(400).send({mesagge:'error en la peticion'})
        }else if(lineaFiend){
            return res.status(200).send({lineaFiend:lineaFiend})
        }else{
            return res.status(400).send({messaga:'error al obtener la linea de tiempo'})
        }
    })

}
 
async function agregarLineaTiempo(req,res){

    	    let parametros = req.body
            let lineaTiempo1 = new LineaTimepo()
            let ImgPathLine = req.file.path 
        
            lineaTiempo1.titleLineaTiempo = req.body.titleLineaTiempo
            lineaTiempo1.ImgPathLineaTiempo = ImgPathLine 
            lineaTiempo1.descriptionLineaTiempo = req.body.descriptionLineaTiempo

            await lineaTiempo1.save((err, noticia) => {
                if (err) {
                    return res.status(400).send({message:'error en la peticon'})
                } else if (noticia) {
                    return res.status(200).send({noticia:noticia})
                }else{
                    return res.status(200).send({message:'error al crear la noticia'})
                }
            })
}

module.exports = {
    crearEventosLineaDeTiempoDefult,
    obtenerTiempo,
    editarLineaTiempo,
    eliminarLineaTiempo,
    obtenerLineaTiempoxId,
    agregarLineaTiempo
}

