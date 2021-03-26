let express = require('express');
const app = express();
require('dotenv').config();

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => console.log(`Our app is running on http://localhost:${port}`))
