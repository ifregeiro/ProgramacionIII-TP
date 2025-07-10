const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const registerValidation = [
  body("mail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Ingresa un mail valido"),
  body("contrasena")
    .isLength({ min: 6 })
    .withMessage("la password debe tener minimo 6 caracteres")
];

const loginValidation = [
  body("mail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Ingresa un mail valido"),
  body("contrasena")
    .notEmpty()
    .withMessage("La password es necesaria")
];

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authController.logout);
router.get("/me", auth, authController.getProfile);

module.exports = router;
