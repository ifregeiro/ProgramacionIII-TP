// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const User = require("./User")(sequelize);
const Book = require("./Book")(sequelize);

User.hasMany(Book, {
  foreignKey: "userId",
  as: "books"
});

Book.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

module.exports = {
  sequelize,
  Sequelize,
  User,
  Book
};