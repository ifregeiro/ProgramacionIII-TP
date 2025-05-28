const pacientesModel = require("./../../models/sqlite/paciente.model.js");

class PacientesController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await pacientesModel.validate(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async list(req, res) {
    try {
      const pacientes = await pacientesModel.getPacientesModel();
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async create(req, res) {
    try {
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ message: "falta nombre o email" });
      }
      
      const nuevoPaciente = { name, email };
      const pacienteCreado = await pacientesModel.createPaciente(nuevoPaciente);
      res.status(201).json(pacienteCreado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  async delete(req, res) {
    try {
      const id = req.params.id;
      const pacienteBorrado = await pacientesModel.deletePaciente(id);
      res.status(200).json(pacienteBorrado);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  
  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ message: "falta nombre o email" });
      }
      
      const pacienteActualizado = await pacientesModel.updatePaciente(id, { name, email });
      res.status(200).json(pacienteActualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPacienteById(req, res) {
    try {
      const id = req.params.id;
      const paciente = await pacientesModel.getPacienteById(id);
      res.status(200).json(paciente);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new PacientesController();
