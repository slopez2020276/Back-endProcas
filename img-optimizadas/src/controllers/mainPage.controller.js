const MainPage = require("../models/mainPage.model")
const Noticias = require("../models/noticias.model")
const LineaTiempo = require("../models/lineaTiempo.model")

function crearMainPageDefult (req,res){

    MainPage.find({},(err,pageFinded)=>{
        if(err){
            return console.log('error en la peticion al buscar')
        }else if(pageFinded.length == 0){
            let mainPageModel = new MainPage()
            mainPageModel.mainImgPath = 'urlImg';
            mainPageModel.textHistoria = 'Modificar este texto, pertence a la historia';
            mainPageModel.textVision = 'Modificar este texto para la vision'
            mainPageModel.textMision = 'modificar este texto para la mision'
          
            Noticias.find({},(err,noticiasfinded)=>{
                if(err){
                    console.log('error en la petcion al buscar noticias')
                }else if (noticiasfinded){
                    	let contador = noticiasfinded.length
                        const dataWhit_id = []
                        
                        for(var i=0 ; i < contador ;i++){
                            console.log(noticiasfinded[i]._id)
                            dataWhit_id.push(noticiasfinded[i]._id)
                            
                        }
                        mainPageModel.idNoticias = dataWhit_id

                        LineaTiempo.find({},(err,lineasTiempoFinded)=>{
                            if(err) {
                                return console.log('error en la peticion sobre la busqueda de eventos en la linea del tiempo')
                            }else if(lineasTiempoFinded){
                                let contador = lineasTiempoFinded.length
                                const dataWhit_idLine = []
                        
                             for(var i=0 ; i < contador ;i++){
                                 console.log(lineasTiempoFinded[i]._id)
                                 dataWhit_idLine.push(lineasTiempoFinded[i]._id)
                            
                                }
                                mainPageModel.idLineaTiempo = dataWhit_idLine

                                mainPageModel.save((err,pageSaved)=>{
                                    if(err){
                                        return console.log('error en la peticion al guardar la page')
                                    }else if(pageSaved){
                                            return console.log(pageSaved)
                                    }
                                })

                            }
                        })

                      

                }else{
                    console.log('noticias no encontradas')
                }
            })
          
        }else{
            return console.log('pagina creada con anterioridad')
        }
    })

    let NoticiasModel = new Noticias()
    let LineaTiempoModel = LineaTiempo()
  


}


function mostrarMainPage(req,res){
    
    crearMainPageDefult()
    MainPage.find({},(err,pageFinded)=>{
        if(err){
            return res.status(500).send({"message":"error en la peticion"})
        }else if (pageFinded){
            
            return res.status(200).send({ MainPage :pageFinded})
        }
    })

}

module.exports = {
    crearMainPageDefult,
    mostrarMainPage,
}