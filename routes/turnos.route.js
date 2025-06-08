const {Router} = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const {verifyTokenMiddleware} = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();
rutaTurnos.get('/:idPaciente', turnosController.getTurnosByPacienteId);
rutaTurnos.post('/', verifyTokenMiddleware, turnosController.create);
rutaTurnos.get('/', turnosController.list);
rutaTurnos.put('/:id', verifyTokenMiddleware, turnosController.update);
rutaTurnos.delete('/:id', verifyTokenMiddleware, turnosController.delete);

module.exports = rutaTurnos;