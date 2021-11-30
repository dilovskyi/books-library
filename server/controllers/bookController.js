const sequelize = require("../dbConfig");
const { Books } = require("../models");

class BookController {
  async getOne(req, res) {
    // console.log(req.params.id);
  }

  async getAll(req, res) {
    sequelize
      .query("SELECT * FROM `books`", { type: sequelize.QueryTypes.SELECT })
      .then(function (books) {
        res.json(books);
      });
  }
}

module.exports = new BookController();
