const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const Country = sequelize.define("countries", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = Country;
