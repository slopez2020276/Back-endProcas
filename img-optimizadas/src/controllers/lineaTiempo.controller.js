const LineaTimepo = require('../models/lineaTiempo.model')

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

            lineaTiempo1.save((err, linea1Saved) => {
                if (err) {
                    return console.log('error en la peticon')
                } else if (linea1Saved) {
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

module.exports = {
    crearEventosLineaDeTiempoDefult
}

