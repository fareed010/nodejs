let express = require('express');
const app = express();

const port = 3000;

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).render('home-guest');
})

app.listen(port, () => console.log(`Our app is running on http://localhost:${port}`))
