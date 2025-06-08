const { Turno } = require('./entities/turno.entity.js');
const { Paciente } = require('./entities/paciente.entity.js');

// Obtener todos los turnos
const getAllTurnosModel = async () => {
  try {
    const turnos = await Turno.findAll({
      include: [{
        model: Paciente,
        attributes: ["id", "name", "email"]
      }]
    });
    return turnos;
  } catch (error) {
    throw error;
  }
};

const getTurnosByPacienteIdModel = async (pacienteId) => {
  try {
    const turnos = await Turno.findAll({
      where: { pacienteId: pacienteId },
      include: [{
        model: Paciente,
        attributes: ["id", "name", "email"]
      }]
    });
    return turnos;
  } catch (error) {
    throw error;
  }
};

const createTurnoModel = async (turnoData) => {
  try {
    // Verificar que el paciente existe
    const paciente = await Paciente.findByPk(turnoData.pacienteId);
    if (!paciente) {
      throw new Error("El paciente no existe");
    }
    
    // Crear el turno
    const nuevoTurno = await Turno.create(turnoData);
    return nuevoTurno;
  } catch (error) {
    throw error;
  }
};

const updateTurnoModel = async (id, turnoData) => {
  try {
    const turno = await Turno.findByPk(id);
    if (!turno) {
      throw new Error("Turno no encontrado");
    }
    
    await turno.update(turnoData);
    return turno;
  } catch (error) {
    throw error;
  }
};

const deleteTurnoModel = async (id) => {
  try {
    const turno = await Turno.findByPk(id);
    if (!turno) {
      throw new Error("Turno no encontrado");
    }
    
    await turno.destroy();
    return { message: "Turno eliminado correctamente" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTurnosModel,
  getTurnosByPacienteIdModel,
  createTurnoModel,
  updateTurnoModel,
  deleteTurnoModel
};
