const Joi = require('joi');

const associationSchema = Joi.object({
  nom: Joi.string().optional(),
  description: Joi.string().optional(),
  adresse: Joi.string().optional(),
  site_web: Joi.string().uri().optional()
});

module.exports = associationSchema;
