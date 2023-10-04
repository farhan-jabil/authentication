const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

app.use(express.json())

app.use(cors());

// Use route modules
app.use('/api', require('./routes/Login'));
app.use('/api', require('./routes/SignUp'));
app.use('/api', require('./routes/GettingUser'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
