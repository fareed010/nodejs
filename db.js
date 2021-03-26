const mongodb = require('mongodb');
require('dotenv').config();

const URI_STRING = process.env.CONNECTION_URI;
const port = process.env.PORT || 3000;

mongodb.connect(URI_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) throw err;
    module.exports = client.db();
    const app = require('./app');
    app.listen(port, () => console.log(`The app is running on http://localhost:${port}`))
})

