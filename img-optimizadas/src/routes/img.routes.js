const express = require('express');
const imgpruebaController = require('../controllers/imgs.controller');
const multer = require('multer')
const api = express.Router();
const fs = require('node:fs')
const upload = multer({dest: 'new/'})


api.post('/upload/single',upload.single('imagenPerfil'),imgpruebaController.nuevaimgprueba)


function saveImage(file){
    const newPath = `./new/${file.originalname}`
    fs.renameSync(file.path, newPath);
    return newPath;
}



module.exports = api;