require('dotenv').config();

const app = require('./server');
require('./database');

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
})
