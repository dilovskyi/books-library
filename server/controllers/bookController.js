const sequelize = require("../dbConfig");
const { Books } = require("../models");

class BookController {
  async getOne(req, res) {
    // console.log(req.params.id);
  }

  async getByAuthor(req, res) {
    const authorName = req.query.name.replace("_", " ");

    const author = await sequelize
      .query("SELECT id, username FROM authors WHERE username = :authorName", {
        replacements: { authorName },
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (author) {
        return author[0];
      });

    const booksIdArray = await sequelize
      .query("SELECT id FROM books_authors WHERE authorId = :authorId", {
        replacements: { authorId: author.id },
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (booksIdArray) {
        return booksIdArray;
      });

    const authorBooks = await Promise.all(
      booksIdArray.map(async ({ id }) => {
        const book = await sequelize
          .query("SELECT * FROM books WHERE id = :id", {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
          })
          .then(function (book) {
            return book;
          });

        return { ...book[0], authorName: author.username };
      })
    );

    res.json(authorBooks);
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
            return book[0];
          });

        // Get author by id
        const author = await sequelize
          .query("SELECT * FROM `authors` WHERE id = :authorId", {
            replacements: { authorId },
            type: sequelize.QueryTypes.SELECT,
          })
          .then(function (author) {
            return author[0];
          });

        return Object.assign(book, { authorName: author.username });
      })
    );

    res.json(booksData.flat());
  }
}

module.exports = new BookController();
