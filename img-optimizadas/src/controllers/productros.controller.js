const Productos = require('../models/productos.model');
const Listas = require('../models/listasProductos.model');
const path = require('path');
const cloudinary = require("../../libs/cloudinary");


// Función para crear un producto
async function CrearProductos(req, res) {
    try {

        const productosmodel = new Productos()
    

     

        cloudinary.uploader.upload(req.file.path, function (err, result){
          if(err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error"
            })
          }
          else{
          productosmodel.nombreProducto = req.body.nombreProducto
          productosmodel.imgPath = result.url
          productosmodel.idPublic = result.public_id
          productosmodel.save((err, noticia) => {
              if (err) {
                  return res.status(400).send({message:'error en la peticon'})
              } else if (noticia) {
                  return res.status(200).send({noticia:noticia})
              }else{
                  return res.status(200).send({message:'error al crear la noticia'})
              }
          })
          }
        })

    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}


function EliminarProductos(req,res){
  idProducto = req.params.idProducto;

Productos.findById(idProducto,(err,productoFinded)=>{
  if(err){
    return res.status(500).send({message:'error en la peticion'})
  }else if(productoFinded){
    const urlImagen = 'jwvlqzz6johnmhndtwy7';

    // Utiliza el método destroy para eliminar la imagen en Cloudinary
    cloudinary.uploader.destroy(productoFinded.idPublic, (error, result) => {
     if (error) {
    console.error('Error al eliminar la imagen en Cloudinary:', error);
    } else {
    console.log('Imagen eliminada correctamente en Cloudinary:', result)
    Productos.findByIdAndDelete(idProducto,(err,productoDeleted)=>{
      if(err){
        return res.status(500).send({message:'error en la peticion'})
      }else if(productoDeleted){
        return res.status(200).send({productoDeleted})
      }else{
        return res.status(404).send({message:'error al eliminar el producto'})
      }
    })
    }
    });
  }else{
    return res.status(404).send({message:'error al encontrar el producto'})
  }
})

}

// Función para crear una nueva lista en un producto existente
async function CrearListaEnProducto(req, res) {

    let idProducto = req.params.idProducto;	
    let nuevaLista = req.body.tituloLista
    try {
        const { tituloLista, descripcionItems } = req.body;

        // Buscar el producto por su ID
        const producto = await Productos.findById(idProducto);

        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Crear una nueva lista con los items proporcionados
      

        // Agregar la nueva lista al producto
        producto.Lista.push({tituloLista:nuevaLista});

        // Guardar los cambios en el producto
        await producto.save();

        // Devolver el producto actualizado como respuesta
        return res.status(200).send({ producto: producto });
    } catch (error) {
        console.error('Error al crear la lista en el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
  }

  async function EliminarCategoriaEnProducto(req, res) {
    const idProducto = req.params.idProducto;
    const nombreCategoria = req.params.nombreCategoria;

    try {
        // Buscar el producto por su ID
        const producto = await Productos.findById(idProducto);

        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Buscar la categoría por su nombre
        const categoriaIndex = producto.categorias.findIndex(categoria => categoria._id.toString() === nombreCategoria);

        if (categoriaIndex === -1) {
            return res.status(404).send({ message: 'Categoría no encontrada en el producto' });
        }

        // Eliminar la categoría del array de categorías
        producto.categorias.splice(categoriaIndex, 1);

        // Guardar los cambios en el producto
        await producto.save();

        // Devolver el producto actualizado como respuesta
        return res.status(200).send({ producto: producto });
    } catch (error) {
        console.error('Error al eliminar la categoría en el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}




async function agregarCategoria(req,res) {
    let productoId = req.params.idProducto;
    try {
      const producto = await Productos.findById(productoId);
  
      if (!producto) {
        console.error('Producto no encontrado');
        return;
      }
  
      // Crear un nuevo objeto de categoría con el nombre y los items proporcionados
      const nuevaCategoria = {
        Nombre: req.body.nombreCategoria,
      };
  
      // Agregar la nueva categoría al array de categorías
      producto.categorias.push(nuevaCategoria);
  
      // Guardar el producto actualizado en la base de datos
      await producto.save((err,productoGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(nuevaCategoria){
            return res.status(200).send({productoGuardado})
        }else{
            return res.status(404).send({message:'error al guardar el producto'})
        }
      });
  
      console.log('Categoría agregada con éxito');
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  }
async function CrearProductosv2 (req,res){
    modelProducto = new Productos();
    modelProducto.nombreProducto = req.body.nombreProducto;
    modelProducto.imgPath  =req.file.path;
    modelProducto.save((err,productoGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})

        }else if(productoGuardado){
            return res.status(200).send({productoGuardado})
        }else{
            return res.status(404).send({message:'error al guardar el producto'})
        }
    })

  }
async function agregarItemsACategoria(req,res) {

    let productoId = req.params.idProducto;
    
     let nuevosItems = req.body.items;
    let nombreCategoria = req.params.nombreCategoria;
    try {
      const producto = await Productos.findById(productoId);
  
      if (!producto) {
        console.error('Producto no encontrado');
        return;
      }
  
      // Encontrar la categoría específica dentro del array de categorías
      const categoriaEncontrada = producto.categorias.find(categoria => categoria.Nombre === nombreCategoria);
  
      if (!categoriaEncontrada) {
        console.error('Categoría no encontrada');
        return;
      }
  
      // Agregar los nuevos ítems a la propiedad "items" de la categoría
      categoriaEncontrada.items = categoriaEncontrada.items.concat(nuevosItems);
  
      // Guardar el producto actualizado en la base de datos
      await producto.save((err,productoGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if (productoGuardado){
            return res.status(200).send({productoGuardado})
        }else{
            return res.status(404).send({message:'error al guardar el producto'})
        }
      });
  
      console.log('Ítems agregados a la categoría con éxito');
    } catch (error) {
      console.error('Error al agregar ítems a la categoría:', error);
    }
  }



  async function EliminarItemEnCategoria(req, res) {
    const idProducto = req.params.idProducto;
    const idCategoria = req.params.idCategoria;
    const idItem = req.params.idItem;

    try {
        // Buscar el producto por su ID
        const producto = await Productos.findById(idProducto);

        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Buscar la categoría por su ID
        const categoria = producto.categorias.find(categoria => categoria._id.toString() === idCategoria);

        if (!categoria) {
            return res.status(404).send({ message: 'Categoría no encontrada en el producto' });
        }

        // Buscar el índice del item por su ID dentro de la categoría
        const itemIndex = categoria.items.findIndex(item => item === idItem);

        if (itemIndex === -1) {
            return res.status(404).send({ message: 'Item no encontrado en la categoría' });
        }

        // Eliminar el item del array de items de la categoría
        categoria.items.splice(itemIndex, 1);

        // Guardar los cambios en el producto
        await producto.save();

        // Devolver el producto actualizado como respuesta
        return res.status(200).send({ producto: producto });
    } catch (error) {
        console.error('Error al eliminar el item en la categoría:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
}


// Función para editar un ítem en una categoría
async function editarItemEnCategoria(req, res) {

    let productoId = req.params.idProducto;
    let nombreCategoria = req.params.nombreCategoria;
    let nombreItemExistente = req.params.nombreItemExistente;
    let nuevoNombreItem = req.body.nuevoNombreItem;
    try {
    const producto = await Productos.findById(productoId);

    if (!producto) {
      console.error('Producto no encontrado');
      return;
    }

    // Encontrar la categoría específica dentro del array de categorías
    const categoriaEncontrada = producto.categorias.find(categoria => categoria.Nombre === nombreCategoria);

    if (!categoriaEncontrada) {
      console.error('Categoría no encontrada');
      return;
    }

    // Encontrar el ítem específico dentro de la categoría
    const itemEncontradoIndex = categoriaEncontrada.items.findIndex(item => item === nombreItemExistente);

    if (itemEncontradoIndex === -1) {
      console.error('Ítem no encontrado en la categoría');
      return;
    }

    // Actualizar el nombre del ítem y otras propiedades según sea necesario
    categoriaEncontrada.items[itemEncontradoIndex] = nuevoNombreItem;

    // Si hay otras propiedades a actualizar, puedes hacerlo aquí
    // Ejemplo: categoríaEncontrada.items[itemEncontradoIndex].otraPropiedad = nuevasPropiedades.otraPropiedad;

    // Guardar el producto actualizado en la base de datos
    await producto.save((err,productoGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(productoGuardado){
            return res.status(200).send({productoGuardado})
        }else{
            return res.status(404).send({message:'error al guardar el producto'})
        }
    
    });

    console.log('Ítem editado en la categoría con éxito');
  } catch (error) {
    console.error('Error al editar ítem en la categoría:', error);
  }
  }
async function editarCategoria(req,res) {
    
    let productoId = req.params.idProducto;
    let nombreCategoriaExistente = req.params.nombreCategoriaExistente;
    let nuevoNombreCategoria = req.body.nuevoNombreCategoria;
    let nuevasPropiedades = req.body.nuevasPropiedades;
    
    try {
      const producto = await Productos.findById(productoId);
  
      if (!producto) {
        console.error('Producto no encontrado');
        return;
      }
  
      // Encontrar la categoría específica dentro del array de categorías
      const categoriaEncontrada = producto.categorias.find(categoria => categoria.Nombre === nombreCategoriaExistente);
  
      if (!categoriaEncontrada) {
        console.error('Categoría no encontrada');
        return;
      }
  
      // Actualizar el nombre de la categoría y otras propiedades según sea necesario
      categoriaEncontrada.Nombre = nuevoNombreCategoria;
  
      // Si hay otras propiedades a actualizar, puedes hacerlo aquí
      // Ejemplo: categoriaEncontrada.otraPropiedad = nuevasPropiedades.otraPropiedad;
  
      // Guardar el producto actualizado en la base de datos
      await producto.save((err,productoGuardado)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(productoGuardado){
            return res.status(200).send({productoGuardado})
        }else{
            return res.status(404).send({message:'error al guardar el producto'})
        }
      });
  
      console.log('Categoría editada con éxito');
    } catch (error) {
      console.error('Error al editar categoría:', error);
    }
  }
  async function ObtenerProductos(req,res){
    Productos.find({},(err,productosEncontrados)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion'})
        }else if(productosEncontrados){
            return res.status(200).send({productosEncontrados})
        }else{
            return res.status(404).send({message:'error al obtener los productos'})
        }
    })
  }

  
  async function editarProductos(req,res){

    let idProducto = req.params.idProducto;
    let parametros = req.body;

    Productos.findById(idProducto,(err,productoFinded)=>{
      if(err){
        return res.status(500).send({message:'error en la peticion'})
      }else if(productoFinded){




        if(productoFinded.imgPath === 'imgsDefult/imgDefult.png'){
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

       
        if(req.file ){
          console.log('con imagen y la url de la imgen es NO ES LA DEFULT')
          cloudinary.uploader.upload(req.file.path, function (err, result){
            if(err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Error"
              })
            }else{
                let idPublic = result.public_id
                let {EncalceVideo,DescripcionHistoria, } = parametros
                Productos.findByIdAndUpdate(idProducto,{
                  imgPath:result.url ,
                  idPublic: idPublic,
                  nombreProducto:req.body.nombreProducto 
                },{new:true},(err,historiaUpdated)=>{
                    if(err){
                        return res.status(200).send({messege:'error en la petion 2'})
                    }else if (historiaUpdated){
  
                        const urlImagen = 'jwvlqzz6johnmhndtwy7';
  
                        // Utiliza el método destroy para eliminar la imagen en Cloudinary
                        cloudinary.uploader.destroy(productoFinded.idPublic, (error, result) => {
                         if (error) {
                        console.error('Error al eliminar la imagen en Cloudinary:', error);
                        } else {
                        console.log('Imagen eliminada correctamente en Cloudinary:', result)
                        return res.status(200).send({lineaUpdated:historiaUpdated});
                        }
                        });
                     }else{
                        return res.status(200).send({message:'error al editar'})
            
                    }
                })
            }
          })
  

        }else{
          console.log('sin imagen')
          Productos.findByIdAndUpdate(idProducto,{nombreProducto:req.body.nombreProducto },{new:true},(err,productoUpdated)=>{
            if(err){
              return res.status(200).send({messege:'error en la petion 2'})
            }else if(productoUpdated){
              return res.status(200).send({lineaUpdated:productoUpdated})
            }else{
              return res.status(200).send({message:'error al editar'})
            }
          })

        }
          

         

          
      }

      }else{
        return res.status(404).send({message:'error al encontrar el producto'})
      }
    })
  }

  function ObtenerProductosxId (req,res){
    idProducto = req.params.idProducto;

    Productos.findById(idProducto,(err,productoFinded)=>{
      if(err){
        return res.status(500).send({message:'error en la peticion'})
      }else if(productoFinded){
        return res.status(200).send({productoFinded})
      }else{
        return res.status(404).send({message:'error al encontrar el producto'})
      }
    })

  }

module.exports = {
    CrearProductos,
    CrearListaEnProducto,
    CrearProductosv2,
    agregarCategoria,
    agregarItemsACategoria,
    editarItemEnCategoria,
    editarCategoria,
    ObtenerProductos,
    ObtenerProductosxId,
    EliminarProductos,
    EliminarCategoriaEnProducto,
    EliminarItemEnCategoria,
    editarProductos
    
};
