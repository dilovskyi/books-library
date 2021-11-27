const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const ReaderFavorite = sequelize.define("readers_favorites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = ReaderFavorite;
