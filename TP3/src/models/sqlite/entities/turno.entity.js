const { DataTypes } = require('sequelize');
const {sequelize} = require('./../config/db.js');
const {Paciente} = require('./paciente.entity.js');

const Turno = sequelize.define("Turno", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

Turno.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  onDelete: 'CASCADE'
});

Paciente.hasMany(Turno, {
  foreignKey: 'pacienteId'
});

module.exports = { Turno };

Turno.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  onDelete: 'CASCADE',
  as: 'paciente' // 👈 este alias es clave
});

Paciente.hasMany(Turno, {
  foreignKey: 'pacienteId',
  as: 'turnos'
});
// Esto asegura que al consultar Turno, puedas incluir Paciente y acceder a sus datos
