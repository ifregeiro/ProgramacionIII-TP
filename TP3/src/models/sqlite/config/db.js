const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db', 'clinica.sqlite'),
  logging: false
});

const connectDB = async () => {
  try {
    // el parametro alter sirve para actualizar la base de datos por si hubo un cambio
    await sequelize.sync({ alter: true });
    console.log('Base de datos sqlite conectada y actualizada.');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

module.exports = { sequelize, connectDB };