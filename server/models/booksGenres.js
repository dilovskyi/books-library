const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const BookGenre = sequelize.define("books_genres", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = BookGenre;
