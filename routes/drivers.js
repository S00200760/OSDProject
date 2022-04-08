const express = require('express');
const { Router } = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const validJWTNeeded =  require('../middleware/jwtvalidation');
const { validationMiddleware } = require('../middleware/jwtvalidation');
const { Driver, validate } = require('../models/drivers');


router.post('/', async (req, res) => {
    
    let result = validate(req.body)

    if (result.error) {
        res.status(400).json(result.error);
        return;
    }

    let driver = new Driver(req.body);

    try {
        driver = await driver.save();
        res.location(`/${driver._id}`)
        .status(201)
        .json(driver);
    }
    catch {
        res.status(500).json(result.error);
    }
});

router.get('/', async (req,res)=> {

    try {

        const driver = await Driver.find();
        res.json(driver);
      }
      catch {
        res.status(500).json('db error')
      }

      
})

router.get('/:id', validationMiddleware,validJWTNeeded, async (req,res) => {
    
   try {

    const driver = await Driver.findById(req.params.id);
    if(driver) {
        res.json(driver);
    }
    else {
        res.status(404).json('Not found')
    }
   }
   catch {
       res.status(404).json('Not found: id is weird');
   }
})

router.delete('/:id', async (req,res) => {
    
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id)
        res.send(driver) 
    }
    catch {
        res.status(404).json(`driver with that ID ${req.params.id} was not found`);
    }
})

router.put('/:id', async (req, res) => {

    const result = validate(req.body)

    if (result.error) {
        res.status(400).json(result.error);
        return;
    }

    try {

        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (driver) {
            res.json(driver);
        }
        else {
            res.status(404).json('Not found');
        }
    }
    catch {
        res.status(404).json('Not found: id is weird');
    }
}) 


module.exports = router