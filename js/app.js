const express = require('express');
const Routes = require('./Routes');


const app = express();
app.use(express.json({extended: false}));
new Routes(app);
app.listen(3000,() => console.log('Listening on port 3000'));



