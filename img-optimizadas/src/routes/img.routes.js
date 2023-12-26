const express = require('express')
const cors = require('cors')
const multer = require('multer')
const sharp = require('sharp')

const api = express.Router();

const helperIMG = (filePath, filename,size = 300)=>{
    return sharp(filePath)
        .resize(size )
        .toFile(`./optimize/${filename}`)
}

const storage = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null,'./uploads')
    },
    filename: (req,file,cb)=>{
         const ext = file.originalname.split('.').pop()
         cb(null,`${Date.now()}.${ext}`)
    }

})

const upload = multer({storage})

api.post('/upload',upload.single('file'),(req,res)=>{
    console.log('-->',req.file)

    helperIMG(req.file.path, `MICRO-resize-${req.file.fieldname}.png`,20)
    helperIMG(req.file.path, `SMALL-resize-${req.file.fieldname}.png`,100)
    helperIMG(req.file.path, `MEDIUM-resize-${req.file.fieldname}.png`,500)
    helperIMG(req.file.path, `LARGE-resize-${req.file.fieldname}.png`,1000)


    res.send({data:'imagen Cargada'}) 

})

module.exports = api;
