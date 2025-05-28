const { DataTypes } = require('sequelize');
const {sequelize} = require('./../config/db.js');

// paciente
const Paciente = sequelize.define("Paciente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// admin
const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = {Paciente, Usuario};