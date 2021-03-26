const mongodb = require('mongodb');

const URI_STRING = process.env.CONNECTION_URI;

mongodb.connect(URI_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    
})