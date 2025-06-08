const Joi = require('joi');

const turnoSchema = Joi.object({
  fecha: Joi.date().required(),
  hora: Joi.string().required(),
  pacienteId: Joi.number().integer().required()
});

module.exports = { turnoSchema };
