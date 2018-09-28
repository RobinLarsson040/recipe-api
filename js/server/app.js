const express = require('express');
const Routes = require('./Routes');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
app.use(express.json({ extended: false }));
new Routes(app);
app.listen(port, () => console.log(`Listening on port: ${port}`));

