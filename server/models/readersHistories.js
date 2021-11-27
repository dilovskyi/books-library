const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const ReaderHistory = sequelize.define("readers_histories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = ReaderHistory;
