const { Router } = require('express');
const controller = require('../controllers/local/turnos.local.controller.js');

const router = Router();

router.get('/', controller.listarTurnos);
router.get('/nuevo', controller.formNuevoTurno);
router.post('/nuevo', controller.crearTurno);
router.get('/eliminar/:id', controller.eliminarTurno);

module.exports = router;
