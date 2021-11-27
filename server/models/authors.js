const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const Author = sequelize.define("authors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

module.exports = Author;
