const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../models");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "24h" }
  );
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mail, contrasena } = req.body;

    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: "este mail ya está en uso" });
    }

    const user = await User.create({ mail, contrasena });
    const token = generateToken(user.id);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      user: {
        id: user.id,
        mail: user.mail
      }
    });
  } catch (error) {
    console.error("Error registro:", error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mail, contrasena } = req.body;

    const user = await User.findOne({ where: { mail } });
    if (!user) {
      return res.status(401).json({ error: "credenciales invalidas" });
    }

    const isPasswordValid = await user.validatePassword(contrasena);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "credenciales invalidas" });
    }

    const token = generateToken(user.id);

    res.json({
      message: "login exitoso",
      token,
      user: {
        id: user.id,
        mail: user.mail
      }
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ error: "Error Servidor" });
  }
};

const logout = (req, res) => {
  res.json({ message: "Deslogueo exitoso" });
};

const getProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        mail: req.user.mail
      }
    });
  } catch (error) {
    console.error("Error profile:", error);
    res.status(500).json({ error: "Error servidor" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile
};
