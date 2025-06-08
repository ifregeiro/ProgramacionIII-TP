const Joi = require('joi');

const pacienteSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required()
});

module.exports = { pacienteSchema };
//Validation creado para que valide que el nombre tenga entre 3 y 50 caract y el mail sea valido