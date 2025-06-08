const { Paciente } = require('../../models/sqlite/entities/paciente.entity.js');

const { pacienteSchema } = require('../../validations/paciente.validation');

const listarPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll();
  res.render('pacientes/lista', { title: 'Listado de Pacientes', pacientes });
};

const formNuevoPaciente = (req, res) => {
  res.render('pacientes/nuevo', { title: 'Nuevo Paciente' });
};

const crearPaciente = async (req, res) => {
  const { error, value } = pacienteSchema.validate(req.body);

  if (error) {
    return res.render('pacientes/nuevo', {
      title: 'Nuevo Paciente',
      error: error.details[0].message
    });
  }

  await Paciente.create(value);
  res.redirect('/pacientes');
};


const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  await Paciente.destroy({ where: { id } });
  res.redirect('/pacientes');
};

module.exports = {
  listarPacientes,
  formNuevoPaciente,
  crearPaciente,
  eliminarPaciente
};
