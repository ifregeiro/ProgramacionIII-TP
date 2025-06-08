const { Turno } = require('../../models/sqlite/entities/turno.entity.js');
const { Paciente } = require('../../models/sqlite/entities/paciente.entity.js');

const { turnoSchema } = require('../../validations/turno.validation');

const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({
      include: {
        model: Paciente,
        as: 'paciente'
      }
    });

    res.render('turnos/lista', { title: 'Listado de Turnos', turnos });
  } catch (error) {
    console.error('Error al listar turnos:', error);
    res.status(500).send('Error al listar turnos');
  }
};

const formNuevoTurno = async (req, res) => {
  const pacientes = await Paciente.findAll();
  res.render('turnos/nuevo', { title: 'Nuevo Turno - Clinica Salud+', pacientes });
};

const crearTurno = async (req, res) => {
  const { error, value } = turnoSchema.validate(req.body);

  if (error) {
    const pacientes = await Paciente.findAll();
    return res.render('turnos/nuevo', {
      title: 'Nuevo Turno',
      pacientes,
      error: error.details[0].message
    });
  }

  await Turno.create(value);
  res.redirect('/turnos');
};


const eliminarTurno = async (req, res) => {
  const { id } = req.params;
  await Turno.destroy({ where: { id } });
  res.redirect('/turnos');
};

module.exports = {
  listarTurnos,
  formNuevoTurno,
  crearTurno,
  eliminarTurno
};
