const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();


//connect to mongodb
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});

app.use(express.json());
app.use('/api', routes);

const port = 9000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});