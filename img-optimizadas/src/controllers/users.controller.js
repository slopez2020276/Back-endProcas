const Usuario = require("../models/users.model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const { el } = require("date-fns/locale");

function RegistrarAd(req, res) {
  let usuarioModelo = new Usuario();
  usuarioModelo.nombre = "SuperAdmin";
  usuarioModelo.email = "Superadmin";
  usuarioModelo.rol = "Admin";
  usuarioModelo.password = "12345";

  Usuario.find({ rol: 'Admin' }).exec((err, buscarUsuario) => {
    if (err) return console.log("ERROR en la peticion");

    if ( buscarUsuario.length == 0) {


      bcrypt.hash(usuarioModelo.password, null, null, (err, passCrypt) => {
        usuarioModelo.password = passCrypt;
      });

      usuarioModelo.save((err, usuarioGuardado) => {
        if (err) return console.log("ERROR al crear el usuario Admin");

        if (usuarioGuardado) {
          console.log("Usuario Super Admin Creado");
        }
      });


     
    } else {
      console.log("Usuario Super Admin creado con anterioridad");
    }
  });
}

function RegistrarUsuario(req, res) {
  var parametros = req.body;
  var usuarioModel = new Usuario();

  if (parametros.email && parametros.password) {
    usuarioModel.email = parametros.email;
    usuarioModel.rol = "Usuario";
    usuarioModel.nombre = parametros.nombre

    Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
      if (usuarioEncontrado.length == 0) {
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, usuarioGuardado) => {
              if(err) return res.status(500).send({ mensaje:'error en la peticion 1'});
              else if(usuarioGuardado) {
                return res.send({"message":"el usuario fue guardado correctamente"})
              }else{
                return res.send({ mensaje: 'error al guardar el usuario' })
              }
           });
          }
        );
      } else {
        return res
          .status(500)
          .send({ mensaje: "Este correo, ya  se encuentra utilizado" });
      }
    });
  } else {
    return res
      .status(500)
      .send({ mensaje: "Envie los parametros obligatorios" });
  }
}

function Login(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(400).send({ message: "Error en la peticion" });
    if (usuarioEncontrado) {
      bcrypt.compare(
        parametros.password,
        usuarioEncontrado.password,
        (err, verificacionPassword) => {
          if (verificacionPassword) {
            if (parametros.obtenerToken == "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(usuarioEncontrado) });
            } else {
              usuarioEncontrado.password = undefined;
              return res.status(200).send({ usuario: usuarioEncontrado });
            }
          } else {
            return res
              .status(200)
              .send({ message: "Las contraseña no coincide" });
          }
        }
      );
    } else {
      return res
        .status(200)
        .send({ message: "Error, el correo no se encuentra registrado." });
    }
  });
}


function Login(req, res) {
  var parametros = req.body;
  Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
    if (err) return res.status(400).send({ message: "Error en la peticion" });
    if (usuarioEncontrado) {
      bcrypt.compare(
        parametros.password,
        usuarioEncontrado.password,
        (err, verificacionPassword) => {
          if (verificacionPassword) {
            if (parametros.obtenerToken == "true") {
              return res
                .status(200)
                .send({ token: jwt.crearToken(usuarioEncontrado) });
            } else {
              usuarioEncontrado.password = undefined;
              return res.status(200).send({ usuario: usuarioEncontrado });
            }
          } else {
            return res
              .status(200)
              .send({ message: "Las contraseña no coincide" });
          }
        }
      );
    } else {
      return res
        .status(200)
        .send({ message: "Error, el correo no se encuentra registrado." });
    }
  });
}
function crearGerente(req, res) {
  let parametros = req.body;
  let usuarioModel = new Usuario();

  if (parametros.nombre && parametros.email) {
    Usuario.find({ email: parametros.email }, (err, gerenteEncontrado) => {
      if (gerenteEncontrado.length > 0) {
        return res
          .status(400)
          .send({ message: "Este correo esta en uso por otro administrador" });
      } else {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = "Gerente";
        bcrypt.hash(
          parametros.password,
          null,
          null,
          (err, passwordEncriptada) => {
            usuarioModel.password = passwordEncriptada;

            usuarioModel.save((err, gerenteGuardado) => {
              if (err)
                return res
                  .status(400)
                  .send({ mensaje: "Error en la peticion" });
              if (!gerenteGuardado)
                return res
                  .status(400)
                  .send({ mensaje: "Error al guardar el gerente" });
              return res.status(200).send({ gerente: "gerenteGuardado" });
            });
          }
        );
      }
    });
  } else {
    return res
      .status(404)
      .send({ mensaje: "Debe ingresar los parametros obligatorios" });
  }
}

function EditarUsuario(req, res) {
  var idUser = req.params.idUser;
  var parametros = req.body;

  Usuario.findOne({ idUser: idUser }, (err, usuarioEncontrado) => {

    Usuario.findByIdAndUpdate(idUser,{$set: {email: parametros.email,},},{ new: true },
      (err, usuarioActualizado) => {
        if (err)
          return res
            .status(500)
            .send({ mensaje: "Error en la peticon de editar" });
        if (!usuarioActualizado)
          return res.status(500).send({ mensaje: "Error al editar usuario" });
        return res.status(200).send({ usuario: usuarioActualizado });
      }
    );

    Usuario.findByIdAndUpdate(
      req.user.sub,
      {$set: {email: parametros.email,},},
      { new: true },
      (err, usuarioActualizado) => {
        if (err)
          return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!usuarioActualizado)
          return res
            .status(500)
            .send({ mensaje: "Error al editar el Usuario" });

        return res.status(200).send({ usuario: usuarioActualizado });
      }
    );
  });
}

function editUser(req, res){
  idUser = req.params.idUsers
  parametros = req.body
  Usuario.findByIdAndUpdate(idUser,parametros,(err,usuariosUpdated)=>{
    if(err){
      return res.status(404).send({message:'error en la peticion'})
    }else if (usuariosUpdated){
      return res.status(200).send({message:'usuario actualizado con exito'})
    }else{
      return res.status(400).send({message:'error al actualizar el usuario'})
    }
  })

}



function ObtenerUsuario(req, res) {
  Usuario.find({}, (err, usuarioEncontrado) => {
    return res.status(200).send({ usuario: usuarioEncontrado });
  });
}

function ObtenerUsuarioId(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
    if (err) return res.status(400).send({ mensaje: "Error en la peticion" });
    if (!usuarioEncontrado)
      return res.status(400).send({ mensaje: "Error al obtener Usuario" });

    return res.status(200).send({ User: usuarioEncontrado });
  });
}

function eliminarUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario, (err, userFinded) => {
    if (err) {
      return res.status(500).send({ mensaje: "error en la peticion 1" });
    } else if (userFinded) {
      Usuario.findByIdAndDelete(idUsuario, (err, userRemoved) => {
        if (err) {
          return res.status(500).send({ mensaje: "error en petcion 2" });
        } else if (userRemoved) {
          return res
            .status(200)
            .send({ mensaje: "Usuario eliminado con exito", userRemoved });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "error al eliminar Usuario" });
    }
  });
}

function ObtenerUsuarios(req,res){
  Usuario.find({rol:'Usuario'}, (err,usuariosEncontrados)=>{
    if(err){return res.status(500).send('error en la peticion 1');
    }else if(usuariosEncontrados){
      return res.status(200).send({usuario:usuariosEncontrados});

    }else{
      return res.send({ mensaje: 'error al obtener usuarios'})
    }
  })
}


function ObterneruserLog(req,res){
  var user = req.user.sub;
   Usuario.findById(user,(err,usuarioEncontrado)=>{
    if(err){
      return res.status(500).send({ mensaje:'error en la peticion'})
    }else if (usuarioEncontrado){
          return res.status(200).send({usario:usuarioEncontrado})
    }else{
      return res.send({ mensaje: 'error al obtener '})
    }
   })
}




function CrearAgenteMarketing(req,res) {
  let usuarioModelo = new Usuario();
  usuarioModelo.email = req.body.email;
  usuarioModelo.rol = "AgenteMarketing";
  usuarioModelo.password = req.body.password;

 usuarioModelo.save((err, usuarioGuardado) => {


    if(err){
      return res.status(500).send({mensaje:'error en la peticion'})
    }else if ( usuarioGuardado){
      return res.status(200).send({mensaje:'Agente de Marketing creado'})
    }else{
      return res.status(500).send({mensaje:'error al crear el agente de marketing'})

    }
 })
};


async function login2 (req, res)  {
  try {
      // Haciendo la solicitud al Servidor 2
      const respuestaServidor2 = await axios.get('http://192.168.23.86/login');
      
      // Devolviendo la respuesta del Servidor 2 al cliente que consultó al Servidor 1
      res.send(respuestaServidor2.data);
  } catch (error) {
      console.error('Error al consultar el Servidor 2:', error);
      res.status(500).send('Error al consultar el Servidor 2');
  }
};

module.exports = {
  RegistrarAd,
  Login,
  RegistrarUsuario,
  EditarUsuario,
  ObtenerUsuario,
  ObtenerUsuarioId,
  eliminarUsuario,
  crearGerente,
  ObtenerUsuarios,
  ObterneruserLog,
  editUser,
  CrearAgenteMarketing,
  login2
};
