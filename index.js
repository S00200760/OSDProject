const Joi = require('joi')
const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');

const drivers = require('./routes/drivers');

const app = express()
const port =  3000;

const connectionString = 'mongodb://127.0.0.1:27017/F1OSD'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).
catch ( error => {
    console.log('Database connection refused' +error);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/drivers', drivers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))