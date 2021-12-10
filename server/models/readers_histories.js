const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const ReaderHistory = sequelize.define("readers_histories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  readingStatus: { type: DataTypes.CHAR },
});

module.exports = ReaderHistory;
