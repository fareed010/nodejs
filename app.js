let express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Welcome to our new app');
})

app.listen(port, () => console.log(`Our app is running on http://localhost:${port}`))
