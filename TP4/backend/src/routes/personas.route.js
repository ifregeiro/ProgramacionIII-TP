const { Router } = require("express");
const personasController = require("../controllers/personas.controller.js");

const rutaPersonas = Router();

rutaPersonas.get("/", personasController.list);

module.exports = rutaPersonas;
