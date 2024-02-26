
const fs = require('node:fs')
function nuevaimgprueba(req,res){
    console.log(req.file)
    saveImage(req.file)

    res.send('nice ')
    

}


function saveImage(file){
    const newPath = `./new/${file.originalname}`
    fs.renameSync(file.path, newPath);
    return newPath;
}

function nuevo(req,res){
    res.send('hola mundo <button>ok</button>  ')
}

module.exports = {
    nuevaimgprueba,
    nuevo
}
