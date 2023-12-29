const Historia = require('../models/historia.model')


function crearHistoraDefult (){
    Historia.find((err,HistoriaFiended)=>{
        if(err){
            return console.log("error en la peticion 1")            
        }else if (HistoriaFiended.length == 0){
            let histriaModel = new Historia()
            histriaModel.EncalceVideo = 'https://www.youtube.com/embed/f0hN3s9XvI0?si=rzIrMkIoBuH7p7Q9'
            histriaModel.DescripcionHistoria = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora, beatae sed! Eum, debitis? Voluptatibus fugit, provident quisquam, reiciendis eligendi quae illo, tempora repudiandae blanditiis earum voluptas architecto? Vitae, provident praesentium!  modificar esto'
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


module.exports ={
    crearHistoraDefult,
    
}