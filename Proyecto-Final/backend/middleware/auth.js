const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Falta token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: "User no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalido" });
  }
};

module.exports = auth;
