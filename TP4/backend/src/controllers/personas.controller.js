const personasModel = require("../models/personas.model.js");

class PersonasController {
  async list(req, res) {
    try {
      const personas = await personasModel.getPersonas();
      res.status(200).json(personas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PersonasController();
