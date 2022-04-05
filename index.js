const express = require('express')
const app = express()
const port =  3000 

let drivers = [];

app.post('/drivers', (req, res) => {
    const driver = req.body;
    
    const driverNumber = driver.length ;
    
    drivers.push(driver);

    res.location(`/drivers/${driverNumber}`);
    res.status(201);
    res.json(driver);
});

app.get('/', (req, res) => res.send('Hello world from Niall'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))