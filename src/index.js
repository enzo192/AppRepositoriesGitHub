const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');



//Initializations
const app = express();
require('./database');


//Settings
const port = process.env.PORT || 3000;
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extName: '.hbs'
}));
app.set('view engine', '.hbs');



//Middlewares
app.use(express.urlencoded({extended: false}));//un form envia info y puedo entenderlo, eje: user y password
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


//Global Variables



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/list'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


// Server is listenning
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// app.listen(app.get('port'), () => {
//     console.log('listening on port', app.get('port'));
// });
