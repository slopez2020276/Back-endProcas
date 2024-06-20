const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "secretisimo_papa";

exports.crearToken = function (usuario) {
    let payload = {
        sub: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        puesto: usuario.puesto,
        dpi: usuario.dpi,
        departamento: usuario.departamento,
        cuenta: usuario.cuenta,
        
        iat: moment().unix(),

        exp: moment().day(10, 'days').unix()
    }

    return jwt_simple.encode(payload, claveSecreta);
}


