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
        `SELECT count(*) as booksTotal, authors.username, books_authors.authorId FROM authors JOIN books_authors ON authors.id = books_authors.authorId GROUP BY username ORDER BY booksTotal DESC LIMIT 0, ${authorsCount}`,
        {
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
    const authorId = req.query.authorId;

    const author = await sequelize
      .query("SELECT id, username FROM authors WHERE id = :authorId", {
        replacements: { authorId },
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

    res.json({
      chosenAuthorBooksData: authorBooks,
      chosenAuthorBooksDataLength: authorBooks.length,
    });
  }

  async getTotalDataLength(req, res) {
    const booksTotal = await sequelize
      .query("SELECT count(*) as booksTotal FROM `books`", {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (booksAuthors) {
        return booksAuthors[0];
      });

    res.json(booksTotal);
  }

  async getByPage(req, res) {
    const currentPage = req.query.page || 3;
    const limit = req.query.limit;
    const book = await sequelize.query(
      `SELECT books.*, authors.id AS authorId, authors.username AS authorName FROM books JOIN books_authors ON books_authors.bookId = books.id JOIN authors ON authors.id = books_authors.authorId ORDER BY books.id LIMIT ${
        currentPage - 1 + "0"
      },${limit}`,
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

  async getWaitingForReadBooks(req, res) {
    const readerId = req.query.readerId;
    const data = await sequelize.query(
      `SELECT bookId, readingStatus FROM readers_histories WHERE readerId = ${readerId} AND readingStatus = "waitingForRead"`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(data);
  }

  async bookQueue(req, res) {
    const bookId = req.query.bookId;
    const data = await sequelize.query(
      `SELECT count(*) as bookQueue, readers_histories.readerId FROM readers_histories WHERE bookId = ${bookId} AND readingStatus = "waitingForRead"`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(data);
  }
}

module.exports = new BookController();
