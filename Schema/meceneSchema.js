const Joi = require('joi');

const mecenesSchema = Joi.object({
    nom_mecene: Joi.string().max(255).required(),
    email: Joi.string().email().allow(null),
    telephone: Joi.string().allow(null),
    adresse: Joi.string().allow(null)
});

module.exports = mecenesSchema;
