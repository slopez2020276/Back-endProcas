const express = require('express');
const api = express.Router();
const cloudinary = require("../../libs/cloudinary");
const upload = require("../../libs/multerPrueba");
const multercontroler = require("../controllers/preubaCloudinary.controller")

api.post('/upload', upload.single('image'), multercontroler.uploadImege);
 
 
module.exports = api;
