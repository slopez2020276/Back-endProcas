const Productos = require('../models/productos.model');
const Listas = require('../models/listasProductos.model');
const path = require('path');
const fs = require('fs-extra');

// Función para crear un producto
async function CrearProductos(req, res) {
    try {
        const parametros = req.body;
        const imgPatha = req.file.path;

        // Crear un nuevo producto
        const nuevoProducto = new Productos({
            nombreProducto: parametros.nombreProducto,
            imgPath: imgPatha
        });

        // Guardar el nuevo producto en la base de datos
        const productoCreado = await nuevoProducto.save();

        // Devolver el producto creado como respuesta
        return res.status(200).send({ producto: productoCreado });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        return res.status(500).send({ message: 'Error interno del servidor' });
    }
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

  

module.exports = {
    CrearProductos,
    CrearListaEnProducto,
    CrearProductosv2,
    agregarCategoria,
    agregarItemsACategoria,
    editarItemEnCategoria,
    editarCategoria,
    ObtenerProductos
};
