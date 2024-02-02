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

         noticia1.title = 'title noticia 1'
         noticia1.imgPhat = 'imgsDefult/imgDefult.png'
         noticia1.descripcion = 'descripcion 1'
         noticia1.tipo = 'principal'


         noticia2.title = 'title evento 2'
         noticia2.imgPhat = 'imgsDefult/imgDefult.png'
         noticia2.descripcion = 'descripcion 2'
         noticia2.tipo = 'principal'
         
         noticia3.title = 'title de la noticia 3'
         noticia3.imgPhat = 'imgsDefult/imgDefult.png'
         noticia3.descripcion = 'descripcion 3'
         noticia3.tipo = 'principal'

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
    noticiasmodel.title = parametros.title
    noticiasmodel.imgPhat = imgPatha
    noticiasmodel.descripcion = parametros.descripcion
    noticiasmodel.tipo = parametros.tipo

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



async function obtenerNoticias(req, res) {
    const tipoPrincipal = 'principal';

    try {
        // Consulta para obtener las noticias principales
        const noticiasPrincipales = await Noticas.find({ tipo: tipoPrincipal })
            .sort({ fecha: -1 })  // Ordenar por fecha de forma descendente
            .limit(6);  // Limitar el número de resultados a 6

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Calcular la diferencia en tiempo para cada noticia principal
        const noticiasPrincipalesConDiferencia = noticiasPrincipales.map((noticia) => {
            const diferenciaEnMilisegundos = fechaActual - noticia.fecha;
            let diferenciaTexto;

            if (diferenciaEnMilisegundos >= 24 * 60 * 60 * 1000) {
                const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (24 * 60 * 60 * 1000));
                diferenciaTexto = `${diferenciaEnDias} día${diferenciaEnDias !== 1 ? 's' : ''}`;
            } else if (diferenciaEnMilisegundos >= 60 * 60 * 1000) {
                const diferenciaEnHoras = Math.floor(diferenciaEnMilisegundos / (60 * 60 * 1000));
                diferenciaTexto = `${diferenciaEnHoras} hora${diferenciaEnHoras !== 1 ? 's' : ''}`;
            } else if (diferenciaEnMilisegundos >= 60 * 1000) {
                const diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / (60 * 1000));
                diferenciaTexto = `${diferenciaEnMinutos} minuto${diferenciaEnMinutos !== 1 ? 's' : ''}`;
            } else {
                const diferenciaEnSegundos = Math.floor(diferenciaEnMilisegundos / 1000);
                diferenciaTexto = `${diferenciaEnSegundos} segundo${diferenciaEnSegundos !== 1 ? 's' : ''}`;
            }

            return {
                ...noticia._doc,  // Copiar propiedades existentes
                diferenciaEnTexto: diferenciaTexto,
            };
        });

        res.status(200).send({ noticias: noticiasPrincipalesConDiferencia });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}


async function obtenerNoticiasPrincipalesYRestantes(req, res) {
    const tipoPrincipal = 'principal';

    try {
        // Consulta para obtener las 6 noticias principales
        const noticiasPrincipales = await Noticas.find({ tipo: tipoPrincipal })
            .sort({ fecha: -1 })  // Ordenar por fecha de forma descendente
            .limit(6);  // Limitar el número de resultados a 6

        // Consulta para obtener las demás noticias (que no son principales)
        const noticiasRestantes = await Noticas.find({ tipo: { $ne: tipoPrincipal } })
            .sort({ fecha: -1 });  // Ordenar por fecha de forma descendente

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Calcular la diferencia en tiempo para cada noticia principal
        const noticiasPrincipalesConDiferencia = noticiasPrincipales.map((noticia) => {
            const diferenciaEnMilisegundos = fechaActual - noticia.fecha;
            let diferenciaTexto;

            if (diferenciaEnMilisegundos >= 24 * 60 * 60 * 1000) {
                const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (24 * 60 * 60 * 1000));
                diferenciaTexto = `${diferenciaEnDias} día${diferenciaEnDias !== 1 ? 's' : ''}`;
            } else if (diferenciaEnMilisegundos >= 60 * 60 * 1000) {
                const diferenciaEnHoras = Math.floor(diferenciaEnMilisegundos / (60 * 60 * 1000));
                diferenciaTexto = `${diferenciaEnHoras} hora${diferenciaEnHoras !== 1 ? 's' : ''}`;
            } else if (diferenciaEnMilisegundos >= 60 * 1000) {
                const diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / (60 * 1000));
                diferenciaTexto = `${diferenciaEnMinutos} minuto${diferenciaEnMinutos !== 1 ? 's' : ''}`;
            } else {
                const diferenciaEnSegundos = Math.floor(diferenciaEnMilisegundos / 1000);
                diferenciaTexto = `${diferenciaEnSegundos} segundo${diferenciaEnSegundos !== 1 ? 's' : ''}`;
            }

            return {
                ...noticia._doc,  // Copiar propiedades existentes
                diferenciaEnTexto: diferenciaTexto,
            };
        });

        // Combinar todas las noticias
        const todasLasNoticias = noticiasPrincipalesConDiferencia.concat(noticiasRestantes);

        res.status(200).send({ noticias: todasLasNoticias });
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición' });
    }
}

function editarNoticias(req,res){

    
    let  idNoticia = req.params.idNoticia
    let parametros = req.body
    Noticas.findById(idNoticia,(err,NoticiaSinEditar)=>{
        if(err){
            return res.status(404).send({message:'error en la peticion 1'})
        }else if (NoticiaSinEditar){
          if(req.file){
            if(NoticiaSinEditar.imgPhat === 'imgsDefult/imgDefult.png'){
                console.log('con image y la ulr SI ES LA DEFULT')
                let {title,descripcion } = parametros
                Noticas.findByIdAndUpdate(idNoticia,{title,descripcion,imgPhat:req.file.path },{new:true},(err,NoticiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (NoticiaUpdated){
                        return res.status(200).send({lineaUpdated:NoticiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
                    }
                })
            }else{
                console.log('con imagen y la url de la imgen es NO ES LA DEFULT')
                
                fs.unlink(path.resolve (NoticiaSinEditar.imgPhat))
                let {title,descripcion } = parametros
                Noticas.findByIdAndUpdate(idNoticia,{title,descripcion,imgPhat:req.file.path },{new:true},(err,NoticiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (NoticiaUpdated){
                        
                        return res.status(200).send({lineaUpdated:NoticiaUpdated})
                    }else{
                        return res.status(200).send({message:'error al editar'})
            
                    }
                })
            }
          }else{
            console.log('sin imagen')
            Noticas.findByIdAndUpdate(idNoticia,parametros,{new:true},(err,NoticiaUpdated)=>{
                if(err){
                    return res.status(200).send({messege:'error en la petion'})
                }else if (NoticiaUpdated){
                    
                    return res.status(200).send({lineaUpdated:NoticiaUpdated})
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
    
    Noticas.findById(idNoticia,(err,noticiasFiend)=>{
        if(err){
            return res.status(404).send({message:'error en la petiocion'})
        }else{

            if(noticiasFiend){
                if(noticiasFiend.imgPhat === 'imgsDefult/imgDefult.png'){


                    Noticas.findByIdAndDelete(idNoticia,(err,NoticiasDeleted)=>{
                        if(err){
                            return res.status(200).send({message:'error en la peticion'})
                        }else if(NoticiasDeleted){
                         return res.status(200).send({message:'se elimino correctamente'})            
                        }else{
                            console.log(idNoticia)
                            return res.status(200).send({message:'error al eliminar'})
                        }
                    })                
                    
                }else{
                    fs.unlink(path.resolve (noticiasFiend.imgPhat))
                    Noticas.findByIdAndDelete(idNoticia,(err,NoticiasDeleted)=>{
                        if(err){
                            return res.status(200).send({message:'error en la peticion'})
                        }else if(NoticiasDeleted){
                            return res.status(200).send({message:'se elimino correctamente'})
                        }else{
                            console.log(idNoticia)
                            return res.status(200).send({message:'error al eliminar'})
                        }
                    })
                }
            }else{

                return res.status(200).send({message:'error al encontrar la noticias'})
            }
        }


    })

    
}

module.exports = {
    crearNocitiasDefult,
    editarNoticias,
    obtenerNoticias,
    eliminarNoticias,
    buscarNoticasxId,
    agregarNoticias,
    obtenerNoticiasPrincipalesYRestantes
}