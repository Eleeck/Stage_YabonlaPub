const Joi = require('joi');

const campagneSchema = Joi.object({
    nom: Joi.string().max(255).required(),
    description: Joi.string().allow(null, ''),
    date_debut: Joi.date().allow(null),
    date_fin: Joi.date().min(Joi.ref('date_debut')).allow(null),
    status: Joi.number().integer().valid(0, 1).default(0)
});

module.exports = campagneSchema;
