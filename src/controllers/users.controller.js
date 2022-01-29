const usersCtrl = {};

const passport = require('passport');

const User = require('../models/User');



usersCtrl.renderSignupForm = (req, res) => {
    res.render('users/signup');
}

usersCtrl.signup = async (req, res) => {
    // console.log(req.body);
    // res.send('signup');
    const errors = [];
    const { name, email, password, confirm_password }= req.body;
    if (password != confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Passwords must be at least 4 characters'});
    }
    if (errors.length > 0) {
        res.render("users/signup", {
          errors,
          name,
          email,
          password,
          confirm_password,
        });
      } else {
        // Look for email coincidence
        const emailUser = await User.findOne({ email: email }); //verificar que ya no haya ese mismo correo registrado
        if (emailUser) {
          req.flash("error_msg", "The Email is already in use.");
          res.redirect("/users/signup");
        } else {
          // Saving a New User
          const newUser = new User({ name, email, password });
          newUser.password = await newUser.encryptPassword(password); //para cifrar la contraseña
          await newUser.save();
          req.flash("success_msg", "You are registered.");
          res.redirect("/users/signin");
        }
      }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {  //usamos passport en login
  successRedirect: '/notes',          // si sale mal redirige a las notas
  failureRedirect: '/users/signin',  // si sale mal redirige al form de logeo
  failureFlash: true,  // si hay error lo manejamos con flash para verlo
});

usersCtrl.logout = (req, res) => {  //para cerrar la sesión
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;