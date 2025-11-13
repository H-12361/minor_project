const Joi = require('joi');
const review = require('./modles/review');

module.exports.listingSchema= Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location :Joi.string().required(),
        price :Joi.number().required().min(0),
        country: Joi.string().required()


    }).required()

})

// use to validate reviews schema
 module.exports.reviewsSchema=Joi.object({
    reviews:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),
    }).required()

 })