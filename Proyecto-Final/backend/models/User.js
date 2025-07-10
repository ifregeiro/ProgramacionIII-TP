const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  }
}, {
  tableName: "users",
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.contrasena = await bcrypt.hash(user.contrasena, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed("contrasena")) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    }
  }
});

User.prototype.validatePassword = async function(password) { 
  return await bcrypt.compare(password, this.contrasena);
};

return User;
};
