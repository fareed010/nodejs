let express = require('express');
const app = express();

const router = require('./router');

const port = 3000;

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => console.log(`Our app is running on http://localhost:${port}`))
