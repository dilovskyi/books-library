const sequelize = require("../dbConfig");
const { DataTypes } = require("sequelize");

const BookAuthor = sequelize.define("books_authors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = BookAuthor;
