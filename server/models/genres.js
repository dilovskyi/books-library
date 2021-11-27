const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const Genres = sequelize.define("genres", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Genres;
