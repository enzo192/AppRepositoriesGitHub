const mongoose = require('mongoose');

const { LIST_APP_MONGODB_HOST, LIST_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${LIST_APP_MONGODB_HOST}/${LIST_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

