const Joi = require('joi')
const express = require('express');
const res = require('express/lib/response');

const drivers = require('./routes/drivers');
const app = express()
const port =  3000 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/drivers', drivers);




//app.get('/', (req, res) => res.send('Hello world from Niall'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))