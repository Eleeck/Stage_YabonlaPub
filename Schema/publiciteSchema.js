const Joi = require('joi');

const publicationSchema = Joi.object({
    titre: Joi.string().max(255).required(),
    descriptif: Joi.string().allow(null),
});

module.exports = publicationSchema;
