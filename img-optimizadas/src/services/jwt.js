const jwt_simple = require('jwt-simple');
const moment = require('moment');
const claveSecreta = "secretisimo_papa";

exports.crearToken = function (usuario) {
    let payload = {
        sub: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().day(7, 'days').unix()
    }

    return jwt_simple.encode(payload, claveSecreta);
}


