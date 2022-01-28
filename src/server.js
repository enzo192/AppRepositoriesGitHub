const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');



//Initializations
const app = express();



//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials') 
}));
app.set('view engine', '.hbs');



//Middlewares
app.use(express.urlencoded({extended: false}));//un form envia info y puedo entenderlo en formato JSON, eje: user y password
// app.use(methodOverride('_method'));
// app.use(session({
//     secret: 'mysecretapp',
//     resave: true,
//     saveUninitialized: true
// }));


//Global Variables



//Routes
app.get('/', (req, res) => {
    res.render('index');
})


//Static Files
app.use(express.static(path.join(__dirname, 'public')));




module.exports = app;