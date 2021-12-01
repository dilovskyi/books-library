const sequelize = require("../dbConfig");
const { Books } = require("../models");

class BookController {
  async getOne(req, res) {
    // console.log(req.params.id);
  }

  async getAll(req, res) {
    const booksAuthors = await sequelize
      .query("SELECT * FROM `books_authors`", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (booksAuthors) {
        return booksAuthors;
      });

    // Iterate thow books_authors with tables authorId, bookId
    const booksData = await Promise.all(
      booksAuthors.map(async ({ authorId, bookId }) => {
        // Get book by id
        const book = await sequelize
          .query("SELECT * FROM `books` WHERE id = :bookId", {
            replacements: { bookId },
            type: sequelize.QueryTypes.SELECT,
          })
          .then(function (book) {
            return book;
          });

        // Get author by id
        const author = await sequelize
          .query("SELECT * FROM `authors` WHERE id = :authorId", {
            replacements: { authorId },
            type: sequelize.QueryTypes.SELECT,
          })
          .then(function (author) {
            return author;
          });

        return Object.assign(book[0], { authorName: author[0].username });
      })
    );

    res.json(booksData.flat());
  }
}

module.exports = new BookController();
