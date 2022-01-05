const sequelize = require("../dbConfig");
const { Books } = require("../models");

class BookController {
  async getOne(req, res) {
    // console.log(req.params.id);
  }

  async getTopAuthors(req, res) {
    const authorsCount = req.query.count || 4;

    const author = await sequelize
      .query(
        `SELECT count(*) as booksTotal, authors.username, books_authors.authorId FROM authors JOIN books_authors ON authors.id = books_authors.authorId GROUP BY username ORDER BY booksTotal DESC`,
        {
          replacements: { authorsCount },
          type: sequelize.QueryTypes.SELECT,
          plain: false,
          nest: true,
        }
      )
      .then(function (author) {
        return author;
      });

    res.json(author);
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

        const readingStatus = await sequelize
          .query(
            "SELECT readingStatus FROM readers_histories WHERE bookId = :bookId",
            {
              replacements: { bookId },
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then(function (status) {
            return status[0];
          });

        const readerId = req.query.reader;
        const currentUserReadingStatus = await sequelize
          .query(
            "SELECT readingStatus as userReadingStatus FROM readers_histories WHERE bookId = :bookId and readerId = :readerId",
            {
              replacements: { bookId, readerId },
              type: sequelize.QueryTypes.SELECT,
            }
          )
          .then(function (status) {
            return status[0];
          });

        return {
          ...book,
          ...readingStatus,
          ...currentUserReadingStatus,
          username: author.username,
        };
      })
    );

    res.json(booksData.flat());
  }

  async getByPage(req, res) {
    const currentPage = req.query.page;
    const book = await sequelize.query(
      `SELECT books.*, authors.username AS authorName FROM books JOIN books_authors ON books_authors.bookId = books.id JOIN authors ON authors.id = books_authors.authorId ORDER BY books.id LIMIT ${
        currentPage - 1 + "0"
      },10`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(book);
  }

  async getBooksReadingStatus(req, res) {
    const booksIdArr = req.body;
    const data = await sequelize.query(
      `SELECT readerId, bookId, readingStatus FROM readers_histories WHERE readers_histories.bookId IN (${booksIdArr.join(
        ","
      )})`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(data);
  }
}

module.exports = new BookController();
