const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use( new localStrategy({   //con esto se logean los usuarios y se valida el password constantemente
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //Match Email's user
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'Not User Found'});
    } else {
        //Match password's user
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));


passport.serializeUser((user, done) => {  //recibe un usuario y se guarda en la dbs
    done(null, user.id);
});

passport.deserializeUser((id, done) => {  //cuando empieza a navegar se valida si el usuario que registramos anteriormente tiene permiso
    User.findById(id, (err, user) => {
        done(err, user);
    })
});


