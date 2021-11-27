const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("books", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  content: { type: DataTypes.TEXT },
});

module.exports = Book;
