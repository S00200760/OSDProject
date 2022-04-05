const Joi = require('joi')
const express = require('express');
const res = require('express/lib/response');
const app = express()
const port =  3000 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let drivers = [
    {
        "id" :  1,
        "name" : "Lewis Hamilton",
        "number" : 44
    },
    {
        "id" :  2,
        "name" : "Max Verstappen",
        "number" : 1
    },
    {
        "id" :  3,
        "name" : "Charles Leclrec",
        "number" : 17
    }
];

app.post('/drivers', (req, res) => {
    const newDriverID = drivers.length;

    const driver = {id: newDriverID, ...req.body };

    const result = validateDriver(req.body)

    if (result.error)
    {
        res.status(400).json(result.error);
        return;
    }

    drivers.push(driver);
    
    res.location(`/drivers/${newDriverID}`)
    .status(201)
    .json(driver);

    console.log(`Driver name is ${driver.name} number of the driver is ${drivers.length}`);
});

app.get('/drivers', (req,res)=> {
    res.send(drivers);
})

app.get('/drivers/:id', (req,res) => {
    
   const id = req.params.id;

   const driver =  drivers.find(d =>  d.id === parseInt(req.params.id))

   if (!driver) {
       res.status(404);
       res.json({ error: 'not found'});
       return
   }

    res.json(drivers[id])
})

app.delete('/drivers/:id', (req,res) => {
    const id = req.params.id;

    const driver = drivers.find(d => d.id === parseInt(req.params.id))

    if (!driver) {
        res.status(404).json(`driver with that ID {id} was not found `);
        return;
    }

    const index = drivers.indexOf(driver);

    drivers.splice(index, 1);
    res.send(driver);
})

app.put('/drivers/:id',(req, res) => {

    const id = req.params.id;

    const result =  validateDriver(req.body)

    if (result.error)
    {
        res.status(400).json(result.error);
        return;
    }

    const driver = drivers.find(d => d.id === parseInt(req,params.id))

    if (!driver) {
        res.status(404).json(`Driver with that ID {req.params.id} was not found`);
        return;
    }

    console.log(`changing driver ${driver.name}`);
    driver.name = req.body.name;
    driver.number = req.body.number;

    res.send(book);
}) 

function validateDriver(driver) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        number: Joi.number().integer().min(0)
    })
    return schema.validate(driver);
}


//app.get('/', (req, res) => res.send('Hello world from Niall'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))