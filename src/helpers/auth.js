const req = require("express/lib/request");

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {  //para validar si está autenticado
    if (req.isAuthenticated()) {  //¿está autenticado? si es true > continuar next
        return next();
    }
    req.flash('error_msg', 'Not Autorized');
    res.redirect('/users/signin'); // si no esta autenticado redireccionalo al login
}

module.exports = helpers;