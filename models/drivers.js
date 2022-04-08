const { number } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: String,
    number: Number,
    constructor: String,
    age : Number,
    nested: { origin : {nationality : String}},
    tags: [String]
})

const Driver = mongoose.model('Driver', driverSchema);

function validateDriver(driver) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        number: Joi.number().integer().min(0),
        origin: Joi.object().keys({
            nationality: Joi.string()
        }),
        constructor: Joi.string(),
        age: Joi.number(),
        tags: Joi.array().items(Joi.string())

    })

    return schema.validate(driver);
}

exports.Driver = Driver;
exports.validate = validateDriver;