const { Router } = require('express');
const controller = require('../controllers/local/pacientes.local.controller.js');

const router = Router();

router.get('/', controller.listarPacientes);
router.get('/nuevo', controller.formNuevoPaciente);
router.post('/nuevo', controller.crearPaciente);
router.get('/eliminar/:id', controller.eliminarPaciente);

module.exports = router;
