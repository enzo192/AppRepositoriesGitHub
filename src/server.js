const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('connect-flash');


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
app.use(morgan('dev'));//para poder usar morgan y ver las peticiones al server
app.use(methodOverride('_method')); //para poder editar y borrar - put y delete por medio de forms
app.use(session({               //para poder guardar mensajes
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());                 //para poder enviar mensajes


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg =  req.flash('success_msg');
    
    next();
});


//Routes
// app.get('/', (req, res) => {
//     res.render('index');
// })
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;