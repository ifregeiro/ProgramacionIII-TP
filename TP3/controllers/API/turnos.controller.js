const turnosModel = require("../../models/sqlite/turno.model.js");

class TurnosController {
  async getTurnosByPacienteId(req, res) {
    try {
      const idPaciente = req.params.idPaciente;
      const turnos = await turnosModel.getTurnosByPacienteIdModel(idPaciente);
      res.status(200).json(turnos);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { fecha, hora, pacienteId } = req.body;
      
      if (!fecha || !hora || !pacienteId) {
        return res.status(400).json({ message: "faltan datos" });
      }
      
      const nuevoTurno = { fecha, hora, pacienteId };
      const turnoCreado = await turnosModel.createTurnoModel(nuevoTurno);
      res.status(201).json(turnoCreado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async list(req, res) {
    try {
      const turnos = await turnosModel.getAllTurnosModel();
      res.status(200).json(turnos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async update(req, res) {
    try {
      const id = req.params.id;
      const { fecha, hora, pacienteId } = req.body;
      
      if (!fecha || !hora || !pacienteId) {
        return res.status(400).json({ message: "faltan datos requeridos" });
      }
      
      const turnoActualizado = await turnosModel.updateTurnoModel(id, { 
        fecha, 
        hora,
        pacienteId 
      });
      
      res.status(200).json(turnoActualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const resultado = await turnosModel.deleteTurnoModel(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new TurnosController();